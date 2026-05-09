"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import TimelineScene, { type TimelineCluster } from "@/components/cinema/timeline/TimelineScene";

type TimelineItem = {
  key: TimelineCluster;
  date: string;
  label: string;
  title: string;
  subtitle: string;
  href: string;
  proof: string[];
  skills: string[];
  stage: string;
};

const timelineItems: TimelineItem[] = [
  {
    key: "goldV1",
    date: "Spring 2025",
    label: "Version 1",
    title: "Gold Forecasting Model Prototype",
    subtitle: "The first complete forecasting build: model framework, Excel-style implementation, in-sample and out-of-sample backtesting, model summary, and AI log.",
    href: "/projects/gold-forecasting-model",
    proof: ["Forecasting foundation", "Excel model logic", "Backtesting", "GitHub Pages"],
    skills: ["Excel", "Forecasting", "Backtesting", "Documentation"],
    stage: "Foundation"
  },
  {
    key: "tableau",
    date: "Fall 2025",
    label: "Operations Analytics",
    title: "DataCo Tableau Supply Chain Story",
    subtitle: "A Tableau Public story connecting sales, profit, delivery risk, shipping modes, customer segmentation, filters, and executive dashboard storytelling.",
    href: "/projects/dataco-tableau",
    proof: ["Tableau dashboard", "Delivery risk", "Shipping analysis", "Customer segmentation"],
    skills: ["Tableau", "Supply Chain Analytics", "Dashboard Design", "Operations"],
    stage: "Analytics"
  },
  {
    key: "finance",
    date: "Fall 2025",
    label: "Financial Analysis",
    title: "SEC 10-K Financial Analysis",
    subtitle: "A financial analysis workflow connecting SEC filing review, spreadsheet modeling, liquidity, profitability, leverage, trends, report, and presentation.",
    href: "/projects/sec-10k-financial-analysis",
    proof: ["10-K review", "Ratio model", "Financial statements", "Report and slides"],
    skills: ["Excel", "Financial Analysis", "Accounting", "Business Writing"],
    stage: "Business Evidence"
  },
  {
    key: "marketing",
    date: "Fall 2025",
    label: "Marketing Strategy",
    title: "Chapters 4 Change",
    subtitle: "A strategic nonprofit marketing website for The Book Fairies, connecting mission, story, segmentation, targeting, positioning, USP, appeal, and CTA.",
    href: "/projects/chapters-4-change",
    proof: ["Segmentation", "Target market", "Positioning", "Nonprofit story"],
    skills: ["Marketing Strategy", "Branding", "Storytelling", "Web Design"],
    stage: "Strategy"
  },
  {
    key: "fundraiser",
    date: "Fall 2025",
    label: "Campaign UX",
    title: "The Book Fairies Fundraiser",
    subtitle: "A campaign experience turning nonprofit impact, university partners, donation tiers, gallery, donation popup, and supporter contact into conversion UX.",
    href: "/projects/the-book-fairies",
    proof: ["Donation tiers", "Impact counters", "Partner messaging", "Fundraiser UX"],
    skills: ["Campaign Design", "UX", "HTML/CSS", "Conversion Flow"],
    stage: "Execution"
  },
  {
    key: "management",
    date: "Fall 2025",
    label: "Management Case",
    title: "Meta Strategic Management Case Analysis",
    subtitle: "A completed case project analyzing Meta through leadership, culture, ethics, privacy, regulation, stakeholders, and recommendations.",
    href: "/projects/meta-case-analysis",
    proof: ["Leadership analysis", "Ethics", "Stakeholders", "Recommendations"],
    skills: ["Strategic Management", "Leadership", "Ethics", "Presentation"],
    stage: "Case Analysis"
  },
  {
    key: "goldV2",
    date: "Late 2025",
    label: "Version 2",
    title: "Gold Regression Intelligence System",
    subtitle: "A live forecasting platform connecting gold price history, FRED macroeconomic data, month-end alignment, factor matrix, regression logic, and dashboard output.",
    href: "/projects/gold-ai-platform",
    proof: ["Gold CSV", "FRED data", "Regression model", "Recharts dashboard"],
    skills: ["Next.js", "Regression", "FRED API", "Data Cleaning"],
    stage: "Platform"
  },
  {
    key: "goldV3",
    date: "Nov 2025 - Present",
    label: "Flagship",
    title: "Gold Nexus Alpha",
    subtitle: "Advanced gold forecasting intelligence with Deep ML interpretation, SQL-style exploration, artifact-grounded AI, model flow, and live platform deployment.",
    href: "/projects/gold-nexus-alpha",
    proof: ["Deep ML", "SQL explorer", "RAG/artifact AI", "Live Next.js platform"],
    skills: ["Next.js", "Python", "SQL", "RAG", "Deep ML"],
    stage: "Flagship"
  },
  {
    key: "portfolio",
    date: "Now",
    label: "Portfolio System",
    title: "Rathee Intelligence Lab",
    subtitle: "A cinematic recruiter-facing portfolio that turns projects into interactive proof systems with 3D animations, live links, evidence trails, and skill mapping.",
    href: "/",
    proof: ["Interactive portfolio", "Project launcher", "3D pages", "Recruiter verification"],
    skills: ["React", "Three.js", "Product Design", "Portfolio Strategy"],
    stage: "Showcase"
  }
];

