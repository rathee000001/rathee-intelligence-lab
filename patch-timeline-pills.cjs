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
  return t.includes("const timelineItems") && t.includes("TimelineItem");
});

console.log("Timeline files found:");
targetFiles.forEach((f) => console.log(" -", f));

const newType = `type TimelineItem = {
  key: TimelineCluster;
  date: string;
  label: string;
  course: string;
  instructors: string[];
  title: string;
  subtitle: string;
  href: string;
  proof: string[];
  skills: string[];
  stage: string;
};`;

const timeline = `const timelineItems: TimelineItem[] = [
  {
    key: "goldV3",
    date: "Current / Spring 2026",
    label: "BUSI 650 + QANT 750",
    course: "Business Analytics & Decision Making + Managerial Decision Modelling",
    instructors: ["Professor Rajendra Tibrewala", "Professor Shaya Sheikh"],
    title: "Gold Nexus Alpha / Deep ML Academic Fusion",
    subtitle: "A deployed forecasting and intelligence platform that brings together gold market data, forecasting workflows, regression intelligence, Deep ML model views, structured JSON/CSV artifacts, interactive charts, SQL patching, vector/RAG expansion, and AI-assisted interpretation.",
    href: "/projects/gold-nexus-alpha",
    proof: ["300+ GitHub commits", "Deep ML model views", "SQL/vector/RAG patch", "Live forecasting platform"],
    skills: ["Next.js", "Python", "SQL", "RAG", "Deep ML"],
    stage: "Current"
  },
  {
    key: "portfolio",
    date: "Current",
    label: "Portfolio System",
    course: "Independent Analytics Portfolio",
    instructors: ["Independent build"],
    title: "Rathee Intelligence Lab",
    subtitle: "A recruiter-facing analytics portfolio that turns coursework, forecasting systems, dashboards, case studies, AI-assisted tools, and deployed project pages into one interactive proof system.",
    href: "/",
    proof: ["Live Vercel deployment", "Project launcher", "Recruiter proof system", "Skill-to-project mapping"],
    skills: ["React", "Three.js", "Product Design", "Portfolio Strategy"],
    stage: "Current"
  },
  {
    key: "goldV2",
    date: "Jan 2026 - Feb 2026",
    label: "QANT 750",
    course: "Managerial Decision Modelling",
    instructors: ["Professor Shaya Sheikh", "Professor Rajendra Tibrewala approval"],
    title: "Gold Forecasting Project — Version 2",
    subtitle: "A rebuilt forecasting and decision-modeling phase that extended the original Gold project into a stronger analytics system with clearer model logic, regression interpretation, decision-support structure, and academic project alignment.",
    href: "/projects/gold-ai-platform",
    proof: ["Jan-Feb 2026 rebuild", "Decision-modeling alignment", "Regression logic", "Faculty-approved continuation"],
    skills: ["Forecasting", "Regression", "Decision Modeling", "Data Cleaning"],
    stage: "Version 2"
  },
  {
    key: "goldV1",
    date: "Fall 2025",
    label: "MGMT 780",
    course: "Supply Chain Management",
    instructors: ["Professor Rajendra Tibrewala"],
    title: "Gold Forecasting Project — Version 1",
    subtitle: "The first academic version of the Gold forecasting project, establishing the original project direction around gold market behavior, supply chain intelligence, macro factors, forecasting logic, and business decision-support interpretation.",
    href: "/projects/gold-forecasting-model",
    proof: ["Academic version 1", "Forecasting foundation", "Supply chain intelligence", "Gold market analysis"],
    skills: ["Excel", "Forecasting", "Supply Chain", "Documentation"],
    stage: "Version 1"
  },
  {
    key: "marketing",
    date: "Fall 2025",
    label: "MRKT 620",
    course: "Strategic Marketing and Branding",
    instructors: ["Professor Jake Treister"],
    title: "Chapters 4 Change",
    subtitle: "A strategic marketing and branding project that converts nonprofit purpose into audience segmentation, positioning, campaign messaging, storytelling, web presentation, and call-to-action strategy.",
    href: "/projects/chapters-4-change",
    proof: ["Audience segmentation", "Campaign strategy", "Brand positioning", "Nonprofit storytelling"],
    skills: ["Marketing Strategy", "Branding", "Storytelling", "Web Design"],
    stage: "Marketing"
  },
  {
    key: "fundraiser",
    date: "Fall 2025",
    label: "MRKT 620",
    course: "Strategic Marketing and Branding",
    instructors: ["Professor Jake Treister"],
    title: "The Book Fairies Fundraiser",
    subtitle: "A fundraising campaign experience focused on turning nonprofit impact into a supporter journey through campaign storytelling, donation tiers, partner messaging, gallery content, and conversion-focused UX.",
    href: "/projects/the-book-fairies",
    proof: ["Fundraising UX", "Donation flow", "Supporter journey", "Partner messaging"],
    skills: ["Campaign Design", "UX", "HTML/CSS", "Conversion Flow"],
    stage: "Campaign"
  },
  {
    key: "tableau",
    date: "Spring 2025",
    label: "QANT 630",
    course: "Operations and Supply Chain Management",
    instructors: ["Professor He Zhang"],
    title: "DataCo Tableau Supply Chain Story",
    subtitle: "A supply chain analytics dashboard project that transforms operations data into executive storytelling across sales flow, delivery risk, shipping performance, customer segmentation, filters, and decision-support insights.",
    href: "/projects/dataco-tableau",
    proof: ["Tableau dashboard", "Delivery risk analysis", "Customer segmentation", "Executive story"],
    skills: ["Tableau", "Supply Chain Analytics", "Dashboard Design", "Operations"],
    stage: "Analytics"
  },
  {
    key: "finance",
    date: "Spring 2025",
    label: "ACCT 601",
    course: "Managerial Accounting",
    instructors: ["Professor Joo-Kwang Yun"],
    title: "SEC 10-K Financial Analysis",
    subtitle: "A financial analysis project that converts SEC 10-K filing evidence into business review outputs, including financial statements, profitability, liquidity, leverage, ratio analysis, trend interpretation, reporting, and presentation-ready insights.",
    href: "/projects/sec-10k-financial-analysis",
    proof: ["SEC 10-K analysis", "Ratio review", "Financial statements", "Business review"],
    skills: ["Excel", "Financial Analysis", "Accounting", "Business Writing"],
    stage: "Financial"
  },
  {
    key: "management",
    date: "Fall 2024",
    label: "MGMT 605",
    course: "Organizational Behavior",
    instructors: ["Professor Radoslaw Nowak"],
    title: "Meta Strategic Management Case Analysis",
    subtitle: "An MBA strategic management case study analyzing Meta through leadership, organizational culture, ethics, privacy, regulation, stakeholder impact, and strategic recommendations. This early coursework project was later converted into a hosted portfolio case study.",
    href: "/projects/meta-case-analysis",
    proof: ["Leadership analysis", "Culture and ethics", "Stakeholder analysis", "Strategic recommendations"],
    skills: ["Strategic Management", "Leadership", "Ethics", "Presentation"],
    stage: "Case"
  }
];`;

