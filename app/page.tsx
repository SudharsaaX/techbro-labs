"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Github,
  ArrowRight,
  ExternalLink,
  Code2,
  Brain,
  BarChart2,
  Bot,
  FileText,
  Rocket,
  Eye,
  Home,
  Zap,
  Star,
  ChevronRight,
  Search,
  PenTool,
  CheckCircle,
  Lightbulb,
  MessageSquare,
  Wrench
} from "lucide-react";
import { projects, services, siteConfig } from "@/lib/data";
import { TypewriterText } from "@/components/TypewriterText";

// --- Particle Canvas ---
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }> = [];

    const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#A78BFA"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      // Draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// --- Icon map ---
const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  "bar-chart-2": <BarChart2 className="w-5 h-5" />,
  bot: <Bot className="w-5 h-5" />,
  "file-text": <FileText className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  eye: <Eye className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  "bar-chart": <BarChart2 className="w-5 h-5" />,
};

// --- Featured Project Card ---
function FeaturedProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const delay = index * 0.1;
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card glass-card rounded-2xl p-6 flex flex-col gap-4 group cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
          {iconMap[project.icon]}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink className="w-4 h-4 text-text-secondary" />
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-bold text-base text-white mb-1">{project.title}</h3>
        <p className="text-xs text-accent mb-2 font-medium">{project.category}</p>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tech-tag">{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 text-xs text-text-secondary group-hover:text-accent transition-colors duration-200">
        <Github className="w-3.5 h-3.5" />
        <span>View on GitHub</span>
        <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
}

// --- Service Card ---
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <div className="glass-card rounded-xl p-6 hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300 group">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-accent/20 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform duration-200">
        {iconMap[service.icon]}
      </div>
      <h3 className="font-bold text-sm text-white mb-2">{service.title}</h3>
      <p className="text-text-secondary text-xs leading-relaxed mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-1">
        {service.tags.map((tag) => (
          <span key={tag} className="tech-tag text-[10px] px-2 py-0.5">{tag}</span>
        ))}
      </div>
    </div>
  );
}

