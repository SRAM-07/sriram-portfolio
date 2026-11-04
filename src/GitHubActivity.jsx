import { useEffect, useState } from "react"

const USER = "SRAM-07"
const HIDE = (name) => /prodiligix/i.test(name) || name === USER
const CACHE_KEY = "gh-activity-v1"
const CACHE_MS = 30 * 60 * 1000

function ago(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`
  if (s < 86400) return `${Math.round(s / 3600)} hours ago`
  const d = Math.round(s / 86400)
  if (d === 1) return "yesterday"
  if (d < 31) return `${d} days ago`
  return new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
}

async function load() {
  try {
    const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null")
    if (c && Date.now() - c.at < CACHE_MS) return c.items
  } catch { /* storage blocked */ }

  const r = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=12`)
  if (!r.ok) throw new Error(`GitHub returned ${r.status}`)
  const repos = (await r.json()).filter((x) => !x.fork && !x.archived && !HIDE(x.name)).slice(0, 4)

  const items = await Promise.all(repos.map(async (repo) => {
    let commit = null
    try {
      const cr = await fetch(`https://api.github.com/repos/${USER}/${repo.name}/commits?per_page=1`)
      if (cr.ok) {
        const [c] = await cr.json()
        if (c) commit = { msg: c.commit.message.split("\n")[0], at: c.commit.author.date, url: c.html_url }
      }
    } catch { /* one repo failing is fine */ }
    return {
      name: repo.name,
      url: repo.html_url,
      desc: repo.description,
      lang: repo.language,
      pushed: repo.pushed_at,
      commit,
    }
  }))

  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), items })) } catch { /* ignore */ }
  return items
}

export default function GitHubActivity() {
  const [state, setState] = useState({ status: "loading", items: [] })

  useEffect(() => {
    let alive = true
    load()
      .then((items) => alive && setState({ status: "ok", items }))
      .catch(() => alive && setState({ status: "error", items: [] }))
    return () => { alive = false }
  }, [])

  if (state.status === "loading") {
    return <p className="gh-note">Loading my latest work from GitHub…</p>
  }
  if (state.status === "error" || state.items.length === 0) {
    return (
      <p className="gh-note">
        GitHub isn't responding right now. You can see everything on{" "}
        <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">github.com/{USER}</a>.
      </p>
    )
  }

  return (
    <ul className="gh">
      {state.items.map((it) => (
        <li key={it.name} className="gh-item">
          <div className="gh-head">
            <a href={it.url} target="_blank" rel="noreferrer" className="gh-name">{it.name}</a>
            <span className="gh-when">{ago(it.commit?.at || it.pushed)}</span>
          </div>
          {it.desc && <p className="gh-desc">{it.desc}</p>}
          <div className="gh-meta">
            {it.lang && <span className="gh-lang"><i aria-hidden="true" />{it.lang}</span>}
            {it.commit && (
              <a href={it.commit.url} target="_blank" rel="noreferrer" className="gh-commit">
                Last commit: {it.commit.msg}
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
