"use client";

import { motion } from "framer-motion";
import type { SkillClusterKey } from "@/components/cinema/skills/SkillsScene";

export type SkillBubble = {
  key: string;
  cluster: SkillClusterKey;
  name: string;
  short: string;
  color: string;
  size: number;
  x: number;
  y: number;
  proof: string;
  projects: string[];
};

type Props = {
  skills: SkillBubble[];
  activeSkill: SkillBubble;
  setActiveSkill: (skill: SkillBubble) => void;
  setActiveCluster: (cluster: SkillClusterKey) => void;
};

export default function SkillsWatchGrid({ skills, activeSkill, setActiveSkill, setActiveCluster }: Props) {
  return (
    <div className="relative mx-auto h-[620px] w-full max-w-[620px] rounded-[3rem] border border-slate-200 bg-slate-950 p-6 shadow-2xl shadow-slate-300/70">
      <div className="absolute inset-0 overflow-hidden rounded-[3rem] bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_70%_70%,rgba(250,204,21,0.13),transparent_26%)]" />

      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03]" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="absolute left-1/2 top-1/2 h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 shadow-xl shadow-blue-500/20">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-slate-900 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
          Core
        </div>
      </div>

      {skills.map((skill, index) => {
        const selected = activeSkill.key === skill.key;

        return (
          <motion.button
            key={skill.key}
            onPointerEnter={() => {
              setActiveSkill(skill);
              setActiveCluster(skill.cluster);
            }}
            onClick={() => {
              setActiveSkill(skill);
              setActiveCluster(skill.cluster);
            }}
            className="absolute rounded-full border text-white shadow-xl outline-none"
            style={{
              left: `calc(50% + ${skill.x}px)`,
              top: `calc(50% + ${skill.y}px)`,
              width: skill.size,
              height: skill.size,
              marginLeft: -skill.size / 2,
              marginTop: -skill.size / 2,
              borderColor: selected ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.16)",
              background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9), ${skill.color} 28%, rgba(15,23,42,0.92) 100%)`
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: 1,
              scale: selected ? 1.18 : 1,
              y: selected ? -4 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: index * 0.02
            }}
            whileHover={{ scale: selected ? 1.22 : 1.12 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: selected
                  ? [`0 0 0 0 ${skill.color}66`, `0 0 0 16px ${skill.color}00`]
                  : [`0 0 0 0 ${skill.color}22`, `0 0 0 8px ${skill.color}00`]
              }}
              transition={{ repeat: Infinity, duration: selected ? 1.2 : 2.2 }}
            />

            <span className="relative z-10 flex h-full w-full items-center justify-center text-center text-[11px] font-black uppercase tracking-[0.08em]">
              {skill.short}
            </span>
          </motion.button>
        );
      })}

      <motion.div
        key={activeSkill.key}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-yellow-200">
              Active Skill
            </p>
            <h3 className="mt-1 text-2xl font-black">{activeSkill.name}</h3>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            {activeSkill.cluster}
          </span>
        </div>

        <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">
          {activeSkill.proof}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {activeSkill.projects.map((project) => (
            <span
              key={project}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-black text-white"
            >
              {project}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}