const sequenceStats = [
  { value: "9", label: "Project proof systems" },
  { value: "3", label: "Gold forecasting versions" },
  { value: "5", label: "Business domains" },
  { value: "Live", label: "Recruiter-ready links" }
];

export default function TimelinePage() {
  const [activeKey, setActiveKey] = useState<TimelineCluster>("goldV3");
  const active = timelineItems.find((item) => item.key === activeKey) || timelineItems[7];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <TimelineScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/85 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-yellow-200">
              TL
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project Evolution
              </p>
              <p className="text-sm font-black text-slate-950">
                From class projects to deployed intelligence systems
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Timeline | Evidence trail | Recruiter verification
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            The build history behind the portfolio.
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A chronological map of how MBA coursework, analytics projects, forecasting systems,
            marketing websites, financial analysis, and AI-assisted platforms evolved into one live portfolio.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#timeline-map"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Explore Timeline
            </a>
            <Link
              href="/projects/gold-nexus-alpha"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              View Current Flagship
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="timeline-map" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/86 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Active Milestone
              </p>

              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-5 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                      {active.date}
                    </p>
                    <h2 className="mt-2 text-4xl font-black leading-tight text-slate-950">
                      {active.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                    {active.stage}
                  </span>
                </div>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {active.subtitle}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {active.proof.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-black text-slate-950">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link
                  href={active.href}
                  className="mt-7 inline-flex rounded-full bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
                >
                  Open Milestone
                </Link>
              </motion.div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {sequenceStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.7rem] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60">
                    <p className="text-3xl font-black text-slate-950">{stat.value}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="relative rounded-[2.5rem] border border-slate-200 bg-slate-50/95 p-5">
                <div className="absolute left-8 top-10 hidden h-[calc(100%-5rem)] w-[3px] rounded-full bg-gradient-to-b from-yellow-300 via-blue-500 to-emerald-400 md:block" />

                <div className="grid gap-4">
                  {timelineItems.map((item, index) => {
                    const selected = activeKey === item.key;

                    return (
                      <motion.button
                        key={item.key}
                        onPointerEnter={() => setActiveKey(item.key)}
                        onClick={() => setActiveKey(item.key)}
                        whileHover={{ x: 4, scale: 1.005 }}
                        transition={{ type: "spring", stiffness: 280, damping: 20 }}
                        className={[
                          "relative grid gap-4 rounded-[2rem] border p-4 text-left shadow-lg transition md:grid-cols-[0.18fr_0.82fr]",
                          selected
                            ? "border-blue-300 bg-blue-50 shadow-blue-100"
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-yellow-300"
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-4 md:block">
                          <div
                            className={[
                              "relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-xs font-black ring-4",
                              selected
                                ? "bg-slate-950 text-yellow-200 ring-blue-100"
                                : "bg-white text-slate-950 ring-slate-100"
                            ].join(" ")}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <p className="mt-0 text-xs font-black uppercase tracking-[0.2em] text-blue-600 md:mt-3">
                            {item.date}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                              {item.label}
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                              {item.stage}
                            </span>
                          </div>

                          <h3 className="mt-3 text-2xl font-black leading-tight text-slate-950">
                            {item.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                            {item.subtitle}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
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
                  This is not one project. It is a progression.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Academic projects became deployed websites",
                  "Gold forecasting was rebuilt three times",
                  "Business analysis is backed by live files",
                  "Tableau and Excel connect to web proof",
                  "Strategy work became campaign UX",
                  "Portfolio converts evidence into navigation"
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
                Current Flagship
              </Link>
              <Link
                href="/projects/gold-forecasting-model"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/15"
              >
                Start at Version 1
              </Link>
              <Link
                href="/projects/dataco-tableau"
                className="rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:bg-blue-500/20"
              >
                Supply Chain Proof
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}