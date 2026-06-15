"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, Code2, Brain, BarChart2, Globe, Wrench, Cpu } from "lucide-react";
import { skills } from "@/lib/data";
import { TypewriterText } from "@/components/TypewriterText";

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Code2 className="w-5 h-5" />,
  "Machine Learning & AI": <Brain className="w-5 h-5" />,
  "Data Science": <BarChart2 className="w-5 h-5" />,
  "Web & App Development": <Globe className="w-5 h-5" />,
  "Tools & Platforms": <Wrench className="w-5 h-5" />,
  "IoT & Hardware": <Cpu className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Programming Languages": "from-blue-500 to-cyan-400",
  "Machine Learning & AI": "from-purple-500 to-pink-500",
  "Data Science": "from-emerald-500 to-teal-400",
  "Web & App Development": "from-orange-500 to-amber-400",
  "Tools & Platforms": "from-indigo-500 to-violet-400",
  "IoT & Hardware": "from-red-500 to-rose-400",
};

function SkillBar({ skill, inView }: { skill: { name: string; level: number }; inView: boolean }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <span className="text-sm text-white font-medium">{skill.name}</span>
        </div>
        <span className="text-xs text-text-secondary font-mono">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill transition-all duration-1000 ease-out"
          style={{ width: inView ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, skillList }: { category: string; skillList: { name: string; level: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const color = categoryColors[category] || "from-accent to-accent-secondary";
  const icon = categoryIcons[category];

  return (
    <div ref={ref} className="glass-card rounded-2xl overflow-hidden hover:border-accent/20 transition-all duration-300 group">
      {/* Header */}
      <div className={`p-5 bg-gradient-to-br ${color} bg-opacity-10 border-b border-white/[0.06]`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0`}>
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">{category}</h3>
            <p className="text-text-secondary text-xs">{skillList.length} skill{skillList.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="p-5 space-y-4">
        {skillList.map((skill) => (
          <SkillBar key={skill.name} skill={skill} inView={inView} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsPage() {
  // All unique tags across all skills
  const allSkillNames = Object.values(skills).flat().map((s) => s.name);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="orb w-[400px] h-[400px] bg-accent-secondary top-0 left-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Skills</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              Technical <TypewriterText texts={["Proficiency", "Stack", "Toolkit"]} />
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              Skills verified from real project work — not self-assessments. Every skill listed
              here is demonstrated in at least one GitHub repository.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/15 max-w-2xl">
            <span className="text-lg flex-shrink-0">ℹ️</span>
            <p className="text-text-secondary text-sm leading-relaxed">
              <span className="text-white font-semibold">Honest assessment: </span>
              Skill levels represent my current practical ability, not aspirational ratings.
              I&apos;m a student actively learning — these numbers reflect real project usage.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <CategoryCard key={category} category={category} skillList={skillList} />
            ))}
          </div>

          {/* All skills tag cloud */}
          <div className="mt-14 glass-card rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-2">All Technologies</h3>
            <p className="text-text-secondary text-sm mb-6">
              A quick-reference view of every technology in my toolkit.
            </p>
            <div className="flex flex-wrap gap-2">
              {allSkillNames.map((skill) => (
                <span key={skill} className="tech-tag text-sm py-1.5 px-3">{skill}</span>
              ))}
            </div>
          </div>

          {/* Learning note */}
          <div className="mt-6 glass-card rounded-2xl p-8 bg-gradient-to-br from-accent/5 to-accent-secondary/5">
            <h3 className="text-lg font-bold text-white mb-2">📚 Always Learning</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              As a B.Tech AIML student, I&apos;m constantly adding to this list. Current interests include
              deep learning architectures, MLOps workflows, and building more complex end-to-end ML systems.
              The best way to follow my learning journey is through my GitHub repositories.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
