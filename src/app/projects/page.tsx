import Link from "next/link";
import { getProjects } from "@/lib/portfolio";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">
          ? Home
        </Link>

        <div className="mt-10">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-200">
            Project Universe
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
            Live platforms and artifact-backed case studies.
          </h1>
          <p className="mt-5 max-w-3xl text-slate-400">
            Flagship systems get full cinematic project worlds. Earlier academic work becomes
            live through embedded reports, dashboards, spreadsheets, presentations, and evidence links.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/[0.1]"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-yellow-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-200">
                  {project.projectType}
                </span>
                <span className="rounded-full bg-blue-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                  {project.semester}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-black">{project.shortTitle}</h2>
              <p className="mt-2 text-sm font-bold text-blue-200">{project.subtitle}</p>
              <p className="mt-5 text-sm leading-7 text-slate-300">{project.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
