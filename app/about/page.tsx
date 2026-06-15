"use client";

import Link from "next/link";
import {
  Github,
  ExternalLink,
  Code2,
  Cpu,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Zap,
} from "lucide-react";
import { siteConfig, projects } from "@/lib/data";
import { TypewriterText } from "@/components/TypewriterText";

const timeline = [
  {
    emoji: "🚀",
    title: "The Inception of TechBro Labs",
    description:
      "Created TechBro Labs to bridge the gap between theoretical academic knowledge and practical software engineering. We wanted a place to build real things.",
  },
  {
    emoji: "🔬",
    title: "First ML Projects",
    description:
      "Started building real machine learning projects — not just running tutorials, but designing systems from scratch. FutureNest was our first end-to-end ML pipeline.",
  },
  {
    emoji: "👁️",
    title: "Computer Vision & IoT",
    description:
      "Explored computer vision by building Reviva — a real-time yawn detection system using YOLOv8 and IoT hardware. Combining AI with physical hardware was a major milestone.",
  },
  {
    emoji: "🤖",
    title: "AI Automation & Bots",
    description:
      "Built LifeTracker Bot using n8n and Telegram — an AI-powered productivity tracking system that processes natural language input and stores data in Google Sheets.",
  },
  {
    emoji: "📊",
    title: "NLP & Forecasting",
    description:
      "Explored NLP by building Dream Analyzer, and time-series forecasting through the Pharmacy Sales Forecast dashboard with Prophet and XGBoost.",
  },
  {
    emoji: "🤝",
    title: "Helping Students Build",
    description:
      "Transitioned into a collaborative studio helping students and developers build their projects. We guide them from idea generation to the final working solution.",
  },
];

const values = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Curiosity Driven",
    description: "Every project starts with a question. We build things because we genuinely want to understand how they work.",
    color: "from-yellow-500 to-orange-400",
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Learning by Building",
    description: "Reading about ML is interesting. Building with ML is where real learning happens. GitHub is our notebook.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Real Systems",
    description: "We focus on building things that actually work — not just demos or prototypes, but functional systems.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Continuous Mentorship",
    description: "Technology evolves fast. Our approach is to stay curious, keep building, and share our knowledge with those we help.",
    color: "from-emerald-500 to-teal-400",
  },
];

export default function AboutPage() {
  const projectCount = projects.length;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="orb w-[500px] h-[500px] bg-accent top-[-100px] right-[-100px] opacity-10" />
        <div className="orb w-[400px] h-[400px] bg-accent-secondary bottom-0 left-0 opacity-8" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">About TechBro Labs</p>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                We are <TypewriterText texts={["builders", "learners", "developers", "engineers"]} />
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                TechBro Labs is a project development studio focused on AI, ML, Data Science, and modern Web Development.
                We help students and creators build practical, functioning software systems from the ground up.
              </p>
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                We don&apos;t just deliver code; we believe in a transparent, collaborative process. Our goal is to ensure you understand 
                the technologies behind your project, whether it&apos;s a final year submission or a personal startup idea.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Github className="w-4 h-4" />
                  Our GitHub
                </a>
                <Link href="/contact" className="btn-secondary">
                  Request a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Identity card */}
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card rounded-3xl p-8 w-full max-w-sm">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-3xl mb-6 mx-auto">
                  ⚡
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-white">TechBro Labs</h2>
                  <p className="text-accent text-sm font-medium mt-1">Project Development Studio</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="status-dot" />
                    <span className="text-xs text-emerald-400">Accepting New Projects</span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-text-secondary">Focus</span>
                    <span className="text-white font-medium">AI/ML & Data Science</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-text-secondary">Projects Built</span>
                    <span className="text-white font-medium">{projectCount}+ on GitHub</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06]">
                    <span className="text-text-secondary">Mission</span>
                    <span className="text-white font-medium">Student Success</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-text-secondary">Contact</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-accent font-medium hover:text-white transition-colors text-xs"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                  <a
                    href={siteConfig.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-surface/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Our Approach</p>
            <h2 className="text-4xl font-extrabold text-white">
              What we believe in
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card rounded-2xl p-6 hover:border-accent/20 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Journey</p>
            <h2 className="text-4xl font-extrabold text-white">
              Our <span className="gradient-text">timeline</span>
            </h2>
            <p className="text-text-secondary mt-3 max-w-lg mx-auto">
              How TechBro Labs evolved from personal exploration to a studio helping others build.
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent-secondary/30 to-transparent" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  {/* Node */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-surface border border-white/[0.08] flex items-center justify-center text-xl z-10 relative group-hover:border-accent/30 transition-colors duration-200">
                      {item.emoji}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass-card rounded-xl p-5 flex-1 group-hover:border-accent/20 transition-all duration-200">
                    <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts - honest section */}
      <section className="section-pad bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Honest Overview</p>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Transparency above all else
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm">
                We believe in authenticity. We don&apos;t use fake testimonials, inflated ratings, or pretend to be a massive corporate agency. 
                We are a dedicated team that knows how to build software, and we prove it through our verifiable GitHub repositories and clear documentation.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Focus", value: "Student Project Development" },
                { label: "Portfolio", value: `${projectCount}+ real GitHub repositories` },
                { label: "Specialty", value: "Python, ML, Computer Vision, NLP" },
                { label: "Goal", value: "Help you succeed and understand your code" },
                { label: "Contact", value: siteConfig.email },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-start gap-4 py-3 border-b border-white/[0.06] last:border-0"
                >
                  <span className="text-text-secondary text-sm w-24 flex-shrink-0">{fact.label}</span>
                  <span className="text-white text-sm font-medium">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-3xl p-10 max-w-2xl mx-auto">
            <Zap className="w-10 h-10 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white mb-3">Let&apos;s build something together</h2>
            <p className="text-text-secondary text-sm mb-6">
              Whether it&apos;s an ML project, a student assignment, or just a conversation about technology —
              we&apos;re always happy to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-3.5">
                Request a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary px-8 py-3.5">
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