const toneBlock = `const timelineTone: Record<string, {
  stagePill: string;
  coursePill: string;
  instructorPill: string;
  evidenceCard: string;
  evidenceText: string;
  selectedCard: string;
}> = {
  goldV3: {
    stagePill: "bg-yellow-300 text-slate-950 shadow-yellow-100",
    coursePill: "border-yellow-300 bg-yellow-50 text-yellow-800",
    instructorPill: "border-blue-200 bg-blue-50 text-blue-800",
    evidenceCard: "border-yellow-200 bg-yellow-50",
    evidenceText: "text-yellow-950",
    selectedCard: "border-yellow-300 bg-yellow-50 shadow-yellow-100"
  },
  portfolio: {
    stagePill: "bg-emerald-300 text-slate-950 shadow-emerald-100",
    coursePill: "border-emerald-300 bg-emerald-50 text-emerald-800",
    instructorPill: "border-slate-200 bg-slate-50 text-slate-800",
    evidenceCard: "border-emerald-200 bg-emerald-50",
    evidenceText: "text-emerald-950",
    selectedCard: "border-emerald-300 bg-emerald-50 shadow-emerald-100"
  },
  goldV2: {
    stagePill: "bg-blue-600 text-white shadow-blue-100",
    coursePill: "border-blue-200 bg-blue-50 text-blue-800",
    instructorPill: "border-indigo-200 bg-indigo-50 text-indigo-800",
    evidenceCard: "border-blue-200 bg-blue-50",
    evidenceText: "text-blue-950",
    selectedCard: "border-blue-300 bg-blue-50 shadow-blue-100"
  },
  goldV1: {
    stagePill: "bg-amber-400 text-slate-950 shadow-amber-100",
    coursePill: "border-amber-200 bg-amber-50 text-amber-800",
    instructorPill: "border-orange-200 bg-orange-50 text-orange-800",
    evidenceCard: "border-amber-200 bg-amber-50",
    evidenceText: "text-amber-950",
    selectedCard: "border-amber-300 bg-amber-50 shadow-amber-100"
  },
  marketing: {
    stagePill: "bg-fuchsia-500 text-white shadow-fuchsia-100",
    coursePill: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800",
    instructorPill: "border-pink-200 bg-pink-50 text-pink-800",
    evidenceCard: "border-fuchsia-200 bg-fuchsia-50",
    evidenceText: "text-fuchsia-950",
    selectedCard: "border-fuchsia-300 bg-fuchsia-50 shadow-fuchsia-100"
  },
  fundraiser: {
    stagePill: "bg-rose-500 text-white shadow-rose-100",
    coursePill: "border-rose-200 bg-rose-50 text-rose-800",
    instructorPill: "border-pink-200 bg-pink-50 text-pink-800",
    evidenceCard: "border-rose-200 bg-rose-50",
    evidenceText: "text-rose-950",
    selectedCard: "border-rose-300 bg-rose-50 shadow-rose-100"
  },
  tableau: {
    stagePill: "bg-cyan-500 text-white shadow-cyan-100",
    coursePill: "border-cyan-200 bg-cyan-50 text-cyan-800",
    instructorPill: "border-sky-200 bg-sky-50 text-sky-800",
    evidenceCard: "border-cyan-200 bg-cyan-50",
    evidenceText: "text-cyan-950",
    selectedCard: "border-cyan-300 bg-cyan-50 shadow-cyan-100"
  },
  finance: {
    stagePill: "bg-violet-500 text-white shadow-violet-100",
    coursePill: "border-violet-200 bg-violet-50 text-violet-800",
    instructorPill: "border-purple-200 bg-purple-50 text-purple-800",
    evidenceCard: "border-violet-200 bg-violet-50",
    evidenceText: "text-violet-950",
    selectedCard: "border-violet-300 bg-violet-50 shadow-violet-100"
  },
  management: {
    stagePill: "bg-slate-950 text-yellow-200 shadow-slate-200",
    coursePill: "border-slate-300 bg-slate-50 text-slate-800",
    instructorPill: "border-yellow-200 bg-yellow-50 text-yellow-900",
    evidenceCard: "border-slate-200 bg-slate-50",
    evidenceText: "text-slate-950",
    selectedCard: "border-slate-400 bg-slate-50 shadow-slate-200"
  }
};

function getTimelineTone(key: TimelineCluster) {
  return timelineTone[key] || timelineTone.portfolio;
}`;

