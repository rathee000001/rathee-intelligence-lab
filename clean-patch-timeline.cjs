const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git", "out", "dist"].includes(e.name)) continue;
      walk(full, out);
    } else if (
      e.isFile() &&
      [".tsx", ".ts", ".jsx", ".js"].includes(path.extname(e.name)) &&
      !full.includes(".backup") &&
      !full.includes(".bak")
    ) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(process.cwd());

const targetFiles = files.filter((file) => {
  const t = fs.readFileSync(file, "utf8");
  return (
    t.includes("Gold Forecasting Model Prototype") ||
    t.includes("Gold Regression Intelligence System") ||
    t.includes("Meta Strategic Management Case Analysis") ||
    t.includes("const timelineItems")
  );
});

console.log("Files to patch:");
targetFiles.forEach((f) => console.log(" -", f));

const timeline = `const timelineItems: TimelineItem[] = [
  {
    key: "goldV3",
    date: "Current / Spring 2026",
    label: "Flagship",
    title: "Gold Nexus Alpha / Deep ML Academic Fusion",
    subtitle: "Current flagship version of the Gold project, fusing forecasting, Deep ML model views, regression intelligence, structured JSON/CSV artifacts, SQL patching, vector/RAG expansion, and AI-assisted interpretation. This Spring 2026 academic fusion connects BUSI 650: Business Analytics & Decision Making with Professor Rajendra Tibrewala and QANT 750: Managerial Decision Modelling with Professor Shaya Sheikh.",
    href: "/projects/gold-nexus-alpha",
    proof: ["Spring 2026 academic fusion", "BUSI 650 + QANT 750", "300+ GitHub commits", "SQL/vector/RAG patch"],
    skills: ["Next.js", "Python", "SQL", "RAG", "Deep ML"],
    stage: "Current"
  },
  {
    key: "portfolio",
    date: "Current",
    label: "Portfolio System",
    title: "Rathee Intelligence Lab",
    subtitle: "A recruiter-facing analytics portfolio turning coursework, forecasting systems, dashboards, case studies, and AI-assisted tools into interactive proof systems with live links, project evidence, and skill mapping.",
    href: "/",
    proof: ["Interactive portfolio", "Project launcher", "Live links", "Recruiter verification"],
    skills: ["React", "Three.js", "Product Design", "Portfolio Strategy"],
    stage: "Showcase"
  },
  {
    key: "goldV2",
    date: "Jan 2026 - Feb 2026",
    label: "Version 2",
    title: "Gold Forecasting Project — Version 2",
    subtitle: "Continued the Fall 2025 Gold project into Spring 2026 after receiving permission from Professor Rajendra Tibrewala to extend the same project into Professor Shaya Sheikh's course because the class project aligned closely with the forecasting and decision-modeling direction.",
    href: "/projects/gold-ai-platform",
    proof: ["Faculty-approved continuation", "Forecasting expansion", "Decision-modeling fit", "Regression logic"],
    skills: ["Forecasting", "Regression", "Decision Modeling", "Data Cleaning"],
    stage: "Rebuild"
  },
  {
    key: "goldV1",
    date: "Fall 2025",
    label: "Version 1",
    title: "Gold Forecasting Project — Version 1",
    subtitle: "The first academic Gold forecasting version created for MGMT 780: Supply Chain Management with Professor Rajendra Tibrewala, establishing the original direction around gold market forecasting, supply chain intelligence, macro factors, and decision-support interpretation.",
    href: "/projects/gold-forecasting-model",
    proof: ["MGMT 780", "Professor Rajendra Tibrewala", "Forecasting foundation", "Supply chain intelligence"],
    skills: ["Excel", "Forecasting", "Supply Chain", "Documentation"],
    stage: "Foundation"
  },
  {
    key: "marketing",
    date: "Fall 2025",
    label: "Marketing Strategy",
    title: "Chapters 4 Change",
    subtitle: "A strategic marketing and branding project connected to MRKT 620: Strategic Marketing and Branding with Professor Jake Treister, focused on nonprofit positioning, audience segmentation, storytelling, campaign messaging, and call-to-action design.",
    href: "/projects/chapters-4-change",
    proof: ["MRKT 620", "Professor Jake Treister", "Segmentation", "Nonprofit story"],
    skills: ["Marketing Strategy", "Branding", "Storytelling", "Web Design"],
    stage: "Strategy"
  },
  {
    key: "fundraiser",
    date: "Fall 2025",
    label: "Campaign UX",
    title: "The Book Fairies Fundraiser",
    subtitle: "A campaign experience connected to strategic marketing coursework, turning nonprofit impact, university partners, donation tiers, gallery content, and supporter contact into conversion-focused UX.",
    href: "/projects/the-book-fairies",
    proof: ["Campaign flow", "Donation tiers", "Partner messaging", "Fundraiser UX"],
    skills: ["Campaign Design", "UX", "HTML/CSS", "Conversion Flow"],
    stage: "Execution"
  },
  {
    key: "tableau",
    date: "Spring 2025",
    label: "Operations Analytics",
    title: "DataCo Tableau Supply Chain Story",
    subtitle: "A QANT 630: Operations and Supply Chain Management project with Professor He Zhang, connecting operations data, sales flow, delivery risk, shipping analysis, customer segmentation, and executive dashboard storytelling.",
    href: "/projects/dataco-tableau",
    proof: ["QANT 630", "Professor He Zhang", "Tableau dashboard", "Supply chain analytics"],
    skills: ["Tableau", "Supply Chain Analytics", "Dashboard Design", "Operations"],
    stage: "Analytics"
  },
  {
    key: "finance",
    date: "Spring 2025",
    label: "Financial Analysis",
    title: "SEC 10-K Financial Analysis",
    subtitle: "An ACCT 601: Managerial Accounting project with Professor Joo-Kwang Yun, connecting SEC filing review, financial statements, spreadsheet modeling, profitability, liquidity, leverage, trends, report, and presentation.",
    href: "/projects/sec-10k-financial-analysis",
    proof: ["ACCT 601", "Professor Joo-Kwang Yun", "10-K review", "Financial analysis"],
    skills: ["Excel", "Financial Analysis", "Accounting", "Business Writing"],
    stage: "Business Evidence"
  },
  {
    key: "management",
    date: "Fall 2024",
    label: "Management Case",
    title: "Meta Strategic Management Case Analysis",
    subtitle: "An MGMT 605: Organizational Behavior project with Professor Radoslaw Nowak, analyzing Meta through leadership, culture, ethics, privacy, regulation, stakeholders, and strategic recommendations. This was an early MBA case project later converted into a hosted portfolio case study.",
    href: "/projects/meta-case-analysis",
    proof: ["MGMT 605", "Professor Radoslaw Nowak", "Leadership analysis", "Strategic recommendations"],
    skills: ["Strategic Management", "Leadership", "Ethics", "Presentation"],
    stage: "Case Analysis"
  }
];`;

