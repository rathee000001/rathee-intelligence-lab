"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import HomeLabScene from "@/components/cinema/home/HomeLabScene";

const buildItems = [
  {
    label: "Profile Evidence",
    title: "LinkedIn profile is being converted into resume bullets",
    status: "Built",
    tone: "green"
  },
  {
    label: "Project Proof",
    title: "Gold, Tableau, SEC, marketing, Meta, and portfolio projects are mapped",
    status: "Built",
    tone: "green"
  },
  {
    label: "Experience",
    title: "GIAS operations analyst experience and recommendation are integrated",
    status: "Built",
    tone: "green"
  },
  {
    label: "ATS Resume",
    title: "Final one-page recruiter resume is being shaped from this portfolio",
    status: "In Progress",
    tone: "red"
  },
  {
    label: "PDF Export",
    title: "Downloadable resume file will be added after final resume wording",
    status: "In Progress",
    tone: "red"
  },
  {
    label: "Role Versions",
    title: "Supply chain, business analyst, data analyst, and forecasting versions planned",
    status: "Queued",
    tone: "yellow"
  }
];

const resumeSignals = [
  "Operations Analyst",
  "Supply Chain Analyst",
  "Business Analyst",
  "Data Analyst",
  "Forecasting Analyst",
  "BI Analyst"
];

function StatusPill({ status, tone }: { status: string; tone: string }) {
  if (tone === "green") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.75)]" />
        {status}
      </span>
    );
  }

  if (tone === "red") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-rose-700">
        <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.75)]" />
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-yellow-700">
      <span className="h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.75)]" />
      {status}
    </span>
  );
}

export default function ResumePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <HomeLabScene activeCluster="lab" />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-6 pb-12 pt-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/85 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-yellow-200">
              CV
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Resume Lab
              </p>
              <p className="text-sm font-black text-slate-950">
                ATS resume build in progress
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Resume | LinkedIn | Evidence | Role targeting
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Resume engine under construction.
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            The resume page is intentionally marked as in progress while the portfolio evidence,
            project pages, experience page, skills map, and LinkedIn strategy are being converted into a clean ATS-ready resume.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/experience"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              View Experience
            </Link>
            <Link
              href="/skills"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              View Skills Map
            </Link>
            <Link
              href="/timeline"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              View Timeline
            </Link>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/86 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Build Status
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                The resume will be generated from verified portfolio proof.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                This page is a placeholder by design. The final resume will not be generic; it will be built from the actual project pages,
                GitHub/live links, Tableau evidence, reports, presentations, and GIAS recommendation.
              </p>

              <div className="mt-8 rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/50">
                <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
                  Target Resume Versions
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {resumeSignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {buildItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ y: -4, scale: 1.012 }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                        {item.label}
                      </p>
                      <h3 className="mt-3 text-xl font-black leading-tight text-slate-950">
                        {item.title}
                      </h3>
                    </div>

                    <StatusPill status={item.status} tone={item.tone} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-slate-50 p-7 shadow-xl shadow-slate-200/60">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                  Deployment Note
                </p>
                <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950">
                  Ready for GitHub and Vercel after local build check.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Run local build",
                  "Push to GitHub",
                  "Connect repo to Vercel",
                  "No API key needed right now",
                  "Portfolio AI is local proof mode",
                  "Future RAG will need env vars"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-black text-slate-950">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/portfolio-ai"
                className="rounded-full bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-blue-500"
              >
                Portfolio AI
              </Link>
              <Link
                href="/projects/gold-nexus-alpha"
                className="rounded-full border border-yellow-300 bg-yellow-100 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                Flagship Project
              </Link>
              <Link
                href="/experience"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-slate-50"
              >
                Experience Proof
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}