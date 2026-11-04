import "./App.css"

const experience = [
  {
    company: "ProDiligix Technologies",
    role: "Technical Lead, Full Stack",
    dates: "Jul 2026 to present",
    points: [
      "Rebuilding the company's operations portal on Spring Boot, MySQL and React, replacing a legacy Vue and Rails app. It is used every day by clients including HCCB, Rapido and Candescent.",
      "Built the carrier integrations with Delhivery and Bluedart for booking, labels, live tracking and cancellation.",
      "Built wallet and purchase order billing with refunds, RTO charges and month end reconciliation.",
      "Look after security, backups, monitoring and every staging and production release.",
    ],
  },
  {
    company: "Encora Innovation Labs (now Coforge)",
    role: "Software Engineer, Backend",
    dates: "Jun 2024 to Jun 2026",
    points: [
      "Built and maintained REST APIs in Java, Spring Boot and Micronaut for Keap and Thryv, including Twilio toll free verification.",
      "Split a core service so it could be deployed on its own behind a feature flag, with no downtime.",
      "Maintained a Python ETL pipeline for large MLS real estate datasets in MongoDB.",
    ],
  },
  {
    company: "Encora Innovation Labs",
    role: "Backend Intern",
    dates: "Oct 2023 to Jan 2024",
    points: ["Wrote price scrapers that fed a Django price comparison app."],
  },
]

const projects = [
  {
    name: "LLM instruction following benchmark",
    note: "Kaggle silver medal",
    text: "A 104 task benchmark that tests how strictly models like Gemini, Claude, Qwen and Gemma follow instructions, scored with a metric I designed for it.",
  },
  {
    name: "Ecompare",
    note: "Python, Django",
    text: "A scraper that compares product prices across Amazon and Flipkart.",
    link: "https://github.com/SRAM-07/ecompare-price-comparison",
  },
]

const skills = [
  ["Languages", "Java, Python, JavaScript, SQL"],
  ["Backend", "Spring Boot, Micronaut, REST APIs, Django"],
  ["Frontend", "React, Tailwind CSS"],
  ["Databases", "MySQL, PostgreSQL, MongoDB"],
  ["Cloud and tools", "AWS (EC2, S3, SES), Nginx, Linux, Git, CircleCI"],
]

function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function App() {
  return (
    <main className="page">
      <header className="top">
        <div className="who">
          <img src="./profile.png" alt="Sriram M" className="photo" />
          <div>
            <h1>Sriram M</h1>
            <p className="title">Full Stack Engineer</p>
          </div>
        </div>
        <div className="contact">
          <span>Bangalore, India</span>
          <a href="mailto:sriramm015@gmail.com">sriramm015@gmail.com</a>
          <span className="links">
            <a href="https://github.com/SRAM-07" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sriram-m-890b22215/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="./resume.pdf" target="_blank" rel="noreferrer">Resume (PDF)</a>
          </span>
        </div>
      </header>

      <p className="about">
        I build production software end to end, from Spring Boot APIs and MySQL to React frontends running on AWS.
        I'm currently the technical lead at ProDiligix, where I'm rebuilding the company's logistics operations portal.
      </p>

      <Section title="Experience">
        {experience.map((job) => (
          <div className="job" key={job.company + job.role}>
            <div className="job-head">
              <div>
                <span className="job-role">{job.role}</span>
                <span className="job-company">{job.company}</span>
              </div>
              <span className="job-dates">{job.dates}</span>
            </div>
            <ul>
              {job.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {projects.map((p) => (
          <div className="project" key={p.name}>
            <div className="job-head">
              <span className="job-role">
                {p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.name}</a> : p.name}
              </span>
              <span className="job-dates">{p.note}</span>
            </div>
            <p>{p.text}</p>
          </div>
        ))}
      </Section>

      <Section title="Skills">
        <dl className="skills">
          {skills.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education">
        <div className="job-head">
          <div>
            <span className="job-role">B.Tech, Computer Science</span>
            <span className="job-company">Dayananda Sagar University</span>
          </div>
          <span className="job-dates">2020 to 2024</span>
        </div>
        <p className="cert">Databricks Certified Data Engineer Associate</p>
      </Section>

      <footer className="foot">Last updated November 2026</footer>
    </main>
  )
}

export default App
