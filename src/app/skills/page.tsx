"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SkillsScene, { type SkillClusterKey } from "@/components/cinema/skills/SkillsScene";
import SkillsWatchGrid, { type SkillBubble } from "@/components/skills/SkillsWatchGrid";

const skills: SkillBubble[] = [
  {
    key: "supply-chain",
    cluster: "supply",
    name: "Supply Chain Analytics",
    short: "SC",
    color: "#16a34a",
    size: 82,
    x: -38,
    y: -190,
    proof: "Used in DataCo Tableau, Gold Nexus Alpha positioning, and operations-focused dashboard interpretation.",
    projects: ["DataCo Tableau", "Gold Nexus Alpha", "MBA Supply Chain"]
  },
  {
    key: "forecasting",
    cluster: "forecasting",
    name: "Forecasting",
    short: "FC",
    color: "#facc15",
    size: 90,
    x: -132,
    y: -128,
    proof: "Built across Gold V1, Gold AI Platform, and Gold Nexus Alpha with progressive depth from Excel to AI-assisted interpretation.",
    projects: ["Gold V1", "Gold AI Platform", "Gold Nexus Alpha"]
  },
  {
    key: "time-series",
    cluster: "forecasting",
    name: "Time Series Forecasting",
    short: "TS",
    color: "#f59e0b",
    size: 78,
    x: 74,
    y: -140,
    proof: "Applied in gold price movement analysis, trend evaluation, temporal model interpretation, and forecast review.",
    projects: ["Gold Nexus Alpha", "Gold AI Platform", "Gold Forecasting Model"]
  },
  {
    key: "python",
    cluster: "analytics",
    name: "Python",
    short: "PY",
    color: "#2563eb",
    size: 74,
    x: -210,
    y: -18,
    proof: "Used for backend regression logic, data preparation, forecasting support, and project automation workflows.",
    projects: ["Gold AI Platform", "Gold Nexus Alpha", "Regression Models"]
  },
  {
    key: "sql",
    cluster: "analytics",
    name: "SQL",
    short: "SQL",
    color: "#38bdf8",
    size: 76,
    x: -110,
    y: -26,
    proof: "Positioned as SQL-style exploration and read-only project inspection layer for structured project artifacts.",
    projects: ["Gold Nexus Alpha", "Portfolio System"]
  },
  {
    key: "tableau",
    cluster: "supply",
    name: "Tableau",
    short: "TB",
    color: "#0ea5e9",
    size: 82,
    x: 18,
    y: -38,
    proof: "Used to publish a Tableau Public story for DataCo sales, profit, delivery risk, shipping, and customer segmentation.",
    projects: ["DataCo Tableau"]
  },
  {
    key: "excel",
    cluster: "finance",
    name: "Excel",
    short: "XL",
    color: "#22c55e",
    size: 74,
    x: 142,
    y: -40,
    proof: "Used in financial statement analysis, SEC 10-K ratio modeling, and the first gold forecasting prototype.",
    projects: ["SEC 10-K Analysis", "Gold V1", "MBA Coursework"]
  },
  {
    key: "machine-learning",
    cluster: "ai",
    name: "Machine Learning",
    short: "ML",
    color: "#8b5cf6",
    size: 86,
    x: 226,
    y: 36,
    proof: "Used in regression intelligence, model comparison, Deep ML interpretation, and forecasting platform design.",
    projects: ["Gold AI Platform", "Gold Nexus Alpha"]
  },
  {
    key: "rag",
    cluster: "ai",
    name: "RAG and Artifact AI",
    short: "RAG",
    color: "#a855f7",
    size: 74,
    x: 126,
    y: 96,
    proof: "Positioned in Gold Nexus Alpha as artifact-grounded AI that retrieves approved project evidence before answering.",
    projects: ["Gold Nexus Alpha", "Portfolio AI Plan"]
  },
  {
    key: "nextjs",
    cluster: "frontend",
    name: "Next.js and React",
    short: "NX",
    color: "#38bdf8",
    size: 88,
    x: 12,
    y: 132,
    proof: "Used to build deployed project platforms and this cinematic recruiter-facing portfolio system.",
    projects: ["Gold Nexus Alpha", "Gold AI Platform", "Portfolio"]
  },
  {
    key: "financial-analysis",
    cluster: "finance",
    name: "Financial Analysis",
    short: "FA",
    color: "#10b981",
    size: 76,
    x: -112,
    y: 118,
    proof: "Used in SEC 10-K review, spreadsheet ratio modeling, liquidity, profitability, leverage, trend, report, and slides.",
    projects: ["SEC 10-K Analysis"]
  },
  {
    key: "marketing",
    cluster: "marketing",
    name: "Marketing Strategy",
    short: "MK",
    color: "#ec4899",
    size: 74,
    x: -220,
    y: 92,
    proof: "Used in Chapters 4 Change and The Book Fairies campaign work: segmentation, target market, positioning, USP, CTA, and fundraiser UX.",
    projects: ["Chapters 4 Change", "The Book Fairies"]
  },
  {
    key: "business-intelligence",
    cluster: "analytics",
    name: "Business Intelligence",
    short: "BI",
    color: "#2563eb",
    size: 70,
    x: 210,
    y: -106,
    proof: "Used to turn dashboards, data models, reports, and project artifacts into decision-ready business communication.",
    projects: ["DataCo Tableau", "Gold Nexus Alpha", "SEC 10-K"]
  },
  {
    key: "management",
    cluster: "management",
    name: "Strategic Management",
    short: "SM",
    color: "#f59e0b",
    size: 72,
    x: -8,
    y: 222,
    proof: "Used in Meta case analysis through leadership, culture, ethics, privacy, regulation, stakeholders, and recommendations.",
    projects: ["Meta Case Analysis"]
  }
];

