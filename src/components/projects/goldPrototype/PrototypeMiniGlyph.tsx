"use client";

import { motion } from "framer-motion";
import type { PrototypeFlowKey } from "@/components/cinema/goldPrototype/GoldPrototypeScene";

type Props = {
  type: PrototypeFlowKey;
  active?: boolean;
};

const glyphMap: Record<PrototypeFlowKey, { text: string; tone: string; shape: "coin" | "doc" | "sheet" | "chart" | "backtest" | "summary" | "ai" | "course" }> = {
  overview: { text: "AU", tone: "yellow", shape: "coin" },
  framework: { text: "FW", tone: "blue", shape: "doc" },
  excel: { text: "XL", tone: "emerald", shape: "sheet" },
  dashboard: { text: "DB", tone: "blue", shape: "chart" },
  past: { text: "IN", tone: "slate", shape: "backtest" },
  future: { text: "OUT", tone: "yellow", shape: "backtest" },
  summary: { text: "SUM", tone: "violet", shape: "summary" },
  aiLog: { text: "AI", tone: "emerald", shape: "ai" },
  spring2025: { text: "25", tone: "yellow", shape: "course" }
};

function color(tone: string) {
  if (tone === "yellow") return "text-yellow-500";
  if (tone === "blue") return "text-blue-600";
  if (tone === "emerald") return "text-emerald-500";
  if (tone === "violet") return "text-violet-500";
  return "text-slate-700";
}

export default function PrototypeMiniGlyph({ type, active = false }: Props) {
  const glyph = glyphMap[type];

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:12px_12px] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(37,99,235,0.14),transparent_38%),radial-gradient(circle_at_72%_62%,rgba(250,204,21,0.16),transparent_35%)]" />

      {glyph.shape === "coin" && (
        <motion.div
          className="absolute inset-2 rounded-full border border-yellow-400/45 bg-yellow-300/10"
          animate={{ rotate: active ? [0, 8, 0] : [0, 3, 0], scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        />
      )}

      {glyph.shape === "sheet" && (
        <div className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.span
              key={i}
              className="rounded-[2px] bg-emerald-500/75"
              animate={{ opacity: active ? [0.35, 1, 0.45] : [0.3, 0.65, 0.35] }}
              transition={{ repeat: Infinity, duration: 1.3, delay: i * 0.04 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "chart" && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-1">
          {[16, 26, 20, 32, 22].map((h, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-blue-600/75"
              animate={{ height: active ? [h * 0.55, h, h * 0.75] : [h * 0.5, h * 0.72, h * 0.55] }}
              transition={{ repeat: Infinity, duration: 1.3, delay: i * 0.08 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "backtest" && (
        <motion.div
          className="absolute left-2 right-2 top-1/2 h-[3px] rounded-full bg-slate-500/45"
          animate={{ x: active ? [-3, 3, -3] : [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

      {(glyph.shape === "doc" || glyph.shape === "summary" || glyph.shape === "course") && (
        <motion.div
          className="absolute inset-3 rounded-lg border border-blue-400/35 bg-blue-400/10"
          animate={{ scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        />
      )}

      {glyph.shape === "ai" && (
        <motion.div
          className="absolute inset-2 rounded-full border border-emerald-400/35 bg-emerald-400/10"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
      )}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: active ? [0, -1, 0] : [0, -0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className={["font-black leading-none", glyph.text.length > 2 ? "text-[12px]" : "text-[22px]", color(glyph.tone)].join(" ")}>
          {glyph.text}
        </span>
      </motion.div>
    </div>
  );
}