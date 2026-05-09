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

const targets = files.filter((file) => {
  const t = fs.readFileSync(file, "utf8");
  return (
    t.includes("Meta Strategic Management Case Analysis") ||
    t.includes("From company context to strategic recommendations") ||
    t.includes("Meta as a management case")
  );
});

if (!targets.length) {
  console.error("Could not find the existing Meta project page file.");
  process.exit(1);
}

console.log("Meta files found:");
targets.forEach((f) => console.log(" -", f));

const heroPills = `
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-800 shadow-sm">
                Timeline: Fall 2024
              </span>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 shadow-sm">
                Course: MGMT 605
              </span>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-800 shadow-sm">
                Subject: Organizational Behavior
              </span>
              <span className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-900 shadow-sm">
                <strong>Instructor:</strong> Dr. Radoslaw Nowak
              </span>
            </div>
`;

const caseFlowPills = `
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-800 shadow-sm">
                  Timeline: Fall 2024
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 shadow-sm">
                  Course: MGMT 605
                </span>
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-800 shadow-sm">
                  Subject: Organizational Behavior
                </span>
                <span className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-900 shadow-sm">
                  <strong>Instructor:</strong> Dr. Radoslaw Nowak
                </span>
              </div>
`;

const evidenceCard = `
          <div className="mt-6 rounded-3xl border border-yellow-200 bg-yellow-50 p-6 shadow-xl shadow-yellow-100/60">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-800">
              Academic Mapping
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-yellow-200 bg-white/80 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-yellow-700">Term</p>
                <p className="mt-2 text-sm font-black text-slate-950">Fall 2024</p>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-white/80 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">Course</p>
                <p className="mt-2 text-sm font-black text-slate-950">MGMT 605</p>
              </div>
              <div className="rounded-2xl border border-indigo-200 bg-white/80 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-700">Subject</p>
                <p className="mt-2 text-sm font-black text-slate-950">Organizational Behavior</p>
              </div>
              <div className="rounded-2xl border border-yellow-300 bg-white/80 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-yellow-800">Instructor</p>
                <p className="mt-2 text-sm font-black text-slate-950">Dr. Radoslaw Nowak</p>
              </div>
            </div>
          </div>
`;

let patchedCount = 0;

for (const file of targets) {
  let old = fs.readFileSync(file, "utf8");
  let updated = old;
  const backup = `${file}.backup-meta-academic-${Date.now()}`;
  fs.writeFileSync(backup, old);

  // Improve hero description if the exact old sentence exists.
  updated = updated.replace(
    "A completed management case project analyzing Meta through leadership, culture, ethics, privacy, regulation, stakeholders, and strategic recommendations.",
    "An MBA academic case study analyzing Meta through leadership, organizational culture, ethics, privacy, regulation, stakeholder impact, and strategic recommendations. Originally completed in Fall 2024 for MGMT 605: Organizational Behavior and later converted into a hosted portfolio case study."
  );

  // Add hero pills after the hero paragraph, only if not already added.
  if (!updated.includes("Timeline: Fall 2024") && updated.includes("View Report")) {
    updated = updated.replace(
      /(<p[^>]*>\s*An MBA academic case study analyzing Meta[\s\S]*?hosted portfolio case study\.\s*<\/p>)/,
      `$1${heroPills}`
    );
  }

  // If paragraph did not match due line breaks, add pills before buttons.
  if (!updated.includes("Timeline: Fall 2024") && updated.includes("View Report")) {
    updated = updated.replace(
      /(<div[^>]*>\s*<[^>]*>\s*View Report\s*<\/[^>]*>)/,
      `${heroPills}\n$1`
    );
  }

  // Add pills near Case Flow area.
  if (updated.includes("CASE FLOW") && !updated.includes("Academic Mapping")) {
    updated = updated.replace(
      /(CASE FLOW[\s\S]{0,600}?From company context to strategic recommendations\.)/,
      `$1${caseFlowPills}`
    );
  }

  // Add an academic mapping card before the dark "WHAT THIS PROVES" block if possible.
  if (!updated.includes("Academic Mapping") && updated.includes("WHAT THIS PROVES")) {
    updated = updated.replace(
      /(<[^>]*>\s*WHAT THIS PROVES\s*<\/[^>]*>)/,
      `${evidenceCard}\n$1`
    );
  }

  // Broader fallback: add academic mapping after "Meta as a management case" card.
  if (!updated.includes("Academic Mapping") && updated.includes("Meta as a management case")) {
    updated = updated.replace(
      /(Meta as a management case[\s\S]{0,900}?<\/div>\s*<\/div>)/,
      `$1${evidenceCard}`
    );
  }

  if (updated !== old) {
    fs.writeFileSync(file, updated, "utf8");
    console.log("PATCHED:", file);
    console.log("BACKUP:", backup);
    patchedCount++;
  } else {
    console.log("NO CHANGE:", file);
    console.log("BACKUP:", backup);
  }
}

console.log("TOTAL PATCHED:", patchedCount);
console.log("Added Fall 2024, MGMT 605, Organizational Behavior, and Instructor: Dr. Radoslaw Nowak pills.");
