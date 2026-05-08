"use client";

import { motion } from "framer-motion";
import type { MetaFlowKey } from "@/components/cinema/metaCase/MetaCaseScene";

type Props = {
  type: MetaFlowKey;
  active?: boolean;
};

const glyphMap: Record<MetaFlowKey, { text: string; tone: string; shape: "network" | "leader" | "culture" | "ethics" | "risk" | "people" | "issue" | "bars" | "doc" | "slides" }> = {
  context: { text: "META", tone: "blue", shape: "network" },
  leadership: { text: "LDR", tone: "violet", shape: "leader" },
  culture: { text: "CUL", tone: "emerald", shape: "culture" },
  ethics: { text: "ETH", tone: "yellow", shape: "ethics" },
  privacy: { text: "PV", tone: "cyan", shape: "risk" },
  regulation: { text: "REG", tone: "rose", shape: "risk" },
  stakeholders: { text: "STK", tone: "emerald", shape: "people" },
  problem: { text: "ISS", tone: "rose", shape: "issue" },
  recommendations: { text: "REC", tone: "emerald", shape: "bars" },
  report: { text: "REP", tone: "blue", shape: "doc" },
  presentation: { text: "PPT", tone: "yellow", shape: "slides" }
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

export default function MetaCaseMiniGlyph({ type, active = false }: Props) {
  const glyph = glyphMap[type];

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:12px_12px] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(37,99,235,0.14),transparent_38%),radial-gradient(circle_at_72%_62%,rgba(124,58,237,0.12),transparent_35%)]" />

      {glyph.shape === "network" && (
        <div className="absolute inset-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute h-2.5 w-2.5 rounded-full bg-blue-600/75"
              style={{ left: 6 + (i % 2) * 22, top: 8 + Math.floor(i / 2) * 18 }}
              animate={{ scale: active ? [1, 1.28, 1] : [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.12 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "leader" && (
        <motion.div
          className="absolute inset-3 rounded-full border border-violet-400/40 bg-violet-400/10"
          animate={{ scale: active ? [1, 1.08, 1] : [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
      )}

      {glyph.shape === "culture" && (
        <div className="absolute inset-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-emerald-500/75"
              style={{ left: 5 + (i % 3) * 13, top: 8 + Math.floor(i / 3) * 17 }}
              animate={{ scale: active ? [1, 1.25, 1] : [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.35, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "ethics" && (
        <motion.div
          className="absolute inset-2 rounded-full border border-yellow-400/40 bg-yellow-300/10"
          animate={{ rotate: active ? [0, 8, 0] : [0, 3, 0], scale: active ? [1, 1.06, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        />
      )}

      {glyph.shape === "risk" && (
        <motion.div
          className="absolute left-1/2 top-3 h-0 w-0 -translate-x-1/2 border-l-[20px] border-r-[20px] border-b-[34px] border-l-transparent border-r-transparent border-b-rose-300/35"
          animate={{ scale: active ? [1, 1.06, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        />
      )}

      {glyph.shape === "people" && (
        <div className="absolute inset-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute h-2.5 w-2.5 rounded-full bg-emerald-500/75"
              style={{ left: 8 + (i % 2) * 20, top: 7 + Math.floor(i / 2) * 18 }}
              animate={{ scale: active ? [1, 1.28, 1] : [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.12 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "issue" && (
        <motion.div
          className="absolute inset-3 rounded-lg border border-rose-400/40 bg-rose-400/10"
          animate={{ rotate: active ? [-3, 3, -3] : [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
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

      {(glyph.shape === "doc" || glyph.shape === "slides") && (
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