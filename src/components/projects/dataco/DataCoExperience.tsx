"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import DataCoScene, { type DataCoFlowKey } from "@/components/cinema/dataco/DataCoScene";
import DataCoMiniGlyph from "@/components/projects/dataco/DataCoMiniGlyph";

const tableauUrl = "https://public.tableau.com/app/profile/praveen.rathee/viz/shared/FBY5WD55Y";
const driveUrl = "https://drive.google.com/file/d/12At6vi1fAAUri4CBmN5qcWsoTEbaqHL2/view?usp=drive_link";

const flowCopy: Record<DataCoFlowKey, { label: string; short: string; title: string; text: string }> = {
  dataset: {
    label: "DataCo Dataset",
    short: "Dataset",
    title: "Supply chain operations data",
    text: "The project starts from DataCo-style sales, order, customer, shipping, and delivery records prepared for Tableau analysis."
  },
  sales: {
    label: "Sales Trend",
    short: "Sales",
    title: "Monthly sales and revenue movement",
    text: "Sales trend views help show how revenue changes across the business and where performance rises or drops."
  },
  profit: {
    label: "Profit View",
    short: "Profit",
    title: "Financial and operational performance",
    text: "Profit views connect business performance with operational activity and delivery behavior."
  },
  delivery: {
    label: "Delivery Risk",
    short: "Delivery",
    title: "On-time versus late delivery",
    text: "Delivery breakdowns identify late delivery risk and compare operational reliability across orders."
  },
  shipping: {
    label: "Shipping Mode",
    short: "Shipping",
    title: "Average delivery time by shipping mode",
    text: "Shipping mode analysis compares speed and performance across Same Day, First Class, Second Class, and Standard Class style delivery options."
  },
  customer: {
    label: "Customer View",
    short: "Customer",
    title: "Customer segmentation dashboard",
    text: "Customer views help explain which segments, markets, and groups drive operational and sales outcomes."
  },
  segment: {
    label: "Segmentation",
    short: "Segment",
    title: "Segment and market behavior",
    text: "Segmentation connects customers, market filters, and business outcomes for targeted operational insight."
  },
  filters: {
    label: "Interactive Filters",
    short: "Filters",
    title: "Dashboard exploration controls",
    text: "Filters allow users to explore by shipping mode, market, sales change status, benefit per order, and delivery risk."
  },
  story: {
    label: "Tableau Story",
    short: "Story",
    title: "Executive Tableau story flow",
    text: "The published Tableau story organizes dashboards into a guided business narrative for review."
  },
  tableau: {
    label: "Tableau Public",
    short: "Tableau",
    title: "Live published dashboard",
    text: "The project is published on Tableau Public so recruiters and professors can open the interactive dashboard directly."
  },
  presentation: {
    label: "Presentation",
    short: "PDF",
    title: "Project presentation evidence",
    text: "The linked presentation file supports the Tableau story with additional explanation and project documentation."
  }
};

const pipeline: DataCoFlowKey[] = [
  "dataset",
  "sales",
  "profit",
  "delivery",
  "shipping",
  "customer",
  "segment",
  "filters",
  "story",
  "tableau"
];

const networkLinks = [
  { from: "dataset", to: "sales", d: "M 150 62 C 225 62, 270 62, 345 62" },
  { from: "sales", to: "profit", d: "M 455 62 C 530 62, 575 62, 650 62" },
  { from: "profit", to: "delivery", d: "M 700 96 C 700 126, 640 136, 540 136" },
  { from: "delivery", to: "shipping", d: "M 455 136 C 380 136, 335 136, 260 136" },
  { from: "shipping", to: "customer", d: "M 260 170 C 335 204, 380 210, 455 210" },
  { from: "customer", to: "segment", d: "M 540 210 C 615 210, 660 210, 735 210" },
  { from: "segment", to: "filters", d: "M 735 244 C 650 276, 420 276, 260 276" },
  { from: "filters", to: "story", d: "M 260 310 C 335 342, 380 350, 455 350" },
  { from: "story", to: "tableau", d: "M 540 350 C 615 350, 660 350, 735 350" }
] as const;

const nodeClassMap: Record<DataCoFlowKey, string> = {
  dataset: "md:col-start-1 md:row-start-1",
  sales: "md:col-start-2 md:row-start-1",
  profit: "md:col-start-3 md:row-start-1",
  delivery: "md:col-start-2 md:row-start-2",
  shipping: "md:col-start-1 md:row-start-2",
  customer: "md:col-start-2 md:row-start-3",
  segment: "md:col-start-3 md:row-start-3",
  filters: "md:col-start-1 md:row-start-4",
  story: "md:col-start-2 md:row-start-5",
  tableau: "md:col-start-3 md:row-start-5",
  presentation: ""
};

const proof = [
  "Tableau dashboard design",
  "Supply chain analytics",
  "Delivery risk analysis",
  "Shipping mode comparison",
  "Customer segmentation",
  "Executive story presentation"
];

export default function DataCoExperience() {
  const [activeKey, setActiveKey] = useState<DataCoFlowKey>("dataset");
  const active = flowCopy[activeKey];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <DataCoScene activeKey={activeKey} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              TB
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Project
              </p>
              <p className="text-sm font-black text-slate-950">
                DataCo Tableau
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Supply chain analytics | Tableau story | Operations dashboard
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Supply Chain Sales and Operations Dashboard
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A Tableau Public story for supply chain analytics, connecting monthly sales,
            profit, delivery risk, shipping performance, customer segmentation, and interactive filters.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={tableauUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Open Tableau Public
            </a>
            <a
              href={driveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              View Presentation
            </a>
            <a
              href="#dataco-flow"
              className="rounded-full border border-emerald-300 bg-emerald-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-emerald-100 transition hover:bg-emerald-200"
            >
              Explore Dashboard Flow
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="dataco-flow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Dashboard Flow
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                From raw operations data to Tableau story.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hover through the connected dashboard map. This page shows how the Tableau project turns supply chain data into business insight.
              </p>

              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <div className="flex items-center gap-4">
                  <DataCoMiniGlyph type={activeKey} active />

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
                          stroke={related ? "#2563eb" : "#16a34a"}
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
                            ? "border-blue-300 bg-blue-50 shadow-blue-100"
                            : "border-slate-200 bg-white shadow-slate-200/70 hover:border-emerald-300"
                        ].join(" ")}
                      >
                        <DataCoMiniGlyph type={key} active={selected} />

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
                  onPointerEnter={() => setActiveKey("presentation")}
                  onClick={() => setActiveKey("presentation")}
                  whileHover={{ scale: 1.01 }}
                  className={[
                    "w-full rounded-[2rem] border p-5 text-left shadow-lg transition",
                    activeKey === "presentation"
                      ? "border-yellow-300 bg-yellow-50 shadow-yellow-100"
                      : "border-slate-200 bg-white shadow-slate-200/70 hover:bg-slate-50"
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <DataCoMiniGlyph type="presentation" active={activeKey === "presentation"} />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
                        Presentation Evidence
                      </p>
                      <p className="mt-1 text-lg font-black text-slate-950">
                        PDF / report support for the Tableau story
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
                  Operations data turned into an executive Tableau story.
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
                href={tableauUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-yellow-300 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                Tableau Public
              </a>
              <a
                href={driveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/15"
              >
                Presentation File
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}