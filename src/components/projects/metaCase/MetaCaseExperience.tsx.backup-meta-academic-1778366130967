"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import MetaCaseScene, { type MetaFlowKey } from "@/components/cinema/metaCase/MetaCaseScene";
import MetaCaseMiniGlyph from "@/components/projects/metaCase/MetaCaseMiniGlyph";

const reportUrl = "https://drive.google.com/file/d/1cCeqdHSJ3PsH0wUnFHviTSq-26WT5jVs/view?usp=sharing";
const presentationUrl = "https://drive.google.com/file/d/1zPjGSqcSFhyuJbJeKaiKt_DHPAHQSewz/view?usp=sharing";

const flowCopy: Record<MetaFlowKey, { label: string; short: string; title: string; text: string }> = {
  context: {
    label: "Company Context",
    short: "Context",
    title: "Meta as a management case",
    text: "The project starts by framing Meta as a business case involving leadership, culture, ethics, trust, and strategic decision-making."
  },
  leadership: {
    label: "Leadership",
    short: "Leadership",
    title: "Executive leadership and decision style",
    text: "Leadership analysis reviews how strategic priorities, founder influence, and decision-making shape Meta's direction."
  },
  culture: {
    label: "Culture",
    short: "Culture",
    title: "Organizational culture and execution",
    text: "Culture analysis considers how internal values, innovation pressure, speed, and accountability affect organizational behavior."
  },
  ethics: {
    label: "Ethics",
    short: "Ethics",
    title: "Ethical responsibility and platform impact",
    text: "Ethics analysis focuses on the responsibility of a major digital platform toward users, society, and information ecosystems."
  },
  privacy: {
    label: "Privacy and Trust",
    short: "Privacy",
    title: "User privacy and public trust",
    text: "Privacy and trust are treated as core management concerns, not just technical or legal issues."
  },
  regulation: {
    label: "Regulation",
    short: "Regulation",
    title: "External pressure and governance risk",
    text: "Regulation analysis reviews how government scrutiny, competition concerns, and platform accountability affect strategy."
  },
  stakeholders: {
    label: "Stakeholders",
    short: "Stakeholders",
    title: "Users, advertisers, employees, investors, and society",
    text: "The stakeholder layer connects Meta's strategic choices to groups affected by platform decisions."
  },
  problem: {
    label: "Core Problem",
    short: "Problem",
    title: "Management issue definition",
    text: "The case identifies the central management problem before moving into recommendations."
  },
  recommendations: {
    label: "Recommendations",
    short: "Recs",
    title: "Actionable management recommendations",
    text: "Recommendations translate the analysis into practical actions around leadership, governance, trust, and long-term positioning."
  },
  report: {
    label: "Report",
    short: "Report",
    title: "Written case analysis",
    text: "The report provides the full written argument, evidence, and management analysis."
  },
  presentation: {
    label: "Presentation",
    short: "Slides",
    title: "Executive presentation layer",
    text: "The presentation turns the case analysis into a concise story for class, professor, or recruiter review."
  }
};

const pipeline: MetaFlowKey[] = [
  "context",
  "leadership",
  "culture",
  "ethics",
  "privacy",
  "regulation",
  "stakeholders",
  "problem",
  "recommendations",
  "report",
  "presentation"
];

const networkLinks = [
  { from: "context", to: "leadership", d: "M 150 62 C 225 62, 270 62, 345 62" },
  { from: "leadership", to: "culture", d: "M 455 62 C 530 62, 575 62, 650 62" },
  { from: "culture", to: "ethics", d: "M 700 96 C 700 126, 640 136, 540 136" },
  { from: "ethics", to: "privacy", d: "M 455 136 C 380 136, 335 136, 260 136" },
  { from: "privacy", to: "regulation", d: "M 260 170 C 335 204, 380 210, 455 210" },
  { from: "regulation", to: "stakeholders", d: "M 540 210 C 615 210, 660 210, 735 210" },
  { from: "stakeholders", to: "problem", d: "M 735 244 C 650 276, 420 276, 260 276" },
  { from: "problem", to: "recommendations", d: "M 260 310 C 335 342, 380 350, 455 350" },
  { from: "recommendations", to: "report", d: "M 540 350 C 615 350, 660 350, 735 350" },
  { from: "report", to: "presentation", d: "M 735 382 C 650 410, 420 410, 260 410" }
] as const;

