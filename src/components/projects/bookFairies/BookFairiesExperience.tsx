"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import BookFairiesScene, { type BookFairiesFlowKey } from "@/components/cinema/bookFairies/BookFairiesScene";
import BookFairiesMiniGlyph from "@/components/projects/bookFairies/BookFairiesMiniGlyph";

const liveUrl = "https://rathee000001.github.io/the-book-faries/";
const githubUrl = "https://github.com/rathee000001/the-book-faries";

const flowCopy: Record<BookFairiesFlowKey, { label: string; short: string; title: string; text: string }> = {
  hero: {
    label: "Hero Campaign",
    short: "Hero",
    title: "Turning pages into possibilities",
    text: "The live website opens with a campaign-style hero that positions Chapters 4 Change as an action-oriented literacy movement."
  },
  about: {
    label: "About",
    short: "About",
    title: "Mission and organization context",
    text: "Explains The Book Fairies mission, vision, and redistribution approach for underserved communities."
  },
  progress: {
    label: "Progress",
    short: "Progress",
    title: "Fundraising progress meters",
    text: "Shows funds raised, books collected, and digital reach through visual progress indicators."
  },
  impact: {
    label: "Impact",
    short: "Impact",
    title: "Community impact counters",
    text: "Communicates scale through books distributed, students reached, volunteers engaged, and communities served."
  },
  partners: {
    label: "University Partners",
    short: "Partners",
    title: "Campus partnership network",
    text: "Highlights university partners and shows how campus communities support book drives and volunteer events."
  },
  fundraiser: {
    label: "Fundraiser",
    short: "Fundraiser",
    title: "Donation campaign section",
    text: "Turns the campaign story into a concrete contribution path for supporters."
  },
  tiers: {
    label: "Donation Tiers",
    short: "Tiers",
    title: "Bronze, Silver, and Gold supporter levels",
    text: "Uses tiered giving cards to make monthly support easier to understand and act on."
  },
  gallery: {
    label: "Gallery",
    short: "Gallery",
    title: "Visual proof of mission",
    text: "Uses image sections to show volunteers, children reading, and book donation activity."
  },
  donate: {
    label: "Donate Popup",
    short: "Donate",
    title: "Supporter conversion flow",
    text: "Includes a donation popup and floating donate button to reduce friction from interest to action."
  },
  contact: {
    label: "Contact",
    short: "Contact",
    title: "Volunteer and partner outreach",
    text: "Provides email, phone, location, and contact pathways for supporters and partners."
  },
  thankyou: {
    label: "Thank You",
    short: "Thank You",
    title: "Confirmation and relationship close",
    text: "The donation flow closes with appreciation and reinforces trust after a supporter action."
  }
};

const pipeline: BookFairiesFlowKey[] = [
  "hero",
  "about",
  "progress",
  "impact",
  "partners",
  "fundraiser",
  "tiers",
  "gallery",
  "donate",
  "contact"
];

const networkLinks = [
  { from: "hero", to: "about", d: "M 150 62 C 225 62, 270 62, 345 62" },
  { from: "about", to: "progress", d: "M 455 62 C 530 62, 575 62, 650 62" },
  { from: "progress", to: "impact", d: "M 700 96 C 700 126, 640 136, 540 136" },
  { from: "impact", to: "partners", d: "M 455 136 C 380 136, 335 136, 260 136" },
  { from: "partners", to: "fundraiser", d: "M 260 170 C 335 204, 380 210, 455 210" },
  { from: "fundraiser", to: "tiers", d: "M 540 210 C 615 210, 660 210, 735 210" },
  { from: "tiers", to: "gallery", d: "M 735 244 C 650 276, 420 276, 260 276" },
  { from: "gallery", to: "donate", d: "M 260 310 C 335 342, 380 350, 455 350" },
  { from: "donate", to: "contact", d: "M 540 350 C 615 350, 660 350, 735 350" }
] as const;

const nodeClassMap: Record<BookFairiesFlowKey, string> = {
  hero: "md:col-start-1 md:row-start-1",
  about: "md:col-start-2 md:row-start-1",
  progress: "md:col-start-3 md:row-start-1",
  impact: "md:col-start-2 md:row-start-2",
  partners: "md:col-start-1 md:row-start-2",
  fundraiser: "md:col-start-2 md:row-start-3",
  tiers: "md:col-start-3 md:row-start-3",
  gallery: "md:col-start-1 md:row-start-4",
  donate: "md:col-start-2 md:row-start-5",
  contact: "md:col-start-3 md:row-start-5",
  thankyou: ""
};

const proof = [
  "Fundraising landing page design",
  "Donation tier UX",
  "Impact metric storytelling",
  "University partner messaging",
  "Campaign conversion flow",
  "Deployed GitHub Pages website"
];

export default function BookFairiesExperience() {
  const [activeKey, setActiveKey] = useState<BookFairiesFlowKey>("hero");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <BookFairiesScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-white">
              BF
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                The Book Fairies Fundraiser
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Fundraiser UX | Impact storytelling | Donation flow
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Literacy Fundraiser Campaign Experience
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A live campaign website for The Book Fairies that turns nonprofit impact,
            university partnerships, donation tiers, and supporter action into one digital fundraiser experience.
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
              href="#fundraiser-flow"
              className="rounded-full border border-emerald-300 bg-emerald-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-emerald-100 transition hover:bg-emerald-200"
            >
              Explore Fundraiser Flow
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="fundraiser-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Fundraiser Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From story to supporter action.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected fundraiser map. This page shows the campaign experience built after the strategy website.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <BookFairiesMiniGlyph type={activeKey} active />

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
                          stroke={related ? "#16a34a" : "#2563eb"}
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
                            ? "border-emerald-300 bg-emerald-50 shadow-emerald-100"
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-blue-300"
                        ].join(" ")}
                      >
                        <BookFairiesMiniGlyph type={key} active={selected} />

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
                  onPointerEnter={() => setActiveKey("thankyou")}
                  onClick={() => setActiveKey("thankyou")}
                  whileHover={{ scale: 1.01 }}
                  className={[
                    "w-full rounded-[2rem] border p-5 text-left shadow-lg transition",
                    activeKey === "thankyou"
                      ? "border-yellow-300 bg-yellow-50 shadow-yellow-100"
                      : "border-slate-200 bg-white shadow-slate-200/70 hover:bg-slate-50"
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <BookFairiesMiniGlyph type="thankyou" active={activeKey === "thankyou"} />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
                        Supporter Close
                      </p>
                      <p className="mt-1 text-lg font-black text-slate-950">
                        Thank You and confirmation moment
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
                  Campaign strategy turned into conversion UX.
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
                href="/projects/chapters-4-change"
                className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-500/20"
              >
                See Strategy Website
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}