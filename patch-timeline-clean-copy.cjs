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
  return t.includes("const timelineItems");
});

console.log("Timeline files found:");
targetFiles.forEach((f) => console.log(" -", f));

const timeline = `const timelineItems: TimelineItem[] = [
  {
    key: "goldV3",
    date: "Current / Spring 2026",
    label: "BUSI 650 + QANT 750",
    title: "Gold Nexus Alpha / Deep ML Academic Fusion",
    subtitle: "A deployed forecasting and intelligence platform that brings together gold market data, forecasting workflows, regression intelligence, Deep ML model views, structured JSON/CSV artifacts, interactive charts, SQL patching, vector/RAG expansion, and AI-assisted interpretation.",
    href: "/projects/gold-nexus-alpha",
    proof: ["Professor Rajendra Tibrewala", "Professor Shaya Sheikh", "300+ GitHub commits", "SQL/vector/RAG patch"],
    skills: ["Next.js", "Python", "SQL", "RAG", "Deep ML"],
    stage: "Current"
  },
  {
    key: "portfolio",
    date: "Current",
    label: "Live Portfolio",
    title: "Rathee Intelligence Lab",
    subtitle: "A recruiter-facing analytics portfolio that turns coursework, forecasting systems, dashboards, case studies, AI-assisted tools, and deployed project pages into one interactive proof system.",
    href: "/",
    proof: ["Independent portfolio build", "Live Vercel deployment", "Project launcher", "Recruiter proof system"],
    skills: ["React", "Three.js", "Product Design", "Portfolio Strategy"],
    stage: "Current"
  },
  {
    key: "goldV2",
    date: "Jan 2026 - Feb 2026",
    label: "QANT 750",
    title: "Gold Forecasting Project — Version 2",
    subtitle: "A rebuilt forecasting and decision-modeling phase that extended the original Gold project into a stronger analytics system with clearer model logic, regression interpretation, decision-support structure, and academic project alignment.",
    href: "/projects/gold-ai-platform",
    proof: ["Professor Shaya Sheikh", "Professor Rajendra Tibrewala approval", "Jan-Feb 2026 rebuild", "Decision-modeling alignment"],
    skills: ["Forecasting", "Regression", "Decision Modeling", "Data Cleaning"],
    stage: "Version 2"
  },
  {
    key: "goldV1",
    date: "Fall 2025",
    label: "MGMT 780",
    title: "Gold Forecasting Project — Version 1",
    subtitle: "The first academic version of the Gold forecasting project, establishing the original project direction around gold market behavior, supply chain intelligence, macro factors, forecasting logic, and business decision-support interpretation.",
    href: "/projects/gold-forecasting-model",
    proof: ["Professor Rajendra Tibrewala", "Supply Chain Management", "Forecasting foundation", "Academic version 1"],
    skills: ["Excel", "Forecasting", "Supply Chain", "Documentation"],
    stage: "Version 1"
  },
  {
    key: "marketing",
    date: "Fall 2025",
    label: "MRKT 620",
    title: "Chapters 4 Change",
    subtitle: "A strategic marketing and branding project that converts nonprofit purpose into audience segmentation, positioning, campaign messaging, storytelling, web presentation, and call-to-action strategy.",
    href: "/projects/chapters-4-change",
    proof: ["Professor Jake Treister", "Strategic Marketing and Branding", "Audience segmentation", "Campaign strategy"],
    skills: ["Marketing Strategy", "Branding", "Storytelling", "Web Design"],
    stage: "Marketing"
  },
  {
    key: "fundraiser",
    date: "Fall 2025",
    label: "MRKT 620",
    title: "The Book Fairies Fundraiser",
    subtitle: "A fundraising campaign experience focused on turning nonprofit impact into a supporter journey through campaign storytelling, donation tiers, partner messaging, gallery content, and conversion-focused UX.",
    href: "/projects/the-book-fairies",
    proof: ["Professor Jake Treister", "Fundraising UX", "Donation flow", "Supporter journey"],
    skills: ["Campaign Design", "UX", "HTML/CSS", "Conversion Flow"],
    stage: "Campaign"
  },
  {
    key: "tableau",
    date: "Spring 2025",
    label: "QANT 630",
    title: "DataCo Tableau Supply Chain Story",
    subtitle: "A supply chain analytics dashboard project that transforms operations data into executive storytelling across sales flow, delivery risk, shipping performance, customer segmentation, filters, and decision-support insights.",
    href: "/projects/dataco-tableau",
    proof: ["Professor He Zhang", "Operations and Supply Chain Management", "Tableau dashboard", "Executive story"],
    skills: ["Tableau", "Supply Chain Analytics", "Dashboard Design", "Operations"],
    stage: "Analytics"
  },
  {
    key: "finance",
    date: "Spring 2025",
    label: "ACCT 601",
    title: "SEC 10-K Financial Analysis",
    subtitle: "A financial analysis project that converts SEC 10-K filing evidence into business review outputs, including financial statements, profitability, liquidity, leverage, ratio analysis, trend interpretation, reporting, and presentation-ready insights.",
    href: "/projects/sec-10k-financial-analysis",
    proof: ["Professor Joo-Kwang Yun", "Managerial Accounting", "SEC 10-K analysis", "Ratio review"],
    skills: ["Excel", "Financial Analysis", "Accounting", "Business Writing"],
    stage: "Financial"
  },
  {
    key: "management",
    date: "Fall 2024",
    label: "MGMT 605",
    title: "Meta Strategic Management Case Analysis",
    subtitle: "An MBA strategic management case study analyzing Meta through leadership, organizational culture, ethics, privacy, regulation, stakeholder impact, and strategic recommendations. This early coursework project was later converted into a hosted portfolio case study.",
    href: "/projects/meta-case-analysis",
    proof: ["Professor Radoslaw Nowak", "Organizational Behavior", "Fall 2024", "Strategic recommendations"],
    skills: ["Strategic Management", "Leadership", "Ethics", "Presentation"],
    stage: "Case"
  }
];`;

let patched = 0;

for (const file of targetFiles) {
  const old = fs.readFileSync(file, "utf8");
  const backup = `${file}.backup-${Date.now()}`;
  fs.writeFileSync(backup, old);

  let updated = old.replace(
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

console.log("TOTAL PATCHED:", patched);
console.log("Descriptions are now project-focused. Course codes and professors are moved into pills/evidence boxes.");
