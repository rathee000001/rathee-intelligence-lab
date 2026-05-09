const fs = require("fs");
const path = require("path");

const componentPath = path.join(
  process.cwd(),
  "components",
  "projects",
  "metaCase",
  "MetaCaseExperience.tsx"
);

fs.mkdirSync(path.dirname(componentPath), { recursive: true });

if (fs.existsSync(componentPath)) {
  const backup = `${componentPath}.backup-${Date.now()}`;
  fs.copyFileSync(componentPath, backup);
  console.log("Backup created:", backup);
}

const content = String.raw`import Link from "next/link";

const projectMeta = [
  { label: "Timeline", value: "Fall 2024" },
  { label: "Course", value: "MGMT 605" },
  { label: "Subject", value: "Organizational Behavior" },
  { label: "Instructor", value: "Professor Radoslaw Nowak" },
  { label: "Institution", value: "New York Institute of Technology" },
  { label: "Project Type", value: "MBA academic research case study" },
  { label: "Status", value: "Completed coursework / hosted portfolio project" }
];

const focusAreas = [
  "Leadership analysis",
  "Organizational culture",
  "Ethics and privacy",
  "Regulation and platform governance",
  "Stakeholder impact",
  "Strategic recommendations"
];

const caseFlow = [
  {
    title: "Company Context",
    body: "Reviewed Meta as a large technology platform operating across social media, advertising, AI, digital communication, and global platform governance."
  },
  {
    title: "Organizational Analysis",
    body: "Applied organizational behavior concepts to examine leadership, culture, decision-making, ethical pressure, employee and user impact, and strategic change."
  },
  {
    title: "External Pressure",
    body: "Analyzed how privacy concerns, regulation, competitive pressure, public trust, and stakeholder expectations shape Meta's strategic direction."
  },
  {
    title: "Recommendations",
    body: "Converted the analysis into structured recommendations focused on responsible innovation, governance, culture, transparency, and long-term strategic resilience."
  }
];

const evidence = [
  "Completed as Fall 2024 MBA coursework",
  "Mapped to MGMT 605: Organizational Behavior",
  "Instructor: Professor Radoslaw Nowak",
  "Converted from course submission into hosted portfolio case study",
  "Focused on strategic management, organizational behavior, and business reasoning"
];

export default function MetaCaseExperience() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
          <p className="text-xs font-black uppercase tracking-[0.45em] text-blue-600">
            Portfolio Timeline Milestone 01
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200 shadow-lg">
              Fall 2024
            </span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-800">
              MGMT 605
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-6xl">
            Meta Strategic Management Case Analysis
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            An MBA academic case study analyzing Meta through organizational behavior,
            leadership, culture, ethics, privacy, regulation, stakeholder impact, and
            strategic recommendations. The project was originally completed as Fall
            2024 coursework and later converted into a hosted portfolio case study.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-black text-slate-800">
              <strong>Subject:</strong> Organizational Behavior
            </span>
            <span className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-900">
              <strong>Instructor:</strong> Professor Radoslaw Nowak
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-4 shadow-sm"
              >
                <p className="text-sm font-black text-blue-950">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/timeline"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              View Timeline
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:border-yellow-300"
            >
              Back to Projects
            </Link>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
              Course Mapping
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {projectMeta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-black text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
              Case Structure
            </p>

            <div className="mt-6 grid gap-4">
              {caseFlow.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-yellow-200">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-950">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-200 bg-yellow-50 p-8 shadow-2xl shadow-yellow-100/70">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-800">
              Project Evidence
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {evidence.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-yellow-200 bg-white/70 p-4"
                >
                  <p className="text-sm font-black text-yellow-950">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300/70">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-200">
              Portfolio Note
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              This project does not use dataset-size metrics because it is a
              research-based academic case study. Its evidence is the course mapping,
              strategic structure, instructor connection, business reasoning, and
              hosted portfolio presentation.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
`;

fs.writeFileSync(componentPath, content, "utf8");

console.log("Meta page patched:");
console.log(componentPath);
console.log("Added Fall 2024 timeline, MGMT 605, subject, instructor, evidence, and project structure.");
