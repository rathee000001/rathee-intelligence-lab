"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import PortfolioAIScene, { type PortfolioAICluster } from "@/components/cinema/portfolioAI/PortfolioAIScene";

type ProjectRecord = {
  name: string;
  href: string;
  category: PortfolioAICluster;
  summary: string;
  skills: string[];
  proof: string[];
};

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  sources?: ProjectRecord[];
};

const projects: ProjectRecord[] = [
  {
    name: "Gold Nexus Alpha",
    href: "/projects/gold-nexus-alpha",
    category: "ai",
    summary: "Flagship forecasting and supply chain intelligence platform with Deep ML views, SQL-style exploration, artifact retrieval, and RAG-style AI planning.",
    skills: ["Forecasting", "Time Series", "Machine Learning", "Deep ML", "SQL", "RAG", "Next.js", "Python"],
    proof: ["Live platform", "GitHub repository", "Deep ML model views", "SQL and artifact AI architecture"]
  },
  {
    name: "Gold AI Platform",
    href: "/projects/gold-ai-platform",
    category: "forecasting",
    summary: "Regression intelligence platform connecting gold price history, macroeconomic data, model logic, and dashboard output.",
    skills: ["Regression", "Forecasting", "Python", "Next.js", "Data Cleaning", "Dashboarding"],
    proof: ["Live deployment", "GitHub repository", "Regression model flow"]
  },
  {
    name: "Gold Forecasting Model",
    href: "/projects/gold-forecasting-model",
    category: "forecasting",
    summary: "Version 1 forecasting prototype with Excel-style model logic, model summary, backtesting, and documentation.",
    skills: ["Excel", "Forecasting", "Backtesting", "Documentation"],
    proof: ["GitHub Pages site", "Repository", "Model summary"]
  },
  {
    name: "DataCo Tableau",
    href: "/projects/dataco-tableau",
    category: "supply",
    summary: "Supply chain Tableau story covering sales, profit, delivery risk, shipping modes, customer segmentation, and interactive filters.",
    skills: ["Tableau", "Supply Chain Analytics", "Dashboard Design", "Operations Analytics", "Customer Segmentation"],
    proof: ["Tableau Public", "Presentation file", "Dashboard story"]
  },
  {
    name: "SEC 10-K Financial Analysis",
    href: "/projects/sec-10k-financial-analysis",
    category: "finance",
    summary: "Financial analysis workflow connecting SEC filing review, spreadsheet modeling, ratios, liquidity, profitability, leverage, trends, report, and presentation.",
    skills: ["Excel", "Financial Analysis", "Accounting", "Ratio Analysis", "Report Writing"],
    proof: ["Spreadsheet", "Report", "Presentation"]
  },
  {
    name: "Chapters 4 Change",
    href: "/projects/chapters-4-change",
    category: "marketing",
    summary: "Strategic nonprofit marketing website for The Book Fairies covering mission, story, segmentation, target market, positioning, USP, fundraiser, appeal, and CTA.",
    skills: ["Marketing Strategy", "Branding", "Segmentation", "Positioning", "Web Design"],
    proof: ["GitHub Pages site", "Repository", "Campaign flow"]
  },
  {
    name: "The Book Fairies",
    href: "/projects/the-book-fairies",
    category: "marketing",
    summary: "Fundraiser campaign UX with donation progress, impact counters, university partners, donation tiers, gallery, popup flow, and contact path.",
    skills: ["Campaign UX", "Fundraising", "Conversion Flow", "HTML", "CSS", "Marketing"],
    proof: ["Live website", "GitHub repository", "Donation tier flow"]
  },
  {
    name: "Meta Case Analysis",
    href: "/projects/meta-case-analysis",
    category: "roles",
    summary: "Strategic management case analysis covering leadership, culture, ethics, privacy, regulation, stakeholders, problem definition, and recommendations.",
    skills: ["Strategic Management", "Leadership", "Ethics", "Stakeholder Analysis", "Presentation"],
    proof: ["Report", "Presentation", "Case flow"]
  }
];

const starterPrompts = [
  "What is the strongest project in this portfolio?",
  "Where did Praveen use SQL?",
  "Which projects prove supply chain analytics?",
  "Show me forecasting and machine learning proof.",
  "Which projects are best for operations analyst roles?",
  "What roles fit this portfolio?",
  "Which projects have live links?",
  "Explain the portfolio in recruiter language."
];

