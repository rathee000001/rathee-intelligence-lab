"use client";

import { motion } from "framer-motion";
import type { ChaptersFlowKey } from "@/components/cinema/chapters/ChaptersScene";

type Props = {
  type: ChaptersFlowKey;
  active?: boolean;
};

const glyphMap: Record<ChaptersFlowKey, { text: string; tone: string; shape: "book" | "story" | "people" | "target" | "spark" | "funnel" | "megaphone" | "heart" | "network" | "cta" }> = {
  mission: { text: "M", tone: "yellow", shape: "book" },
  story: { text: "ST", tone: "blue", shape: "story" },
  past: { text: "PF", tone: "slate", shape: "book" },
  segmentation: { text: "SEG", tone: "blue", shape: "people" },
  target: { text: "T", tone: "emerald", shape: "target" },
  positioning: { text: "POS", tone: "yellow", shape: "spark" },
  usp: { text: "USP", tone: "violet", shape: "spark" },
  fundraiser: { text: "FR", tone: "emerald", shape: "funnel" },
  marketing: { text: "MK", tone: "blue", shape: "megaphone" },
  appeal: { text: "A", tone: "rose", shape: "heart" },
  integration: { text: "INT", tone: "cyan", shape: "network" },
  cta: { text: "CTA", tone: "emerald", shape: "cta" },
  thankyou: { text: "TY", tone: "yellow", shape: "heart" }
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

export default function ChaptersMiniGlyph({ type, active = false }: Props) {
  const glyph = glyphMap[type];

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:12px_12px] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(37,99,235,0.14),transparent_38%),radial-gradient(circle_at_72%_62%,rgba(22,163,74,0.14),transparent_35%)]" />

      {glyph.shape === "book" && (
        <motion.div
          className="absolute inset-x-3 inset-y-2 rounded-lg border border-yellow-400/45 bg-yellow-300/10"
          animate={{ rotateY: active ? [0, 12, 0] : [0, 4, 0], scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        />
      )}

      {glyph.shape === "story" && (
        <div className="absolute left-3 right-3 top-3 space-y-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="block h-[3px] rounded-full bg-blue-600/65"
              animate={{ width: active ? ["45%", "100%", "60%"] : ["45%", "75%", "55%"] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.08 }}
            />
          ))}
        </div>
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

      {glyph.shape === "target" && (
        <motion.div
          className="absolute inset-2 rounded-full border border-emerald-400/45 bg-emerald-400/10"
          animate={{ scale: active ? [1, 1.06, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <div className="absolute inset-3 rounded-full border border-emerald-400/50" />
        </motion.div>
      )}

      {glyph.shape === "spark" && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/35 bg-yellow-400/10"
          animate={{ rotate: 360, scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
        />
      )}

      {glyph.shape === "funnel" && (
        <motion.div
          className="absolute left-1/2 top-3 h-0 w-0 -translate-x-1/2 border-l-[20px] border-r-[20px] border-t-[34px] border-l-transparent border-r-transparent border-t-emerald-300/35"
          animate={{ scale: active ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        />
      )}

      {glyph.shape === "megaphone" && (
        <div className="absolute left-3 top-5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute h-[3px] rounded-full bg-blue-600/70"
              style={{ width: 18 + i * 8, top: i * 7 }}
              animate={{ x: active ? [0, 5, 0] : [0, 2, 0], opacity: [0.4, 1, 0.45] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "heart" && (
        <motion.div
          className="absolute inset-3 rounded-full border border-rose-400/35 bg-rose-400/10"
          animate={{ scale: active ? [1, 1.12, 1] : [1, 1.035, 1] }}
          transition={{ repeat: Infinity, duration: 1.1 }}
        />
      )}

      {glyph.shape === "network" && (
        <div className="absolute inset-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute h-2.5 w-2.5 rounded-full bg-cyan-500/75"
              style={{ left: 5 + i * 14, top: i % 2 === 0 ? 10 : 26 }}
              animate={{ scale: active ? [1, 1.25, 1] : [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.14 }}
            />
          ))}
        </div>
      )}

      {glyph.shape === "cta" && (
        <motion.div
          className="absolute inset-2 rounded-full border border-emerald-400/45 bg-emerald-400/10"
          animate={{ scale: active ? [1, 1.08, 1] : [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 1.25 }}
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