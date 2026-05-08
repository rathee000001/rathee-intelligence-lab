"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import GoldPrototypeScene, { type PrototypeFlowKey } from "@/components/cinema/goldPrototype/GoldPrototypeScene";
import PrototypeMiniGlyph from "@/components/projects/goldPrototype/PrototypeMiniGlyph";

const liveUrl = "https://rathee000001.github.io/Gold-Forecasting-Model/";
const githubUrl = "https://github.com/rathee000001/Gold-Forecasting-Model";

const flowCopy: Record<PrototypeFlowKey, { label: string; title: string; text: string }> = {
  overview: {
    label: "Overview",
    title: "Original gold forecasting project",
    text: "The first deployed version of the gold forecasting work, built as a Spring 2025 supply chain management project."
  },
  framework: {
    label: "Model Framework",
    title: "Forecasting logic and methodology",
    text: "Explains the model framework and how the forecasting project was structured before implementation."
  },
  excel: {
    label: "Excel Model",
    title: "Spreadsheet implementation",
    text: "The early model implementation was built around spreadsheet-style forecasting logic and structured inputs."
  },
  dashboard: {
    label: "Dashboard",
    title: "Visual project interface",
    text: "The project turns the model into a navigable website with dashboard-style sections and documentation."
  },
  past: {
    label: "In-Sample Backtest",
    title: "Historical model review",
    text: "Backtesting inside the historical sample helps show how the model behaves against known periods."
  },
  future: {
    label: "Out-Sample Backtest",
    title: "Future-period review",
    text: "Out-of-sample review checks how the model performs beyond the original fitting window."
  },
  summary: {
    label: "Model Summary",
    title: "Final interpretation layer",
    text: "The summary page condenses the forecasting logic, results, and interpretation into a final review."
  },
  aiLog: {
    label: "AI Log",
    title: "AI-assisted workflow record",
    text: "The AI log documents where AI assistance supported the development and explanation workflow."
  },
  spring2025: {
    label: "Spring 2025",
    title: "Academic supply chain project",
    text: "Built for Supply Chain Management at NYIT as the first version before later regression, AI, and Deep ML expansions."
  }
};

const pipeline: PrototypeFlowKey[] = [
  "overview",
  "framework",
  "excel",
  "dashboard",
  "past",
  "future",
  "summary",
  "aiLog"
];

const networkLinks = [
  { from: "overview", to: "framework", d: "M 150 65 C 232 65, 282 65, 365 65" },
  { from: "framework", to: "excel", d: "M 455 65 C 540 65, 585 65, 670 65" },
  { from: "excel", to: "dashboard", d: "M 720 98 C 720 135, 650 152, 560 152" },
  { from: "dashboard", to: "past", d: "M 470 152 C 382 152, 335 152, 250 152" },
  { from: "dashboard", to: "future", d: "M 560 152 C 650 152, 700 152, 790 152" },
  { from: "past", to: "summary", d: "M 250 188 C 310 232, 395 236, 520 236" },
  { from: "future", to: "summary", d: "M 790 188 C 720 232, 650 236, 610 236" },
  { from: "summary", to: "aiLog", d: "M 610 236 C 685 236, 730 236, 790 236" }
] as const;

const nodeClassMap: Record<PrototypeFlowKey, string> = {
  overview: "md:col-start-1 md:row-start-1",
  framework: "md:col-start-2 md:row-start-1",
  excel: "md:col-start-3 md:row-start-1",
  dashboard: "md:col-start-2 md:row-start-2",
  past: "md:col-start-1 md:row-start-2",
  future: "md:col-start-3 md:row-start-2",
  summary: "md:col-start-2 md:row-start-3",
  aiLog: "md:col-start-3 md:row-start-3",
  spring2025: ""
};

const proof = [
  "Excel-style forecasting foundation",
  "Model framework documentation",
  "In-sample backtesting",
  "Out-of-sample backtesting",
  "Deployed GitHub Pages website",
  "Clear project progression into later Gold systems"
];

export default function GoldPrototypeExperience() {
  const [activeKey, setActiveKey] = useState<PrototypeFlowKey>("overview");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <GoldPrototypeScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-950">
              V1
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                Gold Forecasting Model
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Excel model | Backtesting | Supply chain management
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Gold Forecasting Model Prototype
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            The first deployed version of my gold forecasting work: a Spring 2025 supply chain project
            connecting model framework, spreadsheet implementation, backtesting, and documentation.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Launch Live Website
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              View GitHub
            </a>
            <a
              href="#prototype-flow"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              Explore Prototype Flow
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="prototype-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/80 p-7 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Prototype Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From model framework to backtested website.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected map. This page shows the first version before the later regression and AI platform rebuilds.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <PrototypeMiniGlyph type={activeKey} active />

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
              <div className="relative rounded-[2.5rem] border border-slate-200 bg-slate-50/90 p-4 md:p-6">
                <svg
                  className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
                  viewBox="0 0 940 330"
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
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: related ? 0.9 : 0.45 }}
                          transition={{ duration: 0.45, delay: index * 0.03 }}
                        />
                        <motion.path
                          d={link.d}
                          fill="none"
                          stroke={related ? "#eab308" : "#16a34a"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="10 14"
                          animate={{ strokeDashoffset: [0, -48] }}
                          transition={{ repeat: Infinity, duration: related ? 1.2 : 2.2, ease: "linear" }}
                          opacity={related ? 0.95 : 0.42}
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="relative grid gap-4 md:grid-cols-3 md:grid-rows-3">
                  {pipeline.map((key, index) => {
                    const item = flowCopy[key];
                    const selected = activeKey === key;

                    return (
                      <motion.button
                        key={key}
                        onPointerEnter={() => setActiveKey(key)}
                        onClick={() => setActiveKey(key)}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18 }}
                        className={[
                          "relative flex min-h-[92px] items-center gap-4 rounded-[2rem] border px-4 py-4 text-left shadow-lg transition",
                          nodeClassMap[key],
                          selected
                            ? "border-yellow-300 bg-yellow-100 shadow-yellow-100"
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-blue-300"
                        ].join(" ")}
                      >
                        <PrototypeMiniGlyph type={key} active={selected} />

                        <div className="min-w-0">
                          <span className="block text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 block text-xl font-black leading-tight text-slate-950">
                            {item.label}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <motion.button
                  onPointerEnter={() => setActiveKey("spring2025")}
                  onClick={() => setActiveKey("spring2025")}
                  whileHover={{ scale: 1.015 }}
                  className={[
                    "w-full rounded-[2rem] border p-5 text-left shadow-lg transition",
                    activeKey === "spring2025"
                      ? "border-yellow-300 bg-yellow-50 shadow-yellow-100"
                      : "border-slate-200 bg-white shadow-slate-200/70 hover:bg-slate-50"
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <PrototypeMiniGlyph type="spring2025" active={activeKey === "spring2025"} />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
                        Academic Context
                      </p>
                      <p className="mt-1 text-lg font-black text-slate-950">
                        Spring 2025 Supply Chain Management
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
                  The first complete forecasting build.
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
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-yellow-300 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                Live Website
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/15"
              >
                GitHub Repo
              </a>
              <Link
                href="/projects/gold-ai-platform"
                className="rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:bg-blue-500/20"
              >
                See Regression Version
              </Link>
              <Link
                href="/projects/gold-nexus-alpha"
                className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-500/20"
              >
                See Advanced Version
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}