function classifyQuestion(question: string): PortfolioAICluster {
  const q = question.toLowerCase();

  if (q.includes("forecast") || q.includes("gold") || q.includes("time series") || q.includes("regression")) return "forecasting";
  if (q.includes("supply") || q.includes("operations") || q.includes("tableau") || q.includes("delivery") || q.includes("shipping")) return "supply";
  if (q.includes("finance") || q.includes("sec") || q.includes("10-k") || q.includes("ratio") || q.includes("accounting")) return "finance";
  if (q.includes("marketing") || q.includes("campaign") || q.includes("fundraiser") || q.includes("book")) return "marketing";
  if (q.includes("ai") || q.includes("machine learning") || q.includes("rag") || q.includes("sql") || q.includes("deep")) return "ai";
  if (q.includes("role") || q.includes("job") || q.includes("analyst") || q.includes("career")) return "roles";
  if (q.includes("proof") || q.includes("live") || q.includes("github") || q.includes("evidence")) return "evidence";

  return "overview";
}

function getSources(cluster: PortfolioAICluster, question: string): ProjectRecord[] {
  const q = question.toLowerCase();

  if (q.includes("sql") || q.includes("rag") || q.includes("machine learning") || q.includes("deep")) {
    return projects.filter((project) => project.name.includes("Gold Nexus") || project.name.includes("Gold AI"));
  }

  if (q.includes("live") || q.includes("github") || q.includes("evidence")) {
    return projects.filter((project) => project.proof.some((item) => item.toLowerCase().includes("live") || item.toLowerCase().includes("github") || item.toLowerCase().includes("repository"))).slice(0, 5);
  }

  if (cluster === "overview") return [projects[0], projects[3], projects[4], projects[5]];
  if (cluster === "roles") return [projects[0], projects[3], projects[4], projects[7]];

  return projects.filter((project) => project.category === cluster).slice(0, 4);
}

function buildAnswer(question: string): { cluster: PortfolioAICluster; text: string; sources: ProjectRecord[] } {
  const cluster = classifyQuestion(question);
  const sources = getSources(cluster, question);
  const q = question.toLowerCase();

  if (q.includes("strongest") || q.includes("flagship")) {
    return {
      cluster: "ai",
      sources: [projects[0]],
      text:
        "The strongest project is Gold Nexus Alpha because it combines forecasting, Deep ML interpretation, SQL-style exploration, artifact retrieval, and an AI layer into one deployed system. It is the best single proof point for analytics, technical execution, and AI-assisted decision support."
    };
  }

  if (q.includes("sql")) {
    return {
      cluster: "ai",
      sources,
      text:
        "SQL appears strongest in Gold Nexus Alpha. The portfolio positions it as a read-only SQL-style exploration layer for inspecting structured artifacts, model metadata, and project evidence. This is useful for analytics roles because it shows structured data thinking, not only dashboard design."
    };
  }

  if (q.includes("supply") || q.includes("operations")) {
    return {
      cluster: "supply",
      sources,
      text:
        "The strongest supply chain proof is DataCo Tableau, supported by Gold Nexus Alpha's supply chain intelligence positioning. DataCo proves dashboarding, delivery risk analysis, shipping mode comparison, customer segmentation, and operations storytelling."
    };
  }

  if (q.includes("forecast") || q.includes("machine learning") || q.includes("regression")) {
    return {
      cluster: "forecasting",
      sources,
      text:
        "Forecasting is proven through three builds. Gold Forecasting Model shows the foundation, Gold AI Platform shows the regression platform stage, and Gold Nexus Alpha shows the advanced AI and Deep ML interpretation stage. This progression is stronger than a single isolated project."
    };
  }

  if (q.includes("role") || q.includes("job") || q.includes("analyst")) {
    return {
      cluster: "roles",
      sources,
      text:
        "The best-fit roles are Operations Analyst, Supply Chain Analyst, Business Analyst, Data Analyst, Forecasting Analyst, BI Analyst, and Junior Analytics Engineer. The portfolio is strongest for roles that value dashboards, Excel, SQL, Python, Tableau, forecasting, and business communication."
    };
  }

  if (q.includes("live") || q.includes("github") || q.includes("evidence")) {
    return {
      cluster: "evidence",
      sources,
      text:
        "This portfolio is built for verification. Several projects have live websites, GitHub repositories, Tableau Public links, reports, presentations, or spreadsheets. That makes it easier for recruiters to validate the work instead of only reading claims."
    };
  }

  if (q.includes("recruiter")) {
    return {
      cluster: "overview",
      sources,
      text:
        "Recruiter summary: Praveen is an MBA Supply Chain candidate with hands-on analytics execution across forecasting, supply chain dashboards, financial analysis, marketing systems, and AI-assisted web platforms. The strongest signal is the ability to turn academic and business projects into deployed, reviewable systems."
    };
  }

  return {
    cluster,
    sources,
    text:
      "This portfolio is organized around evidence. The main proof areas are forecasting systems, supply chain analytics, financial analysis, nonprofit marketing systems, strategic management, and AI-assisted analytics. Ask about a skill, role, or project area and I will map it to specific project proof."
  };
}

