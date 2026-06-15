"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  Eye,
  Brain,
  Home,
  BarChart2,
  Bot,
  ArrowRight,
  Filter,
} from "lucide-react";
import { projects } from "@/lib/data";
import type { Metadata } from "next";
import { TypewriterText } from "@/components/TypewriterText";

const iconMap: Record<string, React.ReactNode> = {
  eye: <Eye className="w-6 h-6" />,
  brain: <Brain className="w-6 h-6" />,
  home: <Home className="w-6 h-6" />,
  "bar-chart": <BarChart2 className="w-6 h-6" />,
  bot: <Bot className="w-6 h-6" />,
};

const categories = ["All", "AI / Computer Vision / IoT", "AI / Automation / Productivity", "Machine Learning / Data Science", "NLP / AI / Web App", "Data Science / Forecasting"];

function ProjectDetailCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="project-card glass-card rounded-2xl overflow-hidden group">
      {/* Color header bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`} />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <span className="text-white">{iconMap[project.icon]}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {project.featured && (
                  <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                )}
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-text-secondary text-[10px] font-medium rounded-full">
                  {project.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
              <p className="text-text-secondary text-sm mt-0.5">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {project.longDescription}
        </p>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Key Features</h4>
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 group/link"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Github className="w-4 h-4" />
            View on GitHub
          </div>
          <div className="flex items-center gap-1 text-accent text-xs">
            <ExternalLink className="w-3.5 h-3.5" />
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => p.category === filter);

  // Short category labels for filter buttons
  const shortLabels: Record<string, string> = {
    "All": "All",
    "AI / Computer Vision / IoT": "Computer Vision",
    "AI / Automation / Productivity": "Automation",
    "Machine Learning / Data Science": "ML / Data Science",
    "NLP / AI / Web App": "NLP",
    "Data Science / Forecasting": "Forecasting",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="orb w-[400px] h-[400px] bg-accent top-0 right-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">My Work</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              Projects &amp;{" "}
              <TypewriterText texts={["Repositories", "Working Software", "Implementations", "Code"]} />
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              Every project here has a real GitHub repository. Built from scratch, pushed publicly,
              and documented honestly. Click any project to explore the code.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-text-secondary flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  filter === cat
                    ? "bg-accent text-white border-accent shadow-glow-blue"
                    : "bg-white/[0.04] text-text-secondary border-white/10 hover:border-accent/30 hover:text-white"
                }`}
              >
                {shortLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((project) => (
              <ProjectDetailCard key={project.id} project={project} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-text-secondary">
              No projects found for this filter.
            </div>
          )}

          {/* GitHub CTA */}
          <div className="mt-14 glass-card rounded-2xl p-8 text-center">
            <Github className="w-8 h-8 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">More on GitHub</h3>
            <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
              These are the highlighted projects. Explore the full profile for all repositories,
              contributions, and activity.
            </p>
            <a
              href="https://github.com/SudharsaaX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex mx-auto"
            >
              <Github className="w-4 h-4" />
              Visit github.com/SudharsaaX
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
