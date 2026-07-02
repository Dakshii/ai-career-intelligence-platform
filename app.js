const roleBlueprints = {
  "AI Product Manager": {
    keywords: ["ai", "product", "analytics", "research", "roadmap", "communication"],
    gaps: ["Product analytics", "LLM evaluation", "User research", "Experiment design"],
    learning: ["Learn product metrics and funnels", "Practice writing PRDs", "Study LLM evaluation basics"],
    interviews: ["A time you prioritized a feature", "A product metric you would improve", "How you would evaluate an AI feature"],
    projects: [
      "Build an AI feature PRD with success metrics and evaluation plan.",
      "Create a dashboard that tracks adoption, retention, and user feedback.",
      "Compare three AI tools and write a product recommendation memo."
    ],
    roles: [
      ["AI Product Manager", 86, "Strong fit if you show product thinking and AI literacy."],
      ["Product Analyst", 78, "Good bridge role using data, user behavior, and experimentation."],
      ["AI Solutions Associate", 74, "Useful entry point for client-facing AI implementation."]
    ]
  },
  "Data Analyst": {
    keywords: ["sql", "excel", "python", "tableau", "power bi", "statistics"],
    gaps: ["Advanced SQL", "Dashboard storytelling", "A/B testing", "Data cleaning"],
    learning: ["Practice SQL joins and windows", "Build dashboards with business context", "Learn statistics for decision-making"],
    interviews: ["A messy dataset you cleaned", "A business insight you found", "How you explain data to non-technical users"],
    projects: [
      "Analyze a public dataset and publish a business insights dashboard.",
      "Create an SQL case study with joins, windows, and cohort analysis.",
      "Write a one-page executive insight report from messy data."
    ],
    roles: [
      ["Data Analyst", 88, "Best fit when you show SQL, dashboards, and business clarity."],
      ["Business Analyst", 80, "Strong option if communication is one of your strengths."],
      ["Product Analyst", 76, "Good fit with experimentation and product metrics."]
    ]
  },
  "Machine Learning Engineer": {
    keywords: ["python", "machine learning", "deep learning", "pytorch", "tensorflow", "deployment"],
    gaps: ["Model deployment", "MLOps", "Feature engineering", "System design"],
    learning: ["Deploy a model API", "Learn experiment tracking", "Practice model evaluation"],
    interviews: ["A model you improved", "A tradeoff between accuracy and latency", "How you monitor model quality"],
    projects: [
      "Train and deploy a prediction model with a simple API.",
      "Build an ML experiment tracker comparing model versions.",
      "Create a retrieval-augmented generation demo with evaluation notes."
    ],
    roles: [
      ["Machine Learning Engineer", 84, "Strong fit with deployed models and clear evaluation."],
      ["AI Engineer", 81, "Good match if you can build practical LLM applications."],
      ["Data Scientist", 77, "Works well with statistics and storytelling experience."]
    ]
  },
  "Software Engineer": {
    keywords: ["javascript", "typescript", "react", "node", "api", "database"],
    gaps: ["System design", "Testing", "API design", "Database modeling"],
    learning: ["Build REST APIs", "Write unit and integration tests", "Practice database schema design"],
    interviews: ["A bug you debugged", "A feature you shipped", "How you would scale an app"],
    projects: [
      "Build a full-stack app with auth, database, and clean API routes.",
      "Add unit tests and integration tests to a production-style feature.",
      "Document architecture decisions and deployment steps in the README."
    ],
    roles: [
      ["Software Engineer", 85, "Strong fit with full-stack projects and tested code."],
      ["Frontend Engineer", 80, "Good match if your UI quality and React skills are visible."],
      ["Backend Engineer", 73, "Improve fit by showing database and API depth."]
    ]
  },
  "UX Researcher": {
    keywords: ["research", "interviews", "survey", "figma", "usability", "analysis"],
    gaps: ["Research planning", "Interview synthesis", "Usability testing", "Insight storytelling"],
    learning: ["Run usability tests", "Synthesize interview notes", "Write research findings clearly"],
    interviews: ["A user insight that changed a decision", "How you avoid biased questions", "How you prioritize research findings"],
    projects: [
      "Run five user interviews and publish a research synthesis report.",
      "Create a usability test plan for a real app and summarize findings.",
      "Design a persona and journey map backed by research evidence."
    ],
    roles: [
      ["UX Researcher", 83, "Strong fit with research case studies and synthesis artifacts."],
      ["Product Researcher", 78, "Good match if you connect insights to business decisions."],
      ["UX Designer", 70, "Add wireframes and prototypes to improve this path."]
    ]
  },
  "Cybersecurity Analyst": {
    keywords: ["security", "network", "linux", "risk", "incident", "python"],
    gaps: ["Network fundamentals", "SIEM tools", "Incident response", "Threat modeling"],
    learning: ["Study networking basics", "Practice Linux command line", "Learn common attack patterns"],
    interviews: ["How you would investigate an alert", "A security risk you identified", "How you communicate risk"],
    projects: [
      "Create a security incident report from sample log data.",
      "Build a basic network scanning lab and document findings.",
      "Write a threat model for a login and payment workflow."
    ],
    roles: [
      ["Cybersecurity Analyst", 84, "Strong fit with security labs, log analysis, and clear reporting."],
      ["SOC Analyst", 80, "Good entry path if you practice alerts and incident response."],
      ["Risk Analyst", 72, "Better fit if your communication and documentation are strong."]
    ]
  },
  "Cloud Engineer": {
    keywords: ["aws", "azure", "cloud", "linux", "docker", "networking", "terraform"],
    gaps: ["Cloud architecture", "Docker", "Infrastructure as code", "Monitoring"],
    learning: ["Deploy one app to the cloud", "Learn Docker fundamentals", "Practice IAM and networking"],
    interviews: ["How you deploy a reliable service", "A cloud cost tradeoff", "How you monitor uptime"],
    projects: [
      "Deploy a full-stack app with environment variables and monitoring.",
      "Containerize an app with Docker and document the workflow.",
      "Create a cloud architecture diagram for this platform."
    ],
    roles: [
      ["Cloud Engineer", 85, "Strong fit with deployment, Linux, and architecture proof."],
      ["DevOps Associate", 79, "Good path if you add CI/CD and monitoring projects."],
      ["Cloud Support Engineer", 75, "Entry-friendly role with strong troubleshooting evidence."]
    ]
  }
};

