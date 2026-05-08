"use client";

import { motion } from "framer-motion";

export type GoldGlyphKey =
  | "data"
  | "alpha"
  | "beta"
  | "delta"
  | "epsilon"
  | "gamma"
  | "omega"
  | "final"
  | "ai"
  | "sql"
  | "rag";

type Props = {
  type: GoldGlyphKey;
  active?: boolean;
};

const glyphMap = {
  data: { text: "▦", tone: "blue", shape: "grid" },
  alpha: { text: "α", tone: "yellow", shape: "circle" },
  beta: { text: "β", tone: "blue", shape: "circle" },
  delta: { text: "Δ", tone: "cyan", shape: "triangle" },
  epsilon: { text: "ε", tone: "violet", shape: "pill" },
  gamma: { text: "γ", tone: "yellow", shape: "circle" },
  omega: { text: "Ω", tone: "blue", shape: "orbit" },
  final: { text: "✓", tone: "emerald", shape: "circle" },
  ai: { text: "AI", tone: "slate", shape: "pill" },
  sql: { text: "SQL", tone: "blue", shape: "pill" },
  rag: { text: "RAG", tone: "yellow", shape: "pill" }
} as const;

function toneClasses(tone: string, active: boolean) {
  if (tone === "yellow") {
    return active
      ? "text-yellow-300 border-yellow-300/60 bg-yellow-300/15"
      : "text-yellow-500 border-yellow-300/25 bg-yellow-300/5";
  }

  if (tone === "blue") {
    return active
      ? "text-blue-300 border-blue-400/60 bg-blue-400/15"
      : "text-blue-500 border-blue-300/25 bg-blue-300/5";
  }

  if (tone === "cyan") {
    return active
      ? "text-cyan-300 border-cyan-300/60 bg-cyan-300/15"
      : "text-cyan-500 border-cyan-300/25 bg-cyan-300/5";
  }

  if (tone === "violet") {
    return active
      ? "text-violet-300 border-violet-300/60 bg-violet-300/15"
      : "text-violet-500 border-violet-300/25 bg-violet-300/5";
  }

  if (tone === "emerald") {
    return active
      ? "text-emerald-300 border-emerald-300/60 bg-emerald-300/15"
      : "text-emerald-500 border-emerald-300/25 bg-emerald-300/5";
  }

  return active
    ? "text-slate-100 border-slate-400/60 bg-slate-400/15"
    : "text-slate-500 border-slate-300/25 bg-slate-300/5";
}

function textColor(tone: string) {
  if (tone === "yellow") return "text-yellow-500";
  if (tone === "blue") return "text-blue-500";
  if (tone === "cyan") return "text-cyan-500";
  if (tone === "violet") return "text-violet-500";
  if (tone === "emerald") return "text-emerald-500";
  return "text-slate-600";
}

export default function GoldMiniGlyph({ type, active = false }: Props) {
  const glyph = glyphMap[type];
  const tone = toneClasses(glyph.tone, active);

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:12px_12px] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.16),transparent_38%),radial-gradient(circle_at_72%_62%,rgba(250,204,21,0.16),transparent_35%)]" />

      <motion.span
        className="absolute left-2 top-2 h-2 w-2 rounded-full bg-yellow-400/90"
        animate={{ y: [0, 3, 0], opacity: [0.5, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />

      <motion.span
        className="absolute right-2 top-4 h-1.5 w-1.5 rounded-full bg-blue-400/90"
        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      />

      <motion.span
        className="absolute bottom-2 left-4 h-1.5 w-1.5 rounded-full bg-yellow-300/90"
        animate={{ x: [0, 2, 0], opacity: [0.4, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
      />

      {(glyph.shape === "circle" || glyph.shape === "orbit") && (
        <motion.div
          className={`absolute inset-2 rounded-full border ${tone}`}
          animate={{ scale: active ? [1, 1.04, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: active ? 1.4 : 2.2 }}
        />
      )}

      {glyph.shape === "triangle" && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-l-[22px] border-r-[22px] border-b-[38px] border-l-transparent border-r-transparent border-b-cyan-200/35"
          animate={{ scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      )}

      {glyph.shape === "pill" && (
        <motion.div
          className={`absolute inset-x-1.5 inset-y-3 rounded-full border ${tone}`}
          animate={{ scale: active ? [1, 1.04, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      )}

      {glyph.shape === "grid" && (
        <div className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.span
              key={i}
              className="rounded-[2px] bg-blue-600/75"
              animate={{ opacity: active ? [0.35, 1, 0.45] : [0.3, 0.7, 0.35] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.05 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "orbit" && (
        <motion.div
          className="absolute inset-1 rounded-full border border-yellow-300/25"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
      )}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: active ? [0, -1, 0] : [0, -0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span
          className={[
            "font-black leading-none",
            type === "ai" || type === "sql" || type === "rag" ? "text-[13px]" : "text-[28px]",
            textColor(glyph.tone)
          ].join(" ")}
        >
          {glyph.text}
        </span>
      </motion.div>
    </div>
  );
}