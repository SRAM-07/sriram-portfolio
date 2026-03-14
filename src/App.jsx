import "./App.css"
import { TypeAnimation } from "react-type-animation"
import { SiPython, SiMysql, SiGit, SiSpringboot } from "react-icons/si"
import { FaJava, FaServer } from "react-icons/fa"
import { useEffect, useState } from "react"

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div className="app">

      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">S R I R A M . M <span>.</span></h2>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">

          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            <div className="hero-eyebrow-line" />
            <span>available for work — Bangalore, India</span>
          </div>

          <h1>
            Backend<br />
            <span className="gradient-text">Developer.</span>
          </h1>

        </div>

        <div className="hero-bottom">
          <div className="hero-sub-block">
            <TypeAnimation
              sequence={[
                "backend_dev(java, python)", 2000,
                "api_architect(spring_boot)", 2000,
                "data_pipeline_builder()", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="hero-sub"
            />
            <p className="hero-desc">
              Building scalable APIs, data pipelines<br />
              and efficient backend systems.
            </p>
          </div>

          <div className="hero-right-block">
            <div className="profile-wrapper">
              <div className="profile-ring" />
              <img src="/profile.png" alt="Sriram" className="profile-img" />
            </div>
            <div className="hero-buttons">
              <a href="https://github.com/SRAM-07" target="_blank" rel="noreferrer" className="btn">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/sriram-m-890b22215/" target="_blank" rel="noreferrer" className="btn">LinkedIn ↗</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">Resume ↗</a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section-header">
          <span className="section-number">01</span>
          <div className="section-line" />
          <h2>About <span className="gradient-text">me</span></h2>
        </div>
        <div className="about-layout">
          <p className="about-text">
            I'm a backend developer passionate about building <strong>scalable systems</strong> and
            reliable APIs. I enjoy solving real-world problems using <strong>Java</strong> and <strong>Python</strong> while
            designing efficient backend architectures and data pipelines.
          </p>
          <div className="about-stats">
            <div className="stat">
              <div className="stat-number">2+</div>
              <div className="stat-label">Years of experience</div>
            </div>
            <div className="stat">
              <div className="stat-number">5+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="section-header">
          <span className="section-number">02</span>
          <div className="section-line" />
          <h2>What I've <span className="gradient-text">built</span></h2>
        </div>
        <div className="project-grid">
          <div className="project">
            <div className="project-glow" />
            <div className="project-number">PROJECT — 01</div>
            <h3>Ecompare Price Comparison</h3>
            <p>Python web scraper that compares product prices between Amazon and Flipkart in real time.</p>
            <a href="https://github.com/SRAM-07/ecompare-price-comparison" target="_blank" rel="noreferrer" className="project-link">
              view on github →
            </a>
          </div>
          <div className="project">
            <div className="project-glow" />
            <div className="project-number">PROJECT — 02</div>
            <h3>Java Practice Programs</h3>
            <p>Collection of Java programs demonstrating algorithms, problem solving and data structures.</p>
            <a href="https://github.com/SRAM-07/java-practice-programs" target="_blank" rel="noreferrer" className="project-link">
              view on github →
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="section-header">
          <span className="section-number">03</span>
          <div className="section-line" />
          <h2>What I <span className="gradient-text">work with</span></h2>
        </div>
        <div className="skills">
          <div className="skill"><FaJava size={20} /><p>Java</p></div>
          <div className="skill"><SiPython size={20} /><p>Python</p></div>
          <div className="skill"><SiMysql size={20} /><p>SQL</p></div>
          <div className="skill"><FaServer size={20} /><p>REST APIs</p></div>
          <div className="skill"><SiGit size={20} /><p>Git</p></div>
          <div className="skill"><SiSpringboot size={20} /><p>Spring Boot</p></div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="contact-layout">
          <div>
            <h2 className="contact-heading">
              Let's build<br />
              something <span className="gradient-text">great.</span>
            </h2>
            <p className="contact-sub">
              Open to full-time opportunities<br />
              or just a good conversation about tech.
            </p>
          </div>
          <div className="contact-right">
            <div className="email-tag">
              📧 sriramm015@gmail.com
            </div>
            <a className="contact-btn" href="mailto:sriramm015@gmail.com">
              Send me an email →
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Sriram M</span>
        <span>Built with React ⚡</span>
      </footer>

    </div>
  )
}

export default App
