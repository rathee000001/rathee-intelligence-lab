"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import GoldForecastingScene, { type GoldFlowKey } from "@/components/cinema/gold/GoldForecastingScene";
import GoldMiniGlyph from "@/components/projects/gold/GoldMiniGlyph";

const liveUrl = "https://nyit-gold-intelligence-2026-4qlw.vercel.app/";
const githubUrl = "https://github.com/rathee000001/nyit-gold-intelligence-2026";

const flowCopy: Record<GoldFlowKey, { label: string; title: string; text: string; icon: string }> = {
  data: {
    label: "Data Matrix",
    title: "Clean market and macro data",
    text: "Excel-style matrix of gold price, market, and macroeconomic factors prepared for forecasting.",
    icon: "▦"
  },
  alpha: {
    label: "Alpha Structural",
    title: "Structural signal view",
    text: "Reviews longer-run market relationships and structural signals behind the forecasting system.",
    icon: "α"
  },
  beta: {
    label: "Beta Temporal",
    title: "Temporal behavior view",
    text: "Focuses on time movement, trend behavior, and temporal forecasting patterns.",
    icon: "β"
  },
  delta: {
    label: "Delta TFT",
    title: "Deep temporal model",
    text: "Temporal Fusion Transformer-style model view for deeper sequence-based interpretation.",
    icon: "Δ"
  },
  epsilon: {
    label: "Epsilon Ensemble",
    title: "Combined model signal",
    text: "Combines multiple model outputs into one cleaner interpretation layer.",
    icon: "ε"
  },
  gamma: {
    label: "Gamma News",
    title: "News sensitivity review",
    text: "Reviews external information signals without claiming direct news causality.",
    icon: "γ"
  },
  omega: {
    label: "Omega Fusion",
    title: "Fusion layer",
    text: "Brings model views together into a final expert-review layer.",
    icon: "Ω"
  },
  final: {
    label: "Final Eval",
    title: "Forecast review output",
    text: "Forecasts are presented for interpretation and review, not as guaranteed future price claims.",
    icon: "✓"
  },
  ai: {
    label: "Gold AI",
    title: "AI-assisted interpretation",
    text: "Explains model outputs using approved project context and artifact-grounded responses.",
    icon: "AI"
  },
  sql: {
    label: "SQL Explorer",
    title: "Read-only data exploration",
    text: "SQL-style explorers inspect data and artifact metadata without changing project files.",
    icon: "SQL"
  },
  rag: {
    label: "Artifacts",
    title: "Artifact retrieval",
    text: "Approved project artifacts are retrieved so answers stay tied to verified evidence.",
    icon: "RAG"
  }
};

const pipeline: GoldFlowKey[] = [
  "data",
  "alpha",
  "beta",
  "delta",
  "epsilon",
  "gamma",
  "omega",
  "final",
  "ai"
];

const networkLinks = [
  { from: "data", to: "alpha", d: "M 150 64 C 235 64, 280 64, 365 64" },
  { from: "alpha", to: "beta", d: "M 455 64 C 540 64, 585 64, 670 64" },
  { from: "alpha", to: "delta", d: "M 410 96 C 410 132, 360 148, 250 148" },
  { from: "beta", to: "epsilon", d: "M 715 96 C 715 132, 650 148, 560 148" },
  { from: "delta", to: "epsilon", d: "M 250 148 C 340 148, 385 148, 470 148" },
  { from: "epsilon", to: "gamma", d: "M 560 148 C 650 148, 700 148, 790 148" },
  { from: "epsilon", to: "omega", d: "M 520 180 C 520 226, 430 232, 250 232" },
  { from: "gamma", to: "final", d: "M 790 180 C 790 232, 690 232, 560 232" },
  { from: "omega", to: "final", d: "M 340 232 C 415 232, 455 232, 520 232" },
  { from: "final", to: "ai", d: "M 610 232 C 685 232, 730 232, 790 232" }
] as const;

const nodeClassMap: Record<GoldFlowKey, string> = {
  data: "md:col-start-1 md:row-start-1",
  alpha: "md:col-start-2 md:row-start-1",
  beta: "md:col-start-3 md:row-start-1",
  delta: "md:col-start-1 md:row-start-2",
  epsilon: "md:col-start-2 md:row-start-2",
  gamma: "md:col-start-3 md:row-start-2",
  omega: "md:col-start-1 md:row-start-3",
  final: "md:col-start-2 md:row-start-3",
  ai: "md:col-start-3 md:row-start-3",
  sql: "",
  rag: ""
};

const proof = [
  "Forecasting system design",
  "Deep ML model interpretation",
  "SQL-style data exploration",
  "Artifact-grounded AI",
  "Next.js deployment",
  "GitHub-backed implementation"
];

export default function GoldNexusExperience() {
  const [activeKey, setActiveKey] = useState<GoldFlowKey>("data");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <GoldForecastingScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              AU
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                Gold Nexus Alpha
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Gold forecasting | Deep ML | AI interpretation
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Gold Price Forecasting Intelligence
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A live AI-assisted forecasting system for gold market research, model interpretation,
            SQL exploration, and artifact-grounded analysis.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Launch Live Platform
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
              href="#model-flow"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              Explore Model Flow
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="model-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/80 p-7 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Model Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From data matrix to AI interpretation.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected model map. Each node behaves like a forecasting stage in the system.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <GoldMiniGlyph type={activeKey} active />

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
                  viewBox="0 0 940 310"
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
                          stroke={related ? "#eab308" : "#60a5fa"}
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
                        <GoldMiniGlyph type={key} active={selected} />

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

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(["sql", "rag"] as GoldFlowKey[]).map((key) => {
                  const item = flowCopy[key];
                  const selected = activeKey === key;

                  return (
                    <motion.button
                      key={key}
                      onPointerEnter={() => setActiveKey(key)}
                      onClick={() => setActiveKey(key)}
                      whileHover={{ scale: 1.025 }}
                      className={[
                        "rounded-[2rem] border p-5 text-left shadow-lg transition",
                        selected
                          ? "border-blue-300 bg-blue-50 shadow-blue-100"
                          : "border-slate-200 bg-white shadow-slate-200/70 hover:bg-slate-50"
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <GoldMiniGlyph type={key} active={selected} />

                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
                            {item.label}
                          </p>
                          <p className="mt-1 text-lg font-black text-slate-950">{item.title}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
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
                  Built as a live forecasting product.
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
          </div>
        </div>
      </section>
    </main>
  );
}