// --- Main Home Page ---
export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">
        {/* Background elements */}
        <ParticleCanvas />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="orb w-[600px] h-[600px] bg-accent top-[-200px] left-[-200px]" />
        <div className="orb w-[500px] h-[500px] bg-accent-secondary bottom-[-150px] right-[-150px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold mb-8 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5" />
              Building Smart Projects & Practical Solutions
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4">
              <span className="text-white">Welcome to </span>
              <span className="gradient-text-animated">TechBro Labs</span>
            </h1>
            
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-secondary mb-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <span>Where Ideas Become</span>
              <TypewriterText
                texts={[
                  "Real Projects",
                  "Working Solutions",
                  "Smart Systems",
                  "Digital Experiences",
                  "Practical AI",
                ]}
              />
            </div>

            {/* Sub description */}
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              We help students and developers transform concepts into fully functional projects. 
              From Machine Learning and AI to Data Science and Web Development, we build systems 
              that actually work. Everything we do is transparent, documented, and verifiable.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary text-base px-8 py-3.5">
                Request a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary text-base px-8 py-3.5">
                View Our Portfolio
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-14">
              {[
                { value: "End-to-End", label: "Project Support" },
                { value: "ML/AI", label: "Core Expertise" },
                { value: "Transparent", label: "Process" },
                { value: "100%", label: "Working Solutions" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-text-secondary text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent animate-pulse" />
          <span className="text-xs text-text-secondary">Scroll</span>
        </div>
      </section>

      {/* ====== ABOUT BENTO PREVIEW ====== */}
      <section className="section-pad bg-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Who We Are</p>
            <h2 className="text-4xl font-extrabold text-white">
              A collaborative team building at the intersection of{" "}
              <span className="gradient-text">technology & education</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Bio card - spans 2 cols */}
            <div className="glass-card rounded-2xl p-8 lg:col-span-2 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-2xl flex-shrink-0">
                  👨‍💻
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">TechBro Labs</h3>
                  <p className="text-accent text-sm font-medium mb-3">Project Development Studio · AI/ML Specialists</p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    TechBro Labs was founded to bridge the gap between academic theory and practical implementation. 
                    We are a dedicated team that genuinely loves building things. Our projects range from real-time computer vision systems that detect
                    driver fatigue, to NLP applications that interpret dreams, to ML models that predict
                    real estate prices. We learn by doing, and we help students do the same.
                  </p>
                </div>
              </div>
            </div>

            {/* Focus card */}
            <div className="glass-card rounded-2xl p-6 hover:border-accent-secondary/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                Current Focus
              </h3>
              <ul className="space-y-3">
                {["Machine Learning", "Computer Vision", "NLP", "AI Automation", "Data Science"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <ChevronRight className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* GitHub card */}
            <div className="glass-card rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <Github className="w-5 h-5 text-white" />
                <h3 className="text-sm font-semibold text-white">Our Code</h3>
                <span className="status-dot ml-auto" />
              </div>
              <p className="text-text-secondary text-xs leading-relaxed mb-4">
                We believe in transparency. Many of our core projects are available on GitHub. Real code, real commits — proof of work.
              </p>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent text-xs font-medium hover:text-white transition-colors group-hover:gap-2.5 duration-200"
              >
                SudharsaaX <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Tech card */}
            <div className="glass-card rounded-2xl p-6 hover:border-accent/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-white mb-4">Primary Stack</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "YOLOv8", "CatBoost", "Streamlit", "n8n", "NLTK", "Pandas", "XGBoost"].map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Values card */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-accent/5 to-accent-secondary/5 hover:from-accent/10 hover:to-accent-secondary/10 transition-all duration-300">
              <h3 className="text-sm font-semibold text-white mb-4">What drives us</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-lg">🤝</span> Collaborative success
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">🛠️</span> Building real systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">📚</span> Mentoring & Guidance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">🎓</span> Helping students shine
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====== IDEA GENERATION ====== */}
      <section className="section-pad bg-surface/20 relative overflow-hidden">
         <div className="orb w-[400px] h-[400px] bg-accent top-0 left-0 opacity-10" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold mb-6">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Project Discovery
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Need a <span className="gradient-text">Project Idea?</span>
                </h2>
                <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                  Don&apos;t know what to build? That&apos;s completely fine. Many students come to us looking for inspiration. Tell us your interests and we&apos;ll suggest project ideas that match your domain and skill level.
                </p>
                <ul className="space-y-3 mb-8">
                   <li className="flex items-center gap-3 text-white text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> AI Healthcare Projects</li>
                   <li className="flex items-center gap-3 text-white text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Machine Learning Projects</li>
                   <li className="flex items-center gap-3 text-white text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Web Development Projects</li>
                   <li className="flex items-center gap-3 text-white text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Data Science Projects</li>
                   <li className="flex items-center gap-3 text-white text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Final Year Project Ideas</li>
                </ul>
                <Link href="/contact" className="btn-primary">Get Idea Suggestions <ArrowRight className="w-4 h-4"/></Link>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-accent-secondary/20 blur-3xl rounded-full opacity-50"></div>
                 <div className="glass-card rounded-2xl p-8 relative z-10 border border-white/10 shadow-2xl backdrop-blur-xl">
                    <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-accent text-sm">You</span></div>
                        <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-text-secondary">I need a final year project related to AI, but I&apos;m not sure what to choose.</div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-accent-secondary/20 flex items-center justify-center flex-shrink-0 mt-1"><Zap className="w-4 h-4 text-accent-secondary"/></div>
                        <div className="bg-accent/10 border border-accent/20 rounded-2xl rounded-tr-none p-4 text-sm text-white">Based on current trends, how about a <strong>Real-time Driver Fatigue Detection System</strong> using Computer Vision? We can build it with YOLOv8 and add IoT alerts. It&apos;s highly practical and scores well in evaluations.</div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </section>

      {/* ====== PROJECT DEVELOPMENT JOURNEY ====== */}
      <section className="section-pad relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Project Development <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              We guide you through every step of the development lifecycle, ensuring you understand the project thoroughly.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Central Line */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/50 via-accent-secondary/30 to-transparent md:-translate-x-1/2 rounded-full" />

            {[
              { step: "01", title: "Project Discussion", desc: "We start by understanding your requirements, academic goals, and specific needs for the project.", icon: <MessageSquare className="w-5 h-5"/> },
              { step: "02", title: "Idea Selection", desc: "If you don't have an idea, we help you choose a suitable, modern project topic that matches your interests.", icon: <Lightbulb className="w-5 h-5"/> },
              { step: "03", title: "Research & Planning", desc: "We define the technologies, list the features, and scope out the entire development roadmap.", icon: <Search className="w-5 h-5"/> },
              { step: "04", title: "Design & Development", desc: "Our team builds the complete project from scratch, ensuring clean code and modern architecture.", icon: <Code2 className="w-5 h-5"/> },
              { step: "05", title: "Testing & Improvements", desc: "Rigorous testing to verify functionality, fix bugs, and refine the user experience.", icon: <Wrench className="w-5 h-5"/> },
              { step: "06", title: "Documentation", desc: "We prepare comprehensive reports, presentations (PPTs), and detailed technical explanations.", icon: <FileText className="w-5 h-5"/> },
              { step: "07", title: "Final Delivery", desc: "You receive all project files, source code, documentation, and a walkthrough session to ensure you understand it completely.", icon: <Rocket className="w-5 h-5"/> },
            ].map((item, index) => (
              <div key={item.step} className={`relative flex flex-col md:flex-row items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-bg border-2 border-accent z-10 md:-translate-x-1/2 flex items-center justify-center">
                   <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                </div>

                {/* Content Box */}
                <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pr-12' : 'md:text-right md:pl-12'}`}>
                  <div className={`glass-card p-6 rounded-2xl hover:border-accent/30 transition-colors inline-block w-full text-left`}>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-accent font-mono font-bold">{item.step}</span>
                       <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FROM IDEA TO WORKING PROJECT ====== */}
       <section className="section-pad bg-surface/20 relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              From Idea to <span className="gradient-text">Working Project</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto text-base">
              Whether you already have a project idea or need help discovering one, TechBro Labs can guide you through the entire process.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Idea Discovery", icon: <Search className="w-6 h-6"/> },
              { title: "Planning", icon: <PenTool className="w-6 h-6"/> },
              { title: "Development", icon: <Code2 className="w-6 h-6"/> },
              { title: "Documentation", icon: <FileText className="w-6 h-6"/> },
              { title: "Testing", icon: <CheckCircle className="w-6 h-6"/> },
              { title: "Final Delivery", icon: <Rocket className="w-6 h-6"/> },
            ].map((step, i) => (
              <div key={i} className="glass-card rounded-xl p-6 text-center hover:bg-white/5 transition-colors group">
                 <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {step.icon}
                 </div>
                 <h4 className="text-white text-sm font-bold">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURED PROJECTS ====== */}
      <section className="section-pad relative overflow-hidden">
        <div className="orb w-[400px] h-[400px] bg-accent-secondary top-0 right-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Featured Work</p>
              <h2 className="text-4xl font-extrabold text-white">
                Real projects, <span className="gradient-text">real code</span>
              </h2>
              <p className="text-text-secondary mt-3 max-w-lg">
                Explore some of our recent technical implementations. Every project is verifiable.
              </p>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-1.5 text-accent text-sm font-semibold hover:text-white transition-colors flex-shrink-0 group"
            >
              All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <FeaturedProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section className="section-pad bg-surface/20 relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">
              What We Can Help With
            </p>
            <h2 className="text-4xl font-extrabold text-white">
              Project Development <span className="gradient-text">Services</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto text-base">
              Looking for help with a technical project? We work with students and developers on
              real, functional solutions — not templates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="section-pad relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* BG gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent-secondary/20 to-bg" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent-secondary blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent blur-3xl opacity-20" />

            <div className="relative z-10 p-8 md:p-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold mb-6">
                <Zap className="w-3 h-3" />
                Ready to Start?
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Let&apos;s build your project
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
                Submit a request today. Whether you have full requirements or just a vague idea, our team is ready to guide you.
              </p>
              <Link href="/contact" className="btn-primary text-base px-10 py-4">
                Request Project Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
