"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import GIASExperienceScene, { type ExperienceCluster } from "@/components/cinema/experience/GIASExperienceScene";

const companyWebsite = "https://gias.in/";
const companyLinkedIn = "https://www.linkedin.com/company/global-infrastructure-advisory-service/posts/?feedView=all";

const responsibilityCards: {
  key: ExperienceCluster;
  title: string;
  label: string;
  text: string;
}[] = [
  {
    key: "database",
    label: "Data Operations",
    title: "Property database management",
    text: "Managed structured property databases for residential and commercial listings across major Indian cities, improving data organization and retrieval for business use."
  },
  {
    key: "market",
    label: "Market Research",
    title: "Pricing and demand analysis",
    text: "Analyzed pricing trends, property demand, location attractiveness, and market conditions to support client and investment-related decisions."
  },
  {
    key: "stakeholder",
    label: "Stakeholders",
    title: "Client, broker, and team coordination",
    text: "Coordinated with clients, brokers, and internal stakeholders to validate listing information, clarify business requirements, and improve communication flow."
  },
  {
    key: "reporting",
    label: "Reporting",
    title: "Excel-based reporting support",
    text: "Supported Excel-based reporting and documentation processes to reduce inconsistencies and improve operational visibility."
  },
  {
    key: "operations",
    label: "Operations",
    title: "Business workflow support",
    text: "Assisted with business requirement understanding, problem-solving, and cross-functional coordination across property, client, and operations workflows."
  },
  {
    key: "recommendation",
    label: "Recommendation",
    title: "Direct manager validation",
    text: "Received a LinkedIn recommendation from Pramod Pareek, Founder and CEO, validating analytical skills, stakeholder communication, and business requirement understanding."
  }
];

const proofSignals = [
  "3 years full-time experience",
  "Business analysis and operations",
  "Structured property databases",
  "Market research and pricing trends",
  "Excel reporting and documentation",
  "Direct manager recommendation"
];

export default function ExperiencePage() {
  const [activeKey, setActiveKey] = useState<ExperienceCluster>("operations");
  const active = responsibilityCards.find((card) => card.key === activeKey) || responsibilityCards[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <GIASExperienceScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/85 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-yellow-200">
              GIAS
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Professional Experience
              </p>
              <p className="text-sm font-black text-slate-950">
                Real Estate Operations Analyst
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Operations | Data Analysis | Market Research | Excel Reporting
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            3 years of operations and business analysis experience.
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            Worked as a Real Estate Operations Analyst at Global Infrastructure & Advisory Services,
            supporting structured property data management, client coordination, market research,
            operational reporting, and business decision support.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Company Website
            </a>
            <a
              href={companyLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              Company LinkedIn
            </a>
            <a
              href="#recommendation"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              View Recommendation
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="experience-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/86 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Experience Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From property data to business decisions.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the experience map to see how the role connects data operations,
                market analysis, stakeholder coordination, reporting, and decision support.
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
                {responsibilityCards.map((card, index) => {
                  const selected = activeKey === card.key;

                  return (
                    <motion.button
                      key={card.key}
                      onPointerEnter={() => setActiveKey(card.key)}
                      onClick={() => setActiveKey(card.key)}
                      whileHover={{ y: -4, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className={[
                        "rounded-[2rem] border p-5 text-left shadow-lg transition",
                        selected
                          ? "border-blue-300 bg-blue-50 shadow-blue-100"
                          : "border-slate-200 bg-white shadow-slate-200/70 hover:border-yellow-300"
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-yellow-200">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                          {card.label}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-black leading-tight text-slate-950">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                        {card.text}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div id="recommendation" className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/50">
              <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
                Direct Manager Recommendation
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight">
                External validation from the CEO who managed the work.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The recommendation strengthens the experience section because it confirms analytical ability,
                stakeholder communication, problem-solving, quality of work, business requirement understanding,
                and cross-functional collaboration.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {proofSignals.map((signal) => (
                  <div key={signal} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm font-black text-white">{signal}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/80">
              <img
                src="/evidence/gias-recommendation.svg"
                alt="LinkedIn recommendation from Pramod Pareek for Praveen Rathee"
                className="w-full rounded-[2rem] border border-slate-100"
              />
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                  Recruiter Interpretation
                </p>
                <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950">
                  Why this matters for analytics roles.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Real business data exposure",
                  "Client and stakeholder communication",
                  "Market research experience",
                  "Excel reporting foundation",
                  "Operations workflow understanding",
                  "Recommendation-backed credibility"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-black text-slate-950">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-blue-500"
              >
                Company Website
              </a>
              <a
                href={companyLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-slate-50"
              >
                LinkedIn Company Page
              </a>
              <Link
                href="/skills"
                className="rounded-full border border-emerald-300 bg-emerald-100 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-emerald-200"
              >
                Skills Map
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}