let patched = 0;

for (const file of targetFiles) {
  let old = fs.readFileSync(file, "utf8");
  let updated = old;

  if (/const timelineItems: TimelineItem\[\] = \[[\s\S]*?\n\];/.test(updated)) {
    const backup = `${file}.backup-${Date.now()}`;
    fs.writeFileSync(backup, old);

    updated = updated.replace(
      /const timelineItems: TimelineItem\[\] = \[[\s\S]*?\n\];/,
      timeline
    );

    updated = updated.replace(
      /const active = timelineItems\.find\(\(item\) => item\.key === activeKey\) \|\| timelineItems\[\d+\];/,
      "const active = timelineItems.find((item) => item.key === activeKey) || timelineItems[0];"
    );

    updated = updated.replace(
      /useState<TimelineCluster>\("[^"]+"\)/g,
      'useState<TimelineCluster>("goldV3")'
    );

    updated = updated.replace(
      /A chronological map of how MBA coursework, analytics projects, forecasting systems,[\s\S]*?and AI-assisted platforms evolved into one live portfolio\./,
      "A reverse-chronological map of how current portfolio systems, forecasting projects, MBA coursework, marketing websites, financial analysis, and AI-assisted platforms evolved into one live portfolio."
    );

    fs.writeFileSync(file, updated, "utf8");
    console.log("PATCHED:", file);
    console.log("BACKUP:", backup);
    patched++;
  }
}

console.log("TOTAL PATCHED:", patched);
console.log("Now clean .next and restart dev.");
