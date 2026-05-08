"use client";

import { motion } from "framer-motion";
import type { RegressionFlowKey } from "@/components/cinema/goldRegression/GoldRegressionScene";

type Props = {
  type: RegressionFlowKey;
  active?: boolean;
};

const glyphMap: Record<RegressionFlowKey, { text: string; tone: string; shape: "grid" | "stream" | "calendar" | "matrix" | "plane" | "bars" | "chart" | "stats" }> = {
  goldCsv: { text: "CSV", tone: "yellow", shape: "grid" },
  fred: { text: "FRED", tone: "blue", shape: "stream" },
  alignment: { text: "M", tone: "emerald", shape: "calendar" },
  matrix: { text: "X", tone: "blue", shape: "matrix" },
  regression: { text: "y", tone: "slate", shape: "plane" },
  coefficients: { text: "B", tone: "yellow", shape: "bars" },
  dashboard: { text: "D", tone: "blue", shape: "chart" },
  statistics: { text: "R2", tone: "violet", shape: "stats" },
  charts: { text: "CH", tone: "cyan", shape: "chart" }
};

function color(tone: string) {
  if (tone === "yellow") return "text-yellow-500";
  if (tone === "blue") return "text-blue-600";
  if (tone === "emerald") return "text-emerald-500";
  if (tone === "violet") return "text-violet-500";
  if (tone === "cyan") return "text-cyan-500";
  return "text-slate-700";
}

export default function RegressionMiniGlyph({ type, active = false }: Props) {
  const glyph = glyphMap[type];

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:12px_12px] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(37,99,235,0.16),transparent_38%),radial-gradient(circle_at_72%_62%,rgba(250,204,21,0.16),transparent_35%)]" />

      {glyph.shape === "grid" && (
        <div className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.span
              key={i}
              className="rounded-[2px] bg-yellow-500/75"
              animate={{ opacity: active ? [0.35, 1, 0.45] : [0.3, 0.65, 0.35] }}
              transition={{ repeat: Infinity, duration: 1.3, delay: i * 0.04 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "stream" && (
        <div className="absolute inset-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1 top-2 h-[3px] w-9 rounded-full bg-blue-500/70"
              style={{ top: 10 + i * 10 }}
              animate={{ x: active ? [0, 5, 0] : [0, 2, 0], opacity: [0.35, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.14 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "calendar" && (
        <motion.div
          className="absolute inset-3 rounded-lg border border-emerald-400/45 bg-emerald-400/10"
          animate={{ scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <div className="h-2 rounded-t-lg bg-emerald-400/45" />
        </motion.div>
      )}

      {glyph.shape === "matrix" && (
        <div className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.span
              key={i}
              className="rounded-[2px] bg-blue-600/70"
              animate={{ opacity: active ? [0.2, 1, 0.35] : [0.2, 0.55, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.025 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "plane" && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-8 w-9 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-md border border-slate-500/35 bg-slate-500/10"
          animate={{ rotate: active ? [-18, -12, -18] : [-18, -16, -18] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      )}

      {glyph.shape === "bars" && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-1">
          {[16, 26, 20, 32, 22].map((h, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-yellow-500/80"
              animate={{ height: active ? [h * 0.6, h, h * 0.75] : [h * 0.55, h * 0.75, h * 0.6] }}
              transition={{ repeat: Infinity, duration: 1.3, delay: i * 0.08 }}
            />
          ))}
        </div>
      )}

      {(glyph.shape === "chart" || glyph.shape === "stats") && (
        <motion.div
          className="absolute inset-2 rounded-full border border-blue-400/35"
          animate={{ scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        />
      )}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: active ? [0, -1, 0] : [0, -0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className={["font-black leading-none", type === "fred" || type === "goldCsv" || type === "statistics" || type === "charts" ? "text-[13px]" : "text-[26px]", color(glyph.tone)].join(" ")}>
          {glyph.text}
        </span>
      </motion.div>
    </div>
  );
}