"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import ChaptersScene, { type ChaptersFlowKey } from "@/components/cinema/chapters/ChaptersScene";
import ChaptersMiniGlyph from "@/components/projects/chapters/ChaptersMiniGlyph";

const liveUrl = "https://rathee000001.github.io/Chapters-4-Change/index.html";
const githubUrl = "https://github.com/rathee000001/Chapters-4-Change";

const flowCopy: Record<ChaptersFlowKey, { label: string; short: string; title: string; text: string }> = {
  mission: {
    label: "Mission",
    short: "Mission",
    title: "Purpose-driven campaign foundation",
    text: "Frames the project around The Book Fairies mission of expanding access to books and empowering readers."
  },
  story: {
    label: "Story",
    short: "Story",
    title: "Brand narrative and emotional arc",
    text: "Builds the campaign story so visitors understand the cause before they see the fundraiser."
  },
  past: {
    label: "Past Fundraisers",
    short: "Past",
    title: "Evidence from previous examples",
    text: "Uses past fundraising examples to ground the new campaign in realistic nonprofit context."
  },
  segmentation: {
    label: "Segmentation",
    short: "Segment",
    title: "Audience grouping",
    text: "Breaks potential supporters into meaningful audience groups for better campaign messaging."
  },
  target: {
    label: "Target Market",
    short: "Target",
    title: "Focused supporter profile",
    text: "Identifies which audience is most likely to respond to the campaign and donation message."
  },
  positioning: {
    label: "Positioning",
    short: "Position",
    title: "Clear campaign place in the mind",
    text: "Defines how the project should be remembered compared with other giving opportunities."
  },
  usp: {
    label: "USP",
    short: "USP",
    title: "Unique value proposition",
    text: "Clarifies why this campaign matters and what makes the cause distinct."
  },
  fundraiser: {
    label: "New Fundraiser",
    short: "Fundraiser",
    title: "Campaign concept",
    text: "Turns the marketing strategy into a focused fundraiser idea connected to The Book Fairies."
  },
  marketing: {
    label: "Marketing",
    short: "Marketing",
    title: "Channel and communication plan",
    text: "Connects message, audience, and campaign channels into a practical outreach plan."
  },
  appeal: {
    label: "Appeal",
    short: "Appeal",
    title: "Donor motivation",
    text: "Uses emotional and practical appeal to move visitors from awareness toward action."
  },
  integration: {
    label: "Integration",
    short: "Integrate",
    title: "Connected campaign system",
    text: "Brings story, audience, message, fundraiser, and CTA into one complete digital experience."
  },
  cta: {
    label: "Call to Action",
    short: "CTA",
    title: "Conversion moment",
    text: "Makes the final ask clear so visitors know what action to take next."
  },
  thankyou: {
    label: "Thank You",
    short: "Thank You",
    title: "Relationship close",
    text: "Closes the campaign with appreciation and reinforces trust after the action."
  }
};

const pipeline: ChaptersFlowKey[] = [
  "mission",
  "story",
  "past",
  "segmentation",
  "target",
  "positioning",
  "usp",
  "fundraiser",
  "marketing",
  "appeal",
  "integration",
  "cta"
];

const networkLinks = [
  { from: "mission", to: "story", d: "M 150 62 C 225 62, 270 62, 345 62" },
  { from: "story", to: "past", d: "M 455 62 C 530 62, 575 62, 650 62" },
  { from: "past", to: "segmentation", d: "M 700 95 C 700 124, 640 132, 540 132" },
  { from: "segmentation", to: "target", d: "M 455 132 C 380 132, 335 132, 260 132" },
  { from: "target", to: "positioning", d: "M 260 165 C 335 195, 380 202, 455 202" },
  { from: "positioning", to: "usp", d: "M 540 202 C 615 202, 660 202, 735 202" },
  { from: "usp", to: "fundraiser", d: "M 735 235 C 660 262, 615 272, 540 272" },
  { from: "fundraiser", to: "marketing", d: "M 455 272 C 380 272, 335 272, 260 272" },
  { from: "marketing", to: "appeal", d: "M 260 305 C 335 335, 380 342, 455 342" },
  { from: "appeal", to: "integration", d: "M 540 342 C 615 342, 660 342, 735 342" },
  { from: "integration", to: "cta", d: "M 735 375 C 650 405, 420 405, 260 405" }
] as const;

const nodeClassMap: Record<ChaptersFlowKey, string> = {
  mission: "md:col-start-1 md:row-start-1",
  story: "md:col-start-2 md:row-start-1",
  past: "md:col-start-3 md:row-start-1",
  segmentation: "md:col-start-2 md:row-start-2",
  target: "md:col-start-1 md:row-start-2",
  positioning: "md:col-start-2 md:row-start-3",
  usp: "md:col-start-3 md:row-start-3",
  fundraiser: "md:col-start-2 md:row-start-4",
  marketing: "md:col-start-1 md:row-start-4",
  appeal: "md:col-start-2 md:row-start-5",
  integration: "md:col-start-3 md:row-start-5",
  cta: "md:col-start-1 md:row-start-6",
  thankyou: ""
};

const proof = [
  "Strategic marketing framework",
  "Audience segmentation",
  "Target market reasoning",
  "Campaign positioning",
  "Fundraiser storytelling",
  "Deployed GitHub Pages website"
];

export default function ChaptersExperience() {
  const [activeKey, setActiveKey] = useState<ChaptersFlowKey>("mission");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <ChaptersScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-white">
              C4C
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                Chapters 4 Change
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Strategic marketing | Nonprofit storytelling | Campaign design
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Nonprofit Marketing Story System
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A deployed strategic marketing website for The Book Fairies, connecting mission,
            audience segmentation, positioning, fundraiser storytelling, and a clear call to action.
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
              href="#campaign-flow"
              className="rounded-full border border-emerald-300 bg-emerald-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-emerald-100 transition hover:bg-emerald-200"
            >
              Explore Campaign Flow
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="campaign-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Campaign Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From mission to call to action.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected campaign map. This page shows how a marketing class project became a live digital story system.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <ChaptersMiniGlyph type={activeKey} active />

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
                  viewBox="0 0 900 455"
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

                <div className="relative grid gap-3 md:grid-cols-3 md:grid-rows-6">
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
                        <ChaptersMiniGlyph type={key} active={selected} />

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
                    <ChaptersMiniGlyph type="thankyou" active={activeKey === "thankyou"} />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
                        Relationship Close
                      </p>
                      <p className="mt-1 text-lg font-black text-slate-950">
                        Thank You and trust-building finish
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
                  Strategy turned into a live website.
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
                href="/projects/the-book-fairies"
                className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-500/20"
              >
                See New Fundraiser Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}