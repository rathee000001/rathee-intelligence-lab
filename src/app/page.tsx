"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import HomeLabScene from "@/components/cinema/home/HomeLabScene";

const projectClusters = [
  {
    key: "gold",
    label: "Forecasting Systems",
    title: "Gold forecasting versions",
    text: "Excel prototype, regression platform, and advanced AI forecasting intelligence.",
    projects: [
      { name: "Gold Nexus Alpha", href: "/projects/gold-nexus-alpha", tag: "Deep ML, SQL, RAG, AI" },
      { name: "Gold AI Platform", href: "/projects/gold-ai-platform", tag: "Regression intelligence" },
      { name: "Gold Forecasting Model", href: "/projects/gold-forecasting-model", tag: "Excel and backtesting" }
    ]
  },
  {
    key: "supply",
    label: "Supply Chain Analytics",
    title: "Operations and dashboard intelligence",
    text: "Tableau story, delivery risk, shipping performance, and supply chain business insights.",
    projects: [
      { name: "DataCo Tableau", href: "/projects/dataco-tableau", tag: "Supply chain Tableau story" }
    ]
  },
  {
    key: "finance",
    label: "Financial Analysis",
    title: "SEC 10-K financial review",
    text: "Spreadsheet modeling, ratios, liquidity, profitability, leverage, trends, report, and presentation.",
    projects: [
      { name: "SEC 10-K Analysis", href: "/projects/sec-10k-financial-analysis", tag: "Financial analysis model" }
    ]
  },
  {
    key: "marketing",
    label: "Marketing Systems",
    title: "Nonprofit campaign websites",
    text: "Strategic marketing story system and fundraiser conversion experience for The Book Fairies.",
    projects: [
      { name: "Chapters 4 Change", href: "/projects/chapters-4-change", tag: "Nonprofit story website" },
      { name: "The Book Fairies", href: "/projects/the-book-fairies", tag: "Fundraiser campaign UX" }
    ]
  },
  {
    key: "management",
    label: "Management Strategy",
    title: "Case analysis and recommendations",
    text: "Leadership, culture, ethics, stakeholders, and strategic recommendations.",
    projects: [
      { name: "Meta Case Analysis", href: "/projects/meta-case-analysis", tag: "Strategic management case" }
    ]
  }
];

const skillRows = [
  "Supply Chain Analytics",
  "Forecasting",
  "Python",
  "SQL",
  "Tableau",
  "Excel",
  "Next.js",
  "AI-Assisted Analytics",
  "Financial Analysis",
  "Marketing Strategy"
];

export default function HomePage() {
  const [activeCluster, setActiveCluster] = useState("gold");
  const active = projectClusters.find((cluster) => cluster.key === activeCluster) || projectClusters[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <HomeLabScene activeCluster={activeCluster} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/85 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-yellow-200">
              RIL
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Portfolio
              </p>
              <p className="text-sm font-black text-slate-950">
                Rathee Intelligence Lab
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            MBA Supply Chain | Operations Analytics | Forecasting | AI-Assisted Analytics
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Analytics portfolio built like live systems.
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A project portfolio connecting supply chain analytics, forecasting, Tableau,
            financial analysis, marketing systems, and deployed AI-assisted web platforms.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#project-lab"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Explore Projects
            </a>
            <Link
              href="/projects/gold-nexus-alpha"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              View Flagship Project
            </Link>
            <Link
              href="/resume"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              Resume
            </Link>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="project-lab" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/86 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Project Lab
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                One profile, multiple proof systems.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover a cluster to change the dark lab animation and open the project pages from one clean home base.
              </p>

              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <p className="text-xs font-black uppercase tracking-[0.26em] text-blue-600">
                  {active.label}
                </p>
                <h3 className="mt-2 text-3xl font-black text-slate-950">{active.title}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">{active.text}</p>
              </motion.div>
            </div>

            <div>
              <div className="grid gap-4 md:grid-cols-2">
                {projectClusters.map((cluster) => {
                  const selected = activeCluster === cluster.key;

                  return (
                    <motion.button
                      key={cluster.key}
                      onPointerEnter={() => setActiveCluster(cluster.key)}
                      onClick={() => setActiveCluster(cluster.key)}
                      whileHover={{ y: -4, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className={[
                        "rounded-[2rem] border p-5 text-left shadow-lg transition",
                        selected
                          ? "border-blue-300 bg-blue-50 shadow-blue-100"
                          : "border-slate-200 bg-white shadow-slate-200/70 hover:border-yellow-300"
                      ].join(" ")}
                    >
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                        {cluster.label}
                      </p>
                      <h3 className="mt-3 text-2xl font-black text-slate-950">{cluster.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{cluster.text}</p>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[2.5rem] border border-slate-200 bg-slate-50/95 p-5">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-blue-600">
                  Open {active.label}
                </p>

                <div className="grid gap-3">
                  {active.projects.map((project) => (
                    <Link
                      key={project.href}
                      href={project.href}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50"
                    >
                      <div>
                        <p className="text-lg font-black text-slate-950">{project.name}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{project.tag}</p>
                      </div>
                      <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition group-hover:bg-blue-600">
                        Open
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/50">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
                  Core Signal
                </p>
                <h2 className="mt-4 text-4xl font-black">
                  Built for recruiters to verify quickly.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {skillRows.map((skill) => (
                  <div key={skill} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-sm font-black text-white">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects/gold-nexus-alpha"
                className="rounded-full bg-yellow-300 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                Flagship Forecasting
              </Link>
              <Link
                href="/projects/dataco-tableau"
                className="rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:bg-blue-500/20"
              >
                Supply Chain Tableau
              </Link>
              <Link
                href="/projects/sec-10k-financial-analysis"
                className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-500/20"
              >
                Financial Analysis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}