let patched = 0;

for (const file of targetFiles) {
  let old = fs.readFileSync(file, "utf8");
  let updated = old;
  const backup = `${file}.backup-${Date.now()}`;
  fs.writeFileSync(backup, old);

  updated = updated.replace(/type TimelineItem = \{[\s\S]*?\};/, newType);

  updated = updated.replace(
    /const timelineItems: TimelineItem\[\] = \[[\s\S]*?\n\];/,
    timeline
  );

  if (!updated.includes("const timelineTone: Record")) {
    updated = updated.replace(
      /const sequenceStats = \[[\s\S]*?\];/,
      (match) => `${match}\n\n${toneBlock}`
    );
  }

  updated = updated.replace(
    /const active = timelineItems\.find\(\(item\) => item\.key === activeKey\) \|\| timelineItems\[\d+\];/,
    `const active = timelineItems.find((item) => item.key === activeKey) || timelineItems[0];
  const activeTone = getTimelineTone(active.key);`
  );

  updated = updated.replace(
    /useState<TimelineCluster>\("[^"]+"\)/g,
    'useState<TimelineCluster>("goldV3")'
  );

  updated = updated.replace(
    /<span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-\[0\.18em\] text-yellow-200">([\s\S]*?)<\/span>/,
    `<span className={["rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-lg", activeTone.stagePill].join(" ")}>$1</span>`
  );

  updated = updated.replace(
    `                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {active.subtitle}
                </p>`,
    `                <div className="mt-5 flex flex-wrap gap-2">
                  <span className={["rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em]", activeTone.coursePill].join(" ")}>
                    Course: {active.label}
                  </span>
                  <span className={["rounded-full border px-4 py-2 text-xs font-black", activeTone.coursePill].join(" ")}>
                    Subject: {active.course}
                  </span>
                  {active.instructors.map((name) => (
                    <span
                      key={name}
                      className={["rounded-full border px-4 py-2 text-xs font-semibold", activeTone.instructorPill].join(" ")}
                    >
                      <strong>Instructor:</strong> {name}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {active.subtitle}
                </p>`
  );

  updated = updated.replace(
    /<div className="mt-6 grid gap-3 sm:grid-cols-2">\s*\{active\.proof\.map\(\(item\) => \(\s*<div key=\{item\} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">\s*<p className="text-sm font-black text-slate-950">\{item\}<\/p>\s*<\/div>\s*\)\)\}\s*<\/div>/,
    `<div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {active.proof.map((item) => (
                    <div key={item} className={["rounded-2xl border p-4 shadow-sm", activeTone.evidenceCard].join(" ")}>
                      <p className={["text-xs font-black uppercase tracking-[0.14em]", activeTone.evidenceText].join(" ")}>
                        Project Evidence
                      </p>
                      <p className={["mt-2 text-sm font-black", activeTone.evidenceText].join(" ")}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>`
  );

  updated = updated.replace(
    `                    const selected = activeKey === item.key;

                    return (`,
    `                    const selected = activeKey === item.key;
                    const tone = getTimelineTone(item.key);

                    return (`
  );

  updated = updated.replace(
    `selected
                            ? "border-blue-300 bg-blue-50 shadow-blue-100"
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-yellow-300"`,
    `selected
                            ? tone.selectedCard
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-yellow-300"`
  );

  updated = updated.replace(
    /<div>\s*<div className="flex flex-wrap items-center gap-3">[\s\S]*?<\/div>\s*<h3 className="mt-3 text-2xl font-black leading-tight text-slate-950">/,
    `<div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={["rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]", tone.coursePill].join(" ")}>
                              Course: {item.label}
                            </span>
                            <span className={["rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] shadow-sm", tone.stagePill].join(" ")}>
                              {item.stage}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className={["rounded-full border px-3 py-1 text-[10px] font-black", tone.coursePill].join(" ")}>
                              Subject: {item.course}
                            </span>
                            {item.instructors.map((name) => (
                              <span
                                key={name}
                                className={["rounded-full border px-3 py-1 text-[10px] font-semibold", tone.instructorPill].join(" ")}
                              >
                                <strong>Instructor:</strong> {name}
                              </span>
                            ))}
                          </div>

                          <h3 className="mt-3 text-2xl font-black leading-tight text-slate-950">`
  );

  fs.writeFileSync(file, updated, "utf8");
  console.log("PATCHED:", file);
  console.log("BACKUP:", backup);
  patched++;
}

console.log("TOTAL PATCHED:", patched);
console.log("Added subject pills, bold Instructor labels, professor pills, and colored evidence cards.");
