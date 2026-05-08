"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SEC10KScene, { type SECFlowKey } from "@/components/cinema/sec10k/SEC10KScene";
import SEC10KMiniGlyph from "@/components/projects/sec10k/SEC10KMiniGlyph";

const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1xlThwFBoZpw-vK-Te82R45OMzasUvNBi/edit?gid=646180490#gid=646180490";
const reportUrl = "https://drive.google.com/file/d/1SWTAototNhIJbzhTwfAvcpRvCXIDah24/view";
const presentationUrl = "https://docs.google.com/presentation/d/1wkM7B_f2hXdU6CUQeAUmBO73BB8o7xpw/edit?usp=sharing&ouid=104632640632114433496&rtpof=true&sd=true";

const flowCopy: Record<SECFlowKey, { label: string; short: string; title: string; text: string }> = {
  filing: {
    label: "SEC Filing",
    short: "10-K",
    title: "Financial statement source evidence",
    text: "The analysis starts from SEC-style annual filing information and turns it into structured financial review."
  },
  statements: {
    label: "Statements",
    short: "Statements",
    title: "Income statement, balance sheet, and cash flow review",
    text: "Financial statements are organized into a reviewable structure before ratio and trend analysis."
  },
  excel: {
    label: "Spreadsheet Model",
    short: "Excel",
    title: "Linked spreadsheet analysis workbook",
    text: "The spreadsheet stores calculations, supporting tabs, and financial analysis logic for the project."
  },
  ratios: {
    label: "Ratio Model",
    short: "Ratios",
    title: "Core financial ratio layer",
    text: "Ratios convert raw financial statement numbers into comparable business performance indicators."
  },
  liquidity: {
    label: "Liquidity",
    short: "Liquidity",
    title: "Short-term financial strength",
    text: "Liquidity analysis focuses on near-term ability to cover obligations and maintain operating flexibility."
  },
  profitability: {
    label: "Profitability",
    short: "Profit",
    title: "Earnings and margin performance",
    text: "Profitability analysis reviews how efficiently the company converts revenue into earnings."
  },
  leverage: {
    label: "Leverage",
    short: "Leverage",
    title: "Debt and capital structure review",
    text: "Leverage analysis examines debt load, financing structure, and long-term financial risk."
  },
  trend: {
    label: "Trend Analysis",
    short: "Trend",
    title: "Year-over-year movement",
    text: "Trend analysis connects ratios and financial statement items across time to show direction and change."
  },
  report: {
    label: "Report",
    short: "Report",
    title: "Written analysis and interpretation",
    text: "The report translates spreadsheet findings into a clear financial analysis narrative."
  },
  presentation: {
    label: "Presentation",
    short: "Slides",
    title: "Executive communication layer",
    text: "The presentation turns the financial analysis into a reviewable story for class or recruiter review."
  },
  decision: {
    label: "Insight",
    short: "Insight",
    title: "Business decision interpretation",
    text: "The final layer connects ratio evidence, trends, and financial context into business interpretation."
  }
};

const pipeline: SECFlowKey[] = [
  "filing",
  "statements",
  "excel",
  "ratios",
  "liquidity",
  "profitability",
  "leverage",
  "trend",
  "report",
  "presentation"
];

const networkLinks = [
  { from: "filing", to: "statements", d: "M 150 62 C 225 62, 270 62, 345 62" },
  { from: "statements", to: "excel", d: "M 455 62 C 530 62, 575 62, 650 62" },
  { from: "excel", to: "ratios", d: "M 700 96 C 700 126, 640 136, 540 136" },
  { from: "ratios", to: "liquidity", d: "M 455 136 C 380 136, 335 136, 260 136" },
  { from: "liquidity", to: "profitability", d: "M 260 170 C 335 204, 380 210, 455 210" },
  { from: "profitability", to: "leverage", d: "M 540 210 C 615 210, 660 210, 735 210" },
  { from: "leverage", to: "trend", d: "M 735 244 C 650 276, 420 276, 260 276" },
  { from: "trend", to: "report", d: "M 260 310 C 335 342, 380 350, 455 350" },
  { from: "report", to: "presentation", d: "M 540 350 C 615 350, 660 350, 735 350" }
] as const;

const nodeClassMap: Record<SECFlowKey, string> = {
  filing: "md:col-start-1 md:row-start-1",
  statements: "md:col-start-2 md:row-start-1",
  excel: "md:col-start-3 md:row-start-1",
  ratios: "md:col-start-2 md:row-start-2",
  liquidity: "md:col-start-1 md:row-start-2",
  profitability: "md:col-start-2 md:row-start-3",
  leverage: "md:col-start-3 md:row-start-3",
  trend: "md:col-start-1 md:row-start-4",
  report: "md:col-start-2 md:row-start-5",
  presentation: "md:col-start-3 md:row-start-5",
  decision: ""
};

const proof = [
  "SEC 10-K analysis",
  "Financial statement review",
  "Excel ratio modeling",
  "Liquidity and leverage analysis",
  "Trend interpretation",
  "Report and presentation delivery"
];

export default function SEC10KExperience() {
  const [activeKey, setActiveKey] = useState<SECFlowKey>("filing");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <SEC10KScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              10-K
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                SEC Financial Analysis
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            SEC filing | Excel ratio model | Report and presentation
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            SEC 10-K Financial Analysis System
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A financial analysis project that connects SEC filing review, spreadsheet modeling,
            liquidity, profitability, leverage, trend interpretation, report writing, and presentation delivery.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Open Spreadsheet
            </a>
            <a
              href={reportUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
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
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="sec-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Analysis Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From 10-K filing to business insight.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected financial analysis map. This page shows how accounting data becomes decision-ready interpretation.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <SEC10KMiniGlyph type={activeKey} active />

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
                  viewBox="0 0 900 405"
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
                          stroke={related ? "#2563eb" : "#16a34a"}
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

                <div className="relative grid gap-3 md:grid-cols-3 md:grid-rows-5">
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
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-emerald-300"
                        ].join(" ")}
                      >
                        <SEC10KMiniGlyph type={key} active={selected} />

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

              <div className="mt-5">
                <motion.button
                  onPointerEnter={() => setActiveKey("decision")}
                  onClick={() => setActiveKey("decision")}
                  whileHover={{ scale: 1.01 }}
                  className={[
                    "w-full rounded-[2rem] border p-5 text-left shadow-lg transition",
                    activeKey === "decision"
                      ? "border-yellow-300 bg-yellow-50 shadow-yellow-100"
                      : "border-slate-200 bg-white shadow-slate-200/70 hover:bg-slate-50"
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <SEC10KMiniGlyph type="decision" active={activeKey === "decision"} />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
                        Business Insight
                      </p>
                      <p className="mt-1 text-lg font-black text-slate-950">
                        Ratio evidence translated into decision interpretation
                      </p>
                    </div>
                  </div>
                </motion.button>
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
                  Financial statements turned into an analytical business review.
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
                href={spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-yellow-300 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                Spreadsheet
              </a>
              <a
                href={reportUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/15"
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