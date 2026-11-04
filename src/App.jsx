import { useEffect, useRef, useState } from "react"
import "./App.css"
import { career, work, skills, links } from "./content"
import Terminal from "./Terminal"
import CaseStudy from "./CaseStudy"

const sections = [
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "work", label: "Work" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
]

function readTheme() {
  try {
    const saved = localStorage.getItem("theme")
    if (saved === "light" || saved === "dark") return saved
  } catch { /* storage blocked */ }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  return hash
}

function useActiveSection(enabled) {
  const [active, setActive] = useState("about")
  useEffect(() => {
    if (!enabled) return
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [enabled])
  return active
}

function CareerEvent({ item, open, onToggle }) {
  return (
    <li className={`event ${item.current ? "is-current" : ""} ${open ? "is-open" : ""}`}>
      <span className="event-dot" aria-hidden="true" />
      <button className="event-head" onClick={onToggle} aria-expanded={open}>
        <span className="event-when">{item.when}</span>
        <span className="event-what">
          <span className="event-role">{item.role}</span>
          <span className="event-org">{item.org}</span>
        </span>
        {item.current && <span className="tape">Current</span>}
        <span className="event-toggle" aria-hidden="true">{open ? "Less" : "More"}</span>
      </button>
      <div className="event-body" hidden={!open}>
        <ul>
          {item.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </li>
  )
}

function App() {
  const [theme, setTheme] = useState(readTheme)
  const [openEvent, setOpenEvent] = useState(career[0].id)
  const hash = useHashRoute()
  const caseSlug = hash.startsWith("#/work/") ? hash.slice(7) : null
  const caseItem = work.find((w) => w.slug === caseSlug)
  const active = useActiveSection(!caseItem)
  const mainRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem("theme", theme) } catch { /* storage blocked */ }
  }, [theme])

  useEffect(() => {
    if (caseItem) window.scrollTo(0, 0)
  }, [caseItem])

  const go = (id) => (e) => {
    e.preventDefault()
    if (caseItem) {
      window.location.hash = ""
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 30)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="shell">
      <aside className="side">
        <a href="#" className="me" onClick={go("about")}>
          <img src="./profile.png" alt="Sriram M" className="photo" />
          <span className="name">Sriram M</span>
        </a>
        <p className="role">Full stack engineer in Bangalore. Java, Spring Boot and React.</p>

        <nav className="nav" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={go(s.id)}
              className={!caseItem && active === s.id ? "active" : ""}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="side-foot">
          <button
            className="theme-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="theme-icon" aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <div className="side-links">
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="./resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </aside>

      <main className="main" ref={mainRef}>
        {caseItem ? (
          <CaseStudy item={caseItem} />
        ) : (
          <>
            <section id="about" className="block hero">
              <div className="parcel">
                <div className="parcel-top">
                  <span className="parcel-id">SRM-BLR-2020</span>
                  <span className="tape">In transit</span>
                </div>
                <h1>I build the software that moves things.</h1>
                <p className="lede">
                  I'm the technical lead at ProDiligix, where I'm rebuilding the operations portal that
                  books, tracks and bills shipments for clients like HCCB, Rapido and Candescent.
                  Before that I spent two years building backend APIs at Encora.
                </p>
                <dl className="parcel-meta">
                  <div><dt>Current location</dt><dd>ProDiligix, Bangalore</dd></div>
                  <div><dt>Experience</dt><dd>2+ years</dd></div>
                  <div><dt>Carrying</dt><dd>Java, Spring Boot, React, AWS</dd></div>
                </dl>
              </div>
            </section>

            <section id="career" className="block">
              <h2>Career, tracked</h2>
              <p className="section-note">Newest scan first. Open any stop to see what I did there.</p>
              <ol className="track">
                {career.map((item) => (
                  <CareerEvent
                    key={item.id}
                    item={item}
                    open={openEvent === item.id}
                    onToggle={() => setOpenEvent(openEvent === item.id ? null : item.id)}
                  />
                ))}
              </ol>
            </section>

            <section id="work" className="block">
              <h2>Selected work</h2>
              <div className="work">
                {work.map((w) => (
                  <a key={w.slug} href={`#/work/${w.slug}`} className="work-item">
                    <span className="work-kind">{w.kind}</span>
                    <span className="work-title">{w.title}</span>
                    <span className="work-sum">{w.summary}</span>
                    <span className="work-tags">{w.stack.join(", ")}</span>
                    <span className="work-open">Read the case study</span>
                  </a>
                ))}
              </div>
              <p className="also">
                Also built <a href={links.ecompare} target="_blank" rel="noreferrer">Ecompare</a>, a Python
                scraper that compares prices across Amazon and Flipkart.
              </p>
            </section>

            <section id="terminal" className="block">
              <h2>Ask the terminal</h2>
              <p className="section-note">Type <code>help</code> to see what it knows.</p>
              <Terminal setTheme={setTheme} theme={theme} />
            </section>

            <section id="skills-contact" className="block">
              <h2>What I work with</h2>
              <dl className="skills">
                {skills.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </section>

            <section id="contact" className="block contact">
              <h2>Get in touch</h2>
              <p>
                If you're hiring for backend or full stack work, or want to talk about logistics software,
                email is the fastest way to reach me.
              </p>
              <div className="contact-row">
                <a className="btn" href={`mailto:${links.email}`}>Email me</a>
                <span className="mail">{links.email}</span>
              </div>
            </section>

            <footer className="foot">Built by Sriram with React. Last updated November 2026.</footer>
          </>
        )}
      </main>
    </div>
  )
}

export default App
