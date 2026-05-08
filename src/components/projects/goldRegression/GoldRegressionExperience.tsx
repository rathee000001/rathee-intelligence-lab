"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import GoldRegressionScene, { type RegressionFlowKey } from "@/components/cinema/goldRegression/GoldRegressionScene";
import RegressionMiniGlyph from "@/components/projects/goldRegression/RegressionMiniGlyph";

const liveUrl = "https://gold-ai-platform.vercel.app/";
const githubUrl = "https://github.com/rathee000001/gold-ai-platform";

const flowCopy: Record<RegressionFlowKey, { label: string; title: string; text: string }> = {
  goldCsv: {
    label: "Gold CSV",
    title: "Target price stream",
    text: "Local gold price history is parsed, cleaned, deduplicated, and aligned into monthly observations for the model."
  },
  fred: {
    label: "FRED Series",
    title: "Macroeconomic inputs",
    text: "Federal Reserve series are fetched and normalized into the same month-end time key as the gold target."
  },
  alignment: {
    label: "Month-End Alignment",
    title: "One temporal key",
    text: "Gold prices and macro factors are synchronized into a clean monthly modeling window."
  },
  matrix: {
    label: "Factor Matrix",
    title: "Regression-ready design table",
    text: "Gold and macroeconomic signals are organized into a factor matrix for model interpretation."
  },
  regression: {
    label: "Regression Engine",
    title: "Model relationship layer",
    text: "The system uses regression-style modeling logic to examine how macro factors relate to gold price behavior."
  },
  coefficients: {
    label: "Coefficient Review",
    title: "Signal strength inspection",
    text: "Coefficient-style outputs help explain which variables are driving the model interpretation."
  },
  dashboard: {
    label: "Forecast Dashboard",
    title: "Interactive output layer",
    text: "Dashboard views translate the model into charts, summaries, and decision-ready visuals."
  },
  statistics: {
    label: "Statistics",
    title: "Model calculation support",
    text: "Statistical utilities support model calculations and interpretation workflows."
  },
  charts: {
    label: "Recharts",
    title: "Visual analytics layer",
    text: "Charts turn the model pipeline into a readable interface for reviewers and recruiters."
  }
};

const pipeline: RegressionFlowKey[] = [
  "goldCsv",
  "fred",
  "alignment",
  "matrix",
  "regression",
  "coefficients",
  "dashboard"
];

const networkLinks = [
  { from: "goldCsv", to: "alignment", d: "M 150 70 C 230 70, 282 70, 365 70" },
  { from: "fred", to: "alignment", d: "M 150 170 C 235 170, 285 150, 365 92" },
  { from: "alignment", to: "matrix", d: "M 455 70 C 540 70, 585 70, 670 70" },
  { from: "matrix", to: "regression", d: "M 720 100 C 720 142, 650 170, 560 170" },
  { from: "regression", to: "coefficients", d: "M 470 170 C 385 170, 335 170, 250 170" },
  { from: "regression", to: "dashboard", d: "M 560 170 C 655 170, 710 205, 790 250" },
  { from: "coefficients", to: "dashboard", d: "M 250 205 C 380 252, 590 252, 790 250" }
] as const;

const nodeClassMap: Record<RegressionFlowKey, string> = {
  goldCsv: "md:col-start-1 md:row-start-1",
  fred: "md:col-start-1 md:row-start-2",
  alignment: "md:col-start-2 md:row-start-1",
  matrix: "md:col-start-3 md:row-start-1",
  regression: "md:col-start-2 md:row-start-2",
  coefficients: "md:col-start-1 md:row-start-3",
  dashboard: "md:col-start-3 md:row-start-3",
  statistics: "",
  charts: ""
};

const proof = [
  "Gold price data cleaning",
  "FRED macro integration",
  "Month-end time alignment",
  "Regression modeling logic",
  "Interactive dashboard views",
  "Deployed Next.js analytics product"
];

export default function GoldRegressionExperience() {
  const [activeKey, setActiveKey] = useState<RegressionFlowKey>("matrix");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <GoldRegressionScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-950">
              REG
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                Gold AI Platform
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Gold data | FRED macro factors | Regression intelligence
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Gold Regression Intelligence System
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A live forecasting platform for gold price research, macro factor analysis,
            and regression-based model interpretation.
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
              href="#regression-flow"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              Explore Regression Flow
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="regression-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/80 p-7 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Regression Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From gold price history to forecast dashboard.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected model map. This page shows the regression foundation before the later AI and Deep ML expansion.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <RegressionMiniGlyph type={activeKey} active />

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
                          stroke={related ? "#eab308" : "#2563eb"}
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
                        <RegressionMiniGlyph type={key} active={selected} />

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
                {(["statistics", "charts"] as RegressionFlowKey[]).map((key) => {
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
                        <RegressionMiniGlyph type={key} active={selected} />

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
                  Built as a deployed regression analytics product.
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
                Live Platform
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
                href="/projects/gold-nexus-alpha"
                className="rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:bg-blue-500/20"
              >
                See Advanced Gold Version
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}