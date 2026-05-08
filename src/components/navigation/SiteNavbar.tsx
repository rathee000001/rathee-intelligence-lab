"use client";

import Link from "next/link";

type ProjectStatus = "built" | "progress";

type ProjectLink = {
  label: string;
  href: string;
  desc: string;
  status: ProjectStatus;
};

const forecastingProjects: ProjectLink[] = [
  {
    label: "Gold Nexus Alpha",
    href: "/projects/gold-nexus-alpha",
    desc: "Deep ML, SQL, RAG, AI forecasting",
    status: "progress"
  },
  {
    label: "Gold AI Platform",
    href: "/projects/gold-ai-platform",
    desc: "Regression intelligence system",
    status: "built"
  },
  {
    label: "Gold Forecasting Model",
    href: "/projects/gold-forecasting-model",
    desc: "Version 1 forecasting prototype",
    status: "built"
  }
];

const analyticsProjects: ProjectLink[] = [
  {
    label: "DataCo Tableau",
    href: "/projects/dataco-tableau",
    desc: "Supply chain Tableau story",
    status: "built"
  },
  {
    label: "SEC 10-K Analysis",
    href: "/projects/sec-10k-financial-analysis",
    desc: "Financial analysis model",
    status: "built"
  },
  {
    label: "Meta Case Analysis",
    href: "/projects/meta-case-analysis",
    desc: "Strategic management case",
    status: "built"
  }
];

const marketingProjects: ProjectLink[] = [
  {
    label: "Chapters 4 Change",
    href: "/projects/chapters-4-change",
    desc: "Nonprofit story website",
    status: "built"
  },
  {
    label: "The Book Fairies",
    href: "/projects/the-book-fairies",
    desc: "Fundraiser campaign UX",
    status: "built"
  }
];

const projectGroups = [
  {
    title: "Forecasting Platforms",
    items: forecastingProjects
  },
  {
    title: "Analytics and Business Evidence",
    items: analyticsProjects
  },
  {
    title: "Marketing and Web Campaigns",
    items: marketingProjects
  }
];

function StatusDot({ status }: { status: ProjectStatus }) {
  if (status === "built") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.75)]" />
        Built
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-rose-700">
      <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.75)]" />
      In Progress
    </span>
  );
}

export default function SiteNavbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 pointer-events-none">
      <nav className="relative h-24 w-full px-3">
        <Link
          href="/"
          className="pointer-events-auto absolute left-2 top-4 rounded-full border border-yellow-300/45 bg-slate-950/86 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.24em] text-yellow-200 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition hover:bg-slate-900/95 md:left-3 lg:left-4"
        >
          Rathee Intelligence Lab
        </Link>

        <div className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/50 bg-white/76 px-3 py-2 text-sm font-black shadow-xl shadow-slate-200/60 backdrop-blur-xl">
          <div className="group relative">
            <button className="rounded-full px-4 py-3 text-slate-950 transition hover:bg-slate-950 hover:text-white">
              Projects
            </button>

            <div className="pointer-events-none absolute right-0 top-full w-[720px] translate-y-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-[2rem] border border-slate-200 bg-white/96 p-5 shadow-2xl shadow-slate-300/60 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-blue-600">
                      Project Navigator
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      Grouped by portfolio category and build status.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Built
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-rose-700">
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      In Progress
                    </span>
                  </div>
                </div>

                <div className="grid gap-4">
                  {projectGroups.map((group) => (
                    <div key={group.title}>
                      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                        {group.title}
                      </p>

                      <div className="grid gap-2 md:grid-cols-2">
                        {group.items.map((project) => (
                          <Link
                            key={project.href}
                            href={project.href}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-black text-slate-950">{project.label}</p>
                                <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-500">
                                  {project.desc}
                                </p>
                              </div>
                              <StatusDot status={project.status} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/experience" className="rounded-full px-4 py-3 text-slate-950 transition hover:bg-slate-950 hover:text-white">
            Experience
          </Link>
          <Link href="/timeline" className="rounded-full px-4 py-3 text-slate-950 transition hover:bg-slate-950 hover:text-white">
            Timeline
          </Link>
          <Link href="/skills" className="rounded-full px-4 py-3 text-slate-950 transition hover:bg-slate-950 hover:text-white">
            Skills
          </Link>
          <Link href="/portfolio-ai" className="rounded-full px-4 py-3 text-slate-950 transition hover:bg-slate-950 hover:text-white">
            Portfolio AI
          </Link>
          <Link href="/resume" className="rounded-full px-4 py-3 text-slate-950 transition hover:bg-slate-950 hover:text-white">
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}