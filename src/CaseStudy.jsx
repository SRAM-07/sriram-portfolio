function Architecture() {
  const box = (x, y, w, title, sub, strong) => (
    <g>
      <rect x={x} y={y} width={w} height="58" rx="8" className={strong ? "arch-box strong" : "arch-box"} />
      <text x={x + w / 2} y={y + 25} textAnchor="middle" className="arch-title">{title}</text>
      <text x={x + w / 2} y={y + 43} textAnchor="middle" className="arch-sub">{sub}</text>
    </g>
  )
  return (
    <figure className="arch">
      <svg viewBox="0 0 640 300" role="img" aria-label="Portal architecture: browser to Nginx to Spring Boot API to MySQL, with Delhivery, NimbusPost, S3 and SES connected to the API">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="arch-arrowhead" />
          </marker>
        </defs>
        {box(10, 30, 130, "Browser", "React + Tailwind")}
        {box(175, 30, 120, "Nginx", "AWS EC2")}
        {box(330, 30, 150, "Spring Boot API", "JWT, roles, billing", true)}
        {box(515, 30, 115, "MySQL", "daily snapshots")}
        <line x1="140" y1="59" x2="173" y2="59" className="arch-line" markerEnd="url(#arr)" />
        <line x1="295" y1="59" x2="328" y2="59" className="arch-line" markerEnd="url(#arr)" />
        <line x1="480" y1="59" x2="513" y2="59" className="arch-line" markerEnd="url(#arr)" />
        {box(150, 210, 120, "Delhivery", "book, track, labels")}
        {box(285, 210, 120, "NimbusPost", "Bluedart shipments")}
        {box(420, 210, 90, "AWS S3", "videos, photos")}
        {box(525, 210, 105, "AWS SES", "MIS, alerts")}
        <path d="M405 88 V150 H210 V208" className="arch-line" markerEnd="url(#arr)" />
        <path d="M405 150 H345 V208" className="arch-line" markerEnd="url(#arr)" />
        <path d="M405 150 H465 V208" className="arch-line" markerEnd="url(#arr)" />
        <path d="M405 150 H577 V208" className="arch-line" markerEnd="url(#arr)" />
      </svg>
      <figcaption>Requests go through Nginx to one Spring Boot API, which owns billing and roles and talks to the carriers and AWS.</figcaption>
    </figure>
  )
}

export default function CaseStudy({ item }) {
  const max = item.results ? Math.max(...item.results.map((r) => r[1])) : 0
  return (
    <article className="case">
      <a href="#work" className="back" onClick={(e) => { e.preventDefault(); window.location.hash = ""; setTimeout(() => document.getElementById("work")?.scrollIntoView(), 30) }}>
        Back to all work
      </a>
      <p className="work-kind">{item.kind}</p>
      <h1 className="case-title">{item.title}</h1>
      <p className="lede">{item.problem}</p>
      <p className="case-stack">{item.stack.join(", ")}</p>

      {item.numbers && (
        <dl className="numbers">
          {item.numbers.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
        </dl>
      )}

      {item.diagram && (<><h2>How it fits together</h2><Architecture /></>)}

      {item.built && (
        <>
          <h2>What I built</h2>
          <div className="pairs">
            {item.built.map(([h, t]) => <div key={h}><h3>{h}</h3><p>{t}</p></div>)}
          </div>
        </>
      )}

      {item.tasks && (
        <>
          <h2>Five kinds of conflict</h2>
          <div className="pairs">
            {item.tasks.map(([h, t]) => <div key={h}><h3>{h}</h3><p>{t}</p></div>)}
          </div>
        </>
      )}

      {item.results && (
        <>
          <h2>Results, out of 101</h2>
          <div className="bars">
            {item.results.map(([m, s]) => (
              <div className="bar-row" key={m}>
                <span className="bar-label">{m}</span>
                <span className="bar-track"><span className="bar-fill" style={{ width: `${(s / max) * 100}%` }} /></span>
                <span className="bar-val">{s}</span>
              </div>
            ))}
          </div>
          <blockquote>{item.finding}</blockquote>
        </>
      )}

      {item.features && (
        <>
          <h2>What it does</h2>
          <div className="pairs">
            {item.features.map(([h, t]) => <div key={h}><h3>{h}</h3><p>{t}</p></div>)}
          </div>
        </>
      )}

      {item.links && (
        <div className="case-links">
          {item.links.map(([l, u]) => <a key={l} className="btn ghost" href={u} target="_blank" rel="noreferrer">{l}</a>)}
        </div>
      )}
    </article>
  )
}
