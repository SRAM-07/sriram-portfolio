import { useEffect, useRef, useState } from "react"
import { career, work, skills, links } from "./content"

const intro = [
  { k: "out", t: "Hi, I'm Sriram. Type a command, or try one of these:" },
  { k: "hint", t: "help   about   track   work   skills   contact   resume" },
]

function run(cmd, { setTheme, theme }) {
  const c = cmd.trim().toLowerCase()
  if (!c) return []
  switch (c) {
    case "help":
      return [
        "about     who I am",
        "track     my career, as a tracking log",
        "work      things I've built",
        "skills    what I work with",
        "contact   how to reach me",
        "resume    open my resume",
        "theme     switch light and dark",
        "clear     clear the screen",
      ]
    case "about":
      return ["Full stack engineer in Bangalore. Technical lead at ProDiligix,", "rebuilding a logistics portal on Spring Boot, React and AWS."]
    case "track":
    case "track sriram":
      return [
        "Tracking SRM-BLR-2020",
        ...career.map((e) => `${e.when.padEnd(22)}${e.role}, ${e.org}${e.current ? "   [current]" : ""}`),
        "Status: in transit, open to the next stop.",
      ]
    case "work":
    case "projects":
      return [...work.map((w, i) => `${i + 1}. ${w.title}`), "Open any of them in the Work section above."]
    case "skills":
      return skills.map(([k, v]) => `${(k + ":").padEnd(17)}${v}`)
    case "contact":
      return [`email     ${links.email}`, `github    ${links.github}`, `linkedin  ${links.linkedin}`]
    case "resume":
      window.open("./resume.pdf", "_blank", "noopener")
      return ["Opening resume.pdf in a new tab."]
    case "theme":
      setTheme(theme === "dark" ? "light" : "dark")
      return [`Switched to ${theme === "dark" ? "light" : "dark"} mode.`]
    case "sudo hire sriram":
      return ["Permission granted. Email sriramm015@gmail.com to continue."]
    default:
      return [`Command not found: ${c}. Type help for the list.`]
  }
}

export default function Terminal(props) {
  const [lines, setLines] = useState(intro)
  const [value, setValue] = useState("")
  const [history, setHistory] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const screen = useRef(null)
  const input = useRef(null)

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = screen.current.scrollHeight
  }, [lines])

  const submit = (e) => {
    e.preventDefault()
    const cmd = value
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([])
    } else {
      const out = run(cmd, props).map((t) => ({ k: "out", t }))
      setLines((l) => [...l, { k: "cmd", t: cmd }, ...out])
    }
    if (cmd.trim()) setHistory((h) => [cmd, ...h])
    setHIdx(-1)
    setValue("")
  }

  const onKey = (e) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault()
      const i = Math.min(hIdx + 1, history.length - 1)
      setHIdx(i); setValue(history[i])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const i = hIdx - 1
      setHIdx(Math.max(i, -1)); setValue(i >= 0 ? history[i] : "")
    }
  }

  return (
    <div className="term" onClick={() => input.current?.focus()}>
      <div className="term-bar" aria-hidden="true"><span /><span /><span /><em>visitor@sriram</em></div>
      <div className="term-screen" ref={screen} aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={`term-line ${l.k}`}>
            {l.k === "cmd" && <span className="prompt">$ </span>}
            {l.t}
          </div>
        ))}
        <form onSubmit={submit} className="term-input">
          <label htmlFor="term-in" className="prompt">$ </label>
          <input
            id="term-in"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command"
          />
        </form>
      </div>
    </div>
  )
}