const nodeClassMap: Record<MetaFlowKey, string> = {
  context: "md:col-start-1 md:row-start-1",
  leadership: "md:col-start-2 md:row-start-1",
  culture: "md:col-start-3 md:row-start-1",
  ethics: "md:col-start-2 md:row-start-2",
  privacy: "md:col-start-1 md:row-start-2",
  regulation: "md:col-start-2 md:row-start-3",
  stakeholders: "md:col-start-3 md:row-start-3",
  problem: "md:col-start-1 md:row-start-4",
  recommendations: "md:col-start-2 md:row-start-5",
  report: "md:col-start-3 md:row-start-5",
  presentation: "md:col-start-1 md:row-start-6"
};

const proof = [
  "Management case analysis",
  "Leadership and culture review",
  "Ethics and trust reasoning",
  "Stakeholder analysis",
  "Strategic recommendations",
  "Report and presentation delivery"
];

export default function MetaCaseExperience() {
  const [activeKey, setActiveKey] = useState<MetaFlowKey>("context");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <MetaCaseScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              META
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                Meta Case Analysis
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Leadership | Culture | Ethics | Strategic management
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Meta Strategic Management Case Analysis
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A completed management case project analyzing Meta through leadership, culture,
            ethics, privacy, regulation, stakeholders, and strategic recommendations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={reportUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              View Report
            </a>
            <a
              href={presentationUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              View Presentation
            </a>
            <a
              href="#meta-flow"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              Explore Case Flow
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="meta-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Case Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From company context to strategic recommendations.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected management map. This page shows how the case moves from analysis to recommendation.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <MetaCaseMiniGlyph type={activeKey} active />

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.26em] text-blue-600">
                      {active.label}
                    </p>
                    <h3 className="mt-1 text-2xl font-black text-slate-950">{active.title}</h3>
                  </div>
                </div>

                <p className="mt-5 min-h-[80px] text-lg leading-8 text-slate-600">
                  {active.text}
                </p>
              </motion.div>
            </div>

            <div>
              <div className="relative rounded-[2.5rem] border border-slate-200 bg-slate-50/95 p-4 md:p-5">
                <svg
                  className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
                  viewBox="0 0 900 455"
                  preserveAspectRatio="none"
                >
                  {networkLinks.map((link, index) => {
                    const related = activeKey === link.from || activeKey === link.to;

                    return (
                      <g key={`${link.from}-${link.to}`}>
                        <motion.path
                          d={link.d}
                          fill="none"
                          stroke={related ? "#0f172a" : "#94a3b8"}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: related ? 0.9 : 0.4 }}
                          transition={{ duration: 0.45, delay: index * 0.03 }}
                        />
                        <motion.path
                          d={link.d}
                          fill="none"
                          stroke={related ? "#2563eb" : "#7c3aed"}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeDasharray="10 14"
                          animate={{ strokeDashoffset: [0, -48] }}
                          transition={{ repeat: Infinity, duration: related ? 1.2 : 2.2, ease: "linear" }}
                          opacity={related ? 0.95 : 0.38}
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="relative grid gap-3 md:grid-cols-3 md:grid-rows-6">
                  {pipeline.map((key, index) => {
                    const item = flowCopy[key];
                    const selected = activeKey === key;

                    return (
                      <motion.button
                        key={key}
                        onPointerEnter={() => setActiveKey(key)}
                        onClick={() => setActiveKey(key)}
                        whileHover={{ y: -3, scale: 1.015 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18 }}
                        className={[
                          "relative flex min-h-[82px] items-center gap-3 overflow-hidden rounded-[1.6rem] border px-3 py-3 text-left shadow-lg transition",
                          nodeClassMap[key],
                          selected
                            ? "border-blue-300 bg-blue-50 shadow-blue-100"
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-violet-300"
                        ].join(" ")}
                      >
                        <MetaCaseMiniGlyph type={key} active={selected} />

                        <div className="min-w-0">
                          <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 block truncate text-base font-black leading-tight text-slate-950">
                            {item.short}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/50">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
                  What this proves
                </p>
                <h2 className="mt-4 text-4xl font-black">
                  Management theory turned into a structured strategic case.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {proof.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-sm font-black text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={reportUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-yellow-300 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                Report
              </a>
              <a
                href={presentationUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:bg-blue-500/20"
              >
                Presentation
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}