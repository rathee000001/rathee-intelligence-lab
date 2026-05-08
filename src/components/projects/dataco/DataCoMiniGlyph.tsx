"use client";

import { motion } from "framer-motion";
import type { DataCoFlowKey } from "@/components/cinema/dataco/DataCoScene";

type Props = {
  type: DataCoFlowKey;
  active?: boolean;
};

const glyphMap: Record<DataCoFlowKey, { text: string; tone: string; shape: "data" | "line" | "bars" | "truck" | "ship" | "people" | "filter" | "story" | "tableau" | "doc" }> = {
  dataset: { text: "DATA", tone: "yellow", shape: "data" },
  sales: { text: "$", tone: "blue", shape: "line" },
  profit: { text: "P", tone: "emerald", shape: "bars" },
  delivery: { text: "DL", tone: "rose", shape: "truck" },
  shipping: { text: "S", tone: "emerald", shape: "ship" },
  customer: { text: "CUS", tone: "blue", shape: "people" },
  segment: { text: "SEG", tone: "violet", shape: "people" },
  filters: { text: "FLT", tone: "cyan", shape: "filter" },
  story: { text: "ST", tone: "yellow", shape: "story" },
  tableau: { text: "TB", tone: "blue", shape: "tableau" },
  presentation: { text: "PDF", tone: "slate", shape: "doc" }
};

function color(tone: string) {
  if (tone === "yellow") return "text-yellow-500";
  if (tone === "blue") return "text-blue-600";
  if (tone === "emerald") return "text-emerald-500";
  if (tone === "violet") return "text-violet-500";
  if (tone === "rose") return "text-rose-500";
  if (tone === "cyan") return "text-cyan-500";
  return "text-slate-700";
}

export default function DataCoMiniGlyph({ type, active = false }: Props) {
  const glyph = glyphMap[type];

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:12px_12px] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(37,99,235,0.14),transparent_38%),radial-gradient(circle_at_72%_62%,rgba(22,163,74,0.14),transparent_35%)]" />

      {glyph.shape === "data" && (
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

      {glyph.shape === "line" && (
        <div className="absolute inset-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute h-[3px] rounded-full bg-blue-600/70"
              style={{ width: 18 + i * 8, top: 7 + i * 8, left: i * 4 }}
              animate={{ x: active ? [0, 5, 0] : [0, 2, 0], opacity: [0.4, 1, 0.45] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "bars" && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-1">
          {[14, 24, 34, 20].map((h, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-emerald-500/75"
              animate={{ height: active ? [h * 0.55, h, h * 0.75] : [h * 0.5, h * 0.72, h * 0.55] }}
              transition={{ repeat: Infinity, duration: 1.3, delay: i * 0.08 }}
            />
          ))}
        </div>
      )}

      {(glyph.shape === "truck" || glyph.shape === "ship") && (
        <motion.div
          className="absolute left-3 right-3 top-1/2 h-3 -translate-y-1/2 rounded-md bg-emerald-500/25"
          animate={{ x: active ? [-4, 4, -4] : [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

      {glyph.shape === "people" && (
        <div className="absolute inset-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute h-2.5 w-2.5 rounded-full bg-blue-600/70"
              style={{ left: 8 + (i % 2) * 20, top: 7 + Math.floor(i / 2) * 18 }}
              animate={{ scale: active ? [1, 1.28, 1] : [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.12 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "filter" && (
        <motion.div
          className="absolute left-1/2 top-3 h-0 w-0 -translate-x-1/2 border-l-[20px] border-r-[20px] border-t-[34px] border-l-transparent border-r-transparent border-t-cyan-300/35"
          animate={{ scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        />
      )}

      {(glyph.shape === "story" || glyph.shape === "tableau" || glyph.shape === "doc") && (
        <motion.div
          className="absolute inset-3 rounded-lg border border-blue-400/35 bg-blue-400/10"
          animate={{ scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        />
      )}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: active ? [0, -1, 0] : [0, -0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className={["font-black leading-none", glyph.text.length > 2 ? "text-[12px]" : "text-[21px]", color(glyph.tone)].join(" ")}>
          {glyph.text}
        </span>
      </motion.div>
    </div>
  );
}