export default function PortfolioAIExperience() {
  const [activeCluster, setActiveCluster] = useState<PortfolioAICluster>("overview");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text:
        "Ask me about Praveen's skills, projects, live proof, GitHub evidence, forecasting work, supply chain analytics, financial analysis, or role fit. I will map answers to project evidence.",
      sources: [projects[0], projects[3], projects[4]]
    }
  ]);

  const activeProjects = useMemo(() => {
    if (activeCluster === "overview") return projects.slice(0, 5);
    if (activeCluster === "evidence") return projects.filter((project) => project.proof.length > 0).slice(0, 5);
    if (activeCluster === "roles") return [projects[0], projects[3], projects[4], projects[7]];
    return projects.filter((project) => project.category === activeCluster).slice(0, 5);
  }, [activeCluster]);

  function ask(question: string) {
    const clean = question.trim();
    if (!clean) return;

    const answer = buildAnswer(clean);
    setActiveCluster(answer.cluster);

    setMessages((current) => [
      ...current,
      { role: "user", text: clean },
      { role: "assistant", text: answer.text, sources: answer.sources }
    ]);

    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <PortfolioAIScene activeKey={activeCluster} />

      <div className="relative z-30">
        <SiteNavbar />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-10 px-6 pb-12 pt-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/85 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-yellow-200">
              AI
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Portfolio AI
              </p>
              <p className="text-sm font-black text-slate-950">
                Recruiter-facing project assistant
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.34em] text-blue-600">
            Ask | Verify | Map skills to projects
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-slate-950 md:text-8xl">
            Ask the portfolio what proves the skill.
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-600">
            A guided AI-style layer for recruiters and professors. It maps questions to project evidence,
            live links, GitHub proof, dashboards, reports, spreadsheets, and role fit.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#portfolio-ai-chat"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:bg-blue-500"
            >
              Open Portfolio AI
            </a>
            <Link
              href="/skills"
              className="rounded-full border border-yellow-300 bg-yellow-100 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-yellow-100 transition hover:bg-yellow-200"
            >
              Skills Map
            </Link>
            <Link
              href="/timeline"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200 transition hover:bg-slate-50"
            >
              Timeline
            </Link>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="portfolio-ai-chat" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white/86 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[2.5rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300/60">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-200">
                    Portfolio AI
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Evidence assistant</h2>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-200">
                  Local proof mode
                </span>
              </div>

              <div className="mt-5 h-[520px] space-y-4 overflow-y-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={message.role === "user" ? "ml-auto max-w-[82%]" : "mr-auto max-w-[92%]"}
                  >
                    <div
                      className={[
                        "rounded-[1.5rem] p-4 text-sm font-semibold leading-7",
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "border border-white/10 bg-white/10 text-slate-100"
                      ].join(" ")}
                    >
                      {message.text}
                    </div>

                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 grid gap-2">
                        {message.sources.map((source) => (
                          <Link
                            key={`${index}-${source.href}`}
                            href={source.href}
                            className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-left transition hover:bg-white/10"
                          >
                            <p className="text-sm font-black text-white">{source.name}</p>
                            <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-300">
                              {source.summary}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about skills, projects, SQL, forecasting, Tableau, roles..."
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-400 focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="rounded-full bg-yellow-300 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-yellow-200"
                >
                  Ask
                </button>
              </form>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-blue-600">
                Try questions
              </p>

              <div className="mt-5 grid gap-3">
                {starterPrompts.map((prompt) => (
                  <motion.button
                    key={prompt}
                    onClick={() => ask(prompt)}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="rounded-[1.5rem] border border-slate-200 bg-white p-4 text-left text-sm font-black text-slate-950 shadow-lg shadow-slate-200/70 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>

              <motion.div
                key={activeCluster}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-6 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <p className="text-xs font-black uppercase tracking-[0.26em] text-blue-600">
                  Active evidence cluster
                </p>
                <h3 className="mt-2 text-3xl font-black capitalize text-slate-950">
                  {activeCluster}
                </h3>

                <div className="mt-5 grid gap-3">
                  {activeProjects.map((project) => (
                    <Link
                      key={project.href}
                      href={project.href}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      <p className="text-base font-black text-slate-950">{project.name}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                        {project.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-blue-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/50">
            <div className="grid gap-8 lg:grid-cols-[0.66fr_1.34fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
                  Future Upgrade
                </p>
                <h2 className="mt-4 text-4xl font-black">
                  This is ready for a real RAG backend later.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Connect PDFs and screenshots",
                  "Index GitHub repositories",
                  "Attach resume and LinkedIn data",
                  "Use artifact-grounded answers",
                  "Return source links with every answer",
                  "Keep recruiter answers short and verifiable"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-sm font-black text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects/gold-nexus-alpha"
                className="rounded-full bg-yellow-300 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-200"
              >
                Flagship AI Project
              </Link>
              <Link
                href="/skills"
                className="rounded-full border border-blue-300/25 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:bg-blue-500/20"
              >
                Skill Map
              </Link>
              <Link
                href="/timeline"
                className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-500/20"
              >
                Timeline
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}