const defaultRoadmap = [
  ["1", "Clarify target", "Pick one role and collect five job descriptions to identify repeated skills."],
  ["2", "Close gaps", "Choose two missing skills and complete focused mini-projects around them."],
  ["3", "Build proof", "Publish one portfolio case study with problem, process, metrics, and result."],
  ["4", "Apply smarter", "Customize your resume bullets and outreach message for each target role."]
];

const form = document.querySelector("#careerForm");
const loadSampleButton = document.querySelector("#loadSampleButton");
const saveProfileButton = document.querySelector("#saveProfileButton");
const exportReportButton = document.querySelector("#exportReportButton");
const resumeText = document.querySelector("#resumeText");
const jobDescription = document.querySelector("#jobDescription");
const storageKey = "careerIntelReports";
let currentReport = null;

function parseSkills(value) {
  return value
    .toLowerCase()
    .split(/,|\n/)
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function calculateReadiness(profileSkills, role) {
  const blueprint = roleBlueprints[role];
  const matched = blueprint.keywords.filter((keyword) =>
    profileSkills.some((skill) => skill.includes(keyword) || keyword.includes(skill))
  );
  return Math.min(96, 58 + matched.length * 7);
}

function renderReport(role, readiness) {
  const blueprint = roleBlueprints[role];
  const adjustedRoles = blueprint.roles.map(([title, score, summary], index) => ({
    title,
    score: Math.min(98, Math.max(52, score + Math.round((readiness - 74) / 3) - index * 2)),
    summary
  }));

  document.querySelector("#readinessScore").textContent = `${readiness}%`;
  document.querySelector("#readinessMetric").textContent = `${readiness}%`;
  document.querySelector("#gapMetric").textContent = blueprint.gaps.length;
  document.querySelector("#roleMetric").textContent = adjustedRoles.length;
  document.querySelector("#readinessBar").style.width = `${readiness}%`;
  document.querySelector("#readinessText").textContent =
    readiness >= 82
      ? "Your profile is close to role-ready. Focus on proof: measurable projects, strong resume bullets, and interview stories."
      : "Your profile has a clear direction. Build role-specific evidence and close the top skill gaps to raise your readiness.";

  document.querySelector("#roleCards").innerHTML = adjustedRoles
    .map(
      (roleMatch) => `
        <article class="role-card">
          <strong>${roleMatch.title}</strong>
          <span class="match">${roleMatch.score}% match</span>
          <p>${roleMatch.summary}</p>
        </article>
      `
    )
    .join("");

  document.querySelector("#gapList").innerHTML = blueprint.gaps
    .map((gap) => `<li>${gap}</li>`)
    .join("");

  document.querySelector("#projectList").innerHTML = blueprint.projects
    .map((project) => `<li>${project}</li>`)
    .join("");

  document.querySelector("#learningList").innerHTML = blueprint.learning
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.querySelector("#interviewList").innerHTML = blueprint.interviews
    .map((item) => `<li>${item}</li>`)
    .join("");

  currentReport = {
    name: document.querySelector("#fullName").value || "Demo User",
    level: document.querySelector("#level").value,
    role,
    readiness,
    gaps: blueprint.gaps,
    projects: blueprint.projects,
    learning: blueprint.learning,
    createdAt: new Date().toISOString()
  };

  renderRoadmap();
}

function renderRoadmap() {
  document.querySelector("#roadmapList").innerHTML = defaultRoadmap
    .map(
      ([step, title, detail]) => `
        <article class="roadmap-item">
          <span>${step}</span>
          <h4>${title}</h4>
          <p>${detail}</p>
        </article>
      `
    )
    .join("");
}

function analyzeResume() {
  const text = resumeText.value.toLowerCase();
  const checks = [
    ["project", "Add at least one project with your role, tools, and outcome."],
    ["python", "Mention technical tools clearly so recruiters can scan fast."],
    ["sql", "Add SQL or database evidence if your target role uses data."],
    ["metric", "Use numbers such as accuracy, time saved, users, or ranking."],
    ["lead", "Show ownership with verbs like led, built, analyzed, or shipped."]
  ];

  const hits = checks.filter(([keyword]) => text.includes(keyword));
  const score = text.trim() ? Math.min(95, 35 + hits.length * 12 + Math.floor(text.length / 120)) : 0;
  document.querySelector("#resumeScore").textContent = `${score}%`;

  const tips = checks
    .filter(([keyword]) => !text.includes(keyword))
    .map(([, tip]) => tip);

  document.querySelector("#resumeTips").innerHTML = (
    tips.length ? tips : ["Strong start. Now tailor the resume to the exact job description."]
  )
    .map((tip) => `<li>${tip}</li>`)
    .join("");
}

function analyzeJobDescription() {
  const role = document.querySelector("#targetRole").value;
  const skills = parseSkills(document.querySelector("#skills").value);
  const text = jobDescription.value.toLowerCase();
  const keywords = roleBlueprints[role].keywords;
  const required = keywords.filter((keyword) => text.includes(keyword));
  const matched = required.filter((keyword) =>
    skills.some((skill) => skill.includes(keyword) || keyword.includes(skill))
  );
  const score = required.length ? Math.round((matched.length / required.length) * 100) : 0;
  document.querySelector("#jobScore").textContent = `${score}%`;

  const missing = required.filter((keyword) => !matched.includes(keyword));
  const tips = text.trim()
    ? [
        `Detected role keywords: ${required.length ? required.join(", ") : "not enough matching keywords yet"}.`,
        missing.length
          ? `Add proof for these requirements: ${missing.join(", ")}.`
          : "Your listed skills cover the detected role requirements well.",
        "Use the repeated words from the job post naturally in your resume bullets."
      ]
    : ["Paste a job description to discover repeated requirements."];

  document.querySelector("#jobTips").innerHTML = tips.map((tip) => `<li>${tip}</li>`).join("");
}

function getSavedReports() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

function setSavedReports(reports) {
  localStorage.setItem(storageKey, JSON.stringify(reports));
}

function renderSavedReports() {
  const reports = getSavedReports();
  document.querySelector("#savedReports").innerHTML = reports.length
    ? reports
        .map(
          (report) => `
            <article class="saved-report">
              <strong>${report.name}</strong>
              <span>${report.role}</span>
              <span>${report.readiness}% readiness</span>
              <span>${new Date(report.createdAt).toLocaleDateString()}</span>
            </article>
          `
        )
        .join("")
    : `<article class="saved-report"><strong>No saved reports yet</strong><span>Generate a report and click Save profile.</span></article>`;
}

function saveCurrentReport() {
  if (!currentReport) return;
  const reports = getSavedReports();
  reports.unshift(currentReport);
  setSavedReports(reports.slice(0, 6));
  renderSavedReports();
  document.querySelector("#profileStatus").textContent = "Profile saved in this browser.";
}

function exportReport() {
  if (!currentReport) return;
  const reportText = [
    "AI Career Intelligence Report",
    `Name: ${currentReport.name}`,
    `Level: ${currentReport.level}`,
    `Target role: ${currentReport.role}`,
    `Career readiness: ${currentReport.readiness}%`,
    "",
    "Skill gaps:",
    ...currentReport.gaps.map((gap) => `- ${gap}`),
    "",
    "Portfolio projects:",
    ...currentReport.projects.map((project) => `- ${project}`),
    "",
    "Learning plan:",
    ...currentReport.learning.map((item) => `- ${item}`)
  ].join("\n");

  const blob = new Blob([reportText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "career-intelligence-report.txt";
  link.click();
  URL.revokeObjectURL(url);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const role = document.querySelector("#targetRole").value;
  const skills = parseSkills(document.querySelector("#skills").value);
  const readiness = calculateReadiness(skills, role);
  renderReport(role, readiness);
  analyzeJobDescription();
});

loadSampleButton.addEventListener("click", () => {
  document.querySelector("#fullName").value = "Garima Sharma";
  document.querySelector("#level").value = "Student";
  document.querySelector("#targetRole").value = "AI Product Manager";
  document.querySelector("#skills").value =
    "Python, communication, research, Excel, machine learning, presentation";
  document.querySelector("#goal").value =
    "I want to build a resume-worthy AI product and apply for internships.";
  resumeText.value =
    "Built a career intelligence project using Python and product research. Created dashboards, analyzed user needs, and presented project outcomes with metrics.";
  form.dispatchEvent(new Event("submit"));
  analyzeResume();
  jobDescription.value =
    "We are hiring an AI Product Manager with product analytics, research, communication, roadmap planning, and AI evaluation experience.";
  analyzeJobDescription();
});

resumeText.addEventListener("input", analyzeResume);
jobDescription.addEventListener("input", analyzeJobDescription);
saveProfileButton.addEventListener("click", saveCurrentReport);
exportReportButton.addEventListener("click", exportReport);

renderReport("AI Product Manager", 74);
renderRoadmap();
renderSavedReports();