const clusterCards: {
  key: SkillClusterKey;
  label: string;
  title: string;
  text: string;
  href: string;
}[] = [
  {
    key: "supply",
    label: "Supply",
    title: "Supply Chain and Operations",
    text: "Delivery risk, shipping performance, customer segmentation, and operations dashboards.",
    href: "/projects/dataco-tableau"
  },
  {
    key: "forecasting",
    label: "Forecasting",
    title: "Forecasting Systems",
    text: "Gold forecasting rebuilt from Excel prototype to regression platform to advanced AI system.",
    href: "/projects/gold-nexus-alpha"
  },
  {
    key: "analytics",
    label: "Analytics",
    title: "Data and Business Intelligence",
    text: "Python, SQL-style exploration, Tableau, dashboarding, and structured artifact interpretation.",
    href: "/projects/gold-ai-platform"
  },
  {
    key: "ai",
    label: "AI",
    title: "Machine Learning and Artifact AI",
    text: "Regression intelligence, Deep ML interpretation, RAG-style retrieval, and AI-assisted analytics.",
    href: "/projects/gold-nexus-alpha"
  },
  {
    key: "frontend",
    label: "Frontend",
    title: "Deployed Web Systems",
    text: "Next.js, React, Vercel, GitHub Pages, cinematic project pages, and portfolio UX.",
    href: "/"
  },
  {
    key: "finance",
    label: "Finance",
    title: "Financial Analysis",
    text: "SEC 10-K review, Excel ratio models, liquidity, profitability, leverage, trend, report, and slides.",
    href: "/projects/sec-10k-financial-analysis"
  },
  {
    key: "marketing",
    label: "Marketing",
    title: "Campaign Strategy",
    text: "Nonprofit story systems, segmentation, positioning, fundraiser UX, donation flow, and CTA design.",
    href: "/projects/chapters-4-change"
  },
  {
    key: "management",
    label: "Management",
    title: "Strategic Case Analysis",
    text: "Leadership, culture, ethics, privacy, regulation, stakeholders, and recommendations.",
    href: "/projects/meta-case-analysis"
  }
];

export default function SkillsPage() {
  const [activeSkill, setActiveSkill] = useState<SkillBubble>(skills[0]);
  const [activeCluster, setActiveCluster] = useState<SkillClusterKey>("supply");

  const selectedCluster = clusterCards.find((cluster) => cluster.key === activeCluster) || clusterCards[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <SkillsScene activeKey={activeCluster} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-6 pb-12 pt-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/85 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-yellow-200">
              SK
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Skill System
              </p>
              <p className="text-sm font-black text-slate-950">
                Interactive proof map
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Skills | Projects | Evidence | Recruiter proof
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Skills mapped to proof, not just keywords.
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            Hover the bubble interface to see which projects prove each skill. The layout works like a compact skill launcher:
            forecasting, supply chain, AI, Tableau, Excel, SQL, finance, marketing, and management.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#skill-map"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Open Skill Map
            </a>
            <Link
              href="/timeline"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              View Timeline
            </Link>
            <Link
              href="/projects/gold-nexus-alpha"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              Flagship Project
            </Link>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="skill-map" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/86 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <SkillsWatchGrid
              skills={skills}
              activeSkill={activeSkill}
              setActiveSkill={setActiveSkill}
              setActiveCluster={setActiveCluster}
            />

            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Active Skill Cluster
              </p>

              <motion.div
                key={selectedCluster.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-5 rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60"
              >
                <p className="text-xs font-black uppercase tracking-[0.26em] text-slate-400">
                  {selectedCluster.label}
                </p>
                <h2 className="mt-2 text-4xl font-black leading-tight text-slate-950">
                  {selectedCluster.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {selectedCluster.text}
                </p>

                <Link
                  href={selectedCluster.href}
                  className="mt-7 inline-flex rounded-full bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
                >
                  Open Related Project
                </Link>
              </motion.div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {clusterCards.map((cluster) => {
                  const selected = activeCluster === cluster.key;

                  return (
                    <motion.button
                      key={cluster.key}
                      onPointerEnter={() => setActiveCluster(cluster.key)}
                      onClick={() => setActiveCluster(cluster.key)}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className={[
                        "rounded-[1.7rem] border p-4 text-left shadow-lg transition",
                        selected
                          ? "border-blue-300 bg-blue-50 shadow-blue-100"
                          : "border-slate-200 bg-white shadow-slate-200/70 hover:border-yellow-300"
                      ].join(" ")}
                    >
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                        {cluster.label}
                      </p>
                      <p className="mt-2 text-lg font-black text-slate-950">
                        {cluster.title}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/50">
            <div className="grid gap-8 lg:grid-cols-[0.66fr_1.34fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
                  Recruiter Read
                </p>
                <h2 className="mt-4 text-4xl font-black">
                  Every skill points to a project artifact.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Supply chain analytics linked to Tableau",
                  "Forecasting linked to three Gold builds",
                  "Financial analysis linked to SEC 10-K work",
                  "Marketing linked to nonprofit campaign systems",
                  "AI linked to Gold Nexus Alpha",
                  "Frontend linked to deployed portfolio pages"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-sm font-black text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects/gold-nexus-alpha"
                className="rounded-full bg-yellow-300 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                AI + Forecasting
              </Link>
              <Link
                href="/projects/dataco-tableau"
                className="rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:bg-blue-500/20"
              >
                Supply Chain
              </Link>
              <Link
                href="/projects/sec-10k-financial-analysis"
                className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-500/20"
              >
                Finance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}