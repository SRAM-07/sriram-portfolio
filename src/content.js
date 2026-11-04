export const links = {
  email: "sriramm015@gmail.com",
  github: "https://github.com/SRAM-07",
  linkedin: "https://www.linkedin.com/in/sriram-m-890b22215/",
  ecompare: "https://github.com/SRAM-07/ecompare-price-comparison",
}

export const career = [
  {
    id: "prodiligix",
    when: "Jul 2026, now",
    role: "Technical Lead, Full Stack",
    org: "ProDiligix Technologies, Bangalore",
    current: true,
    points: [
      "Rebuilding the operations portal on Spring Boot, MySQL and React, replacing a legacy Vue and Rails app.",
      "Built the Delhivery and Bluedart (NimbusPost) integrations for booking, labels, live tracking and cancellation.",
      "Built wallet and purchase order billing with refunds, RTO charges and month end reconciliation.",
      "Hardened security, set up daily backups and uptime monitoring, and run every staging and production release.",
    ],
  },
  {
    id: "encora",
    when: "Jun 2024 to Jun 2026",
    role: "Software Engineer, Backend",
    org: "Encora Innovation Labs (now Coforge)",
    points: [
      "Built and maintained REST APIs in Java, Spring Boot and Micronaut for Keap and Thryv, including Twilio toll free verification.",
      "Split a core service so it could be deployed on its own behind a feature flag, with no downtime.",
      "Maintained a Python ETL pipeline for large MLS real estate datasets in MongoDB.",
    ],
  },
  {
    id: "intern",
    when: "Oct 2023 to Jan 2024",
    role: "Backend Intern",
    org: "Encora Innovation Labs",
    points: ["Wrote price scrapers that fed a Django price comparison app."],
  },
  {
    id: "dsu",
    when: "2020 to 2024",
    role: "B.Tech, Computer Science",
    org: "Dayananda Sagar University",
    points: ["Graduated in 2024. Later earned the Databricks Certified Data Engineer Associate certification."],
  },
]

export const work = [
  {
    slug: "prodiligix-portal",
    kind: "At work",
    title: "Rebuilding a logistics operations portal",
    summary: "Booking, tracking and billing for enterprise shipments, moved from a legacy Rails app to Spring Boot and React.",
    stack: ["Java", "Spring Boot", "MySQL", "React", "AWS"],
    problem:
      "ProDiligix runs logistics, stamp paper, gifting and event services for companies like HCCB, Rapido and Candescent. All of it ran on an old Vue and Rails portal that was hard to change. I'm leading the rebuild on a new stack while the old one keeps working.",
    diagram: true,
    built: [
      ["Booking and carriers", "Shipments are booked straight through the Delhivery and Bluedart (NimbusPost) APIs, with labels, live tracking and cancellation handled in the portal. HCCB gets one click booking billed against their purchase orders."],
      ["Billing", "Each client pays from a wallet or a purchase order. Charges, refunds on cancellation and RTO charges post to a ledger, and I reconcile the month end figures against shipment records to the paisa."],
      ["Security and reliability", "Moved the JWT signing secret out of the code, added per account and per IP login limits, restricted database access, and set up daily disk snapshots and uptime alerts."],
      ["For clients", "Role based dashboards for five kinds of users, daily MIS emails, and live tracking reports. For HCCB's Diwali dispatch I automated status and delivery dates for 320+ parcels."],
    ],
    numbers: [["5", "user roles"], ["320+", "parcels tracked in one dispatch"], ["500 MB", "direct to S3 uploads"]],
  },
  {
    slug: "llm-benchmark",
    kind: "Research",
    title: "When instructions conflict, which LLM listens?",
    summary: "A benchmark testing whether models follow the latest instruction when instructions contradict each other. Kaggle silver medal.",
    stack: ["Python", "Kaggle notebooks", "LLM evaluation"],
    problem:
      "Models are usually scored on whether the answer is right. I wanted to know whether they actually follow instructions when those instructions clash, for example a new rule that overrides an earlier one.",
    tasks: [
      ["Basic override", "Does the model follow the most recent instruction?"],
      ["Format constraint", "Does it obey strict output format rules?"],
      ["Multi instruction", "Can it resolve several contradictions at once?"],
      ["Context interference", "Can it ignore misleading context?"],
      ["JSON constraint", "Can it keep structured output under conflict?"],
    ],
    results: [["Gemma 3 27B", 79], ["Gemini Pro", 75], ["Qwen 3 80B", 74], ["Claude Sonnet", 68]],
    finding: "A model can produce the correct answer and still fail. Correctness does not imply compliance.",
    links: [
      ["Kaggle write up", "https://www.kaggle.com/competitions/kaggle-measuring-agi/writeups/resolving-conflicting-instructions-llms"],
      ["Notebook", "https://www.kaggle.com/code/eng20cs0359sriramm/your-model-heard-you-it-just-didn-t-obey"],
      ["Code on GitHub", "https://github.com/SRAM-07/conflicting-instructions-llm-benchmark"],
    ],
  },
  {
    slug: "kareermind",
    kind: "Hackathon",
    title: "KareerMind, a companion for job seekers",
    summary: "An AI companion for people in India going through job loss, built on Gemma 4 for a Kaggle hackathon.",
    stack: ["Python", "Gemma 4", "Gradio", "Hugging Face"],
    problem:
      "Losing a job is stressful in two ways at once: you need support, and you need practical help getting the next one. KareerMind tries to do both, in the language you're most comfortable in.",
    features: [
      ["Support", "Empathetic replies in your own language."],
      ["Interview practice", "Java, Python and Spring Boot questions."],
      ["Resume review", "Concrete feedback aimed at 6 to 12 LPA roles."],
      ["Languages", "English, Tamil, Kannada, Hindi and Malayalam."],
    ],
    links: [
      ["Live demo", "https://huggingface.co/spaces/Ramazing/KareerMind"],
      ["Notebook", "https://www.kaggle.com/code/eng20cs0359sriramm/kareermind-ai-companion-for-job-seekers"],
      ["Code on GitHub", "https://github.com/SRAM-07/kareermind-ai-companion"],
    ],
  },
]

export const skills = [
  ["Languages", "Java, Python, JavaScript, SQL"],
  ["Backend", "Spring Boot, Micronaut, REST APIs, Django"],
  ["Frontend", "React, Tailwind CSS"],
  ["Data", "MySQL, PostgreSQL, MongoDB"],
  ["Cloud and tools", "AWS (EC2, S3, SES), Nginx, Linux, Git, CircleCI"],
]
