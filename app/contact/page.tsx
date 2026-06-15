"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { Github, Mail, ExternalLink, Send, CheckCircle, AlertCircle, Info, Rocket, Calendar as CalendarIcon, Lightbulb } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { TypewriterText } from "@/components/TypewriterText";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  // Personal Details
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  
  // Project Details
  domain: string;
  title: string;
  hasIdea: string;
  description: string;
  
  // Idea Generation Option (if hasIdea === "No" or "Not Sure Yet")
  interests: string[];
  additionalNotes: string;
  
  // Timeline
  deadline: string;
  urgency: string;
  
  // Requirements
  requirements: string[];
  
  // Honeypot for spam protection
  botField: string;
}

const domains = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Web Development",
  "Mobile Application",
  "Final Year Project",
  "Research Project",
  "Other"
];

const urgencies = [
  "No Hurry",
  "1 Month",
  "2 Weeks",
  "1 Week",
  "Urgent"
];

const interestOptions = [
  "AI", "Machine Learning", "Data Science", "Web Development", 
  "Healthcare", "Finance", "Education", "Real Estate", 
  "Agriculture", "Cybersecurity", "Other"
];

const requirementOptions = [
  "Source Code",
  "Project Report",
  "Presentation (PPT)",
  "Documentation",
  "Deployment Support",
  "Project Explanation",
  "All of the Above"
];

const contactMethods = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "Reach the team directly. We read every message.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    value: "github.com/SudharsaaX",
    href: siteConfig.github,
    description: "Explore our public repositories and code.",
    color: "from-purple-500 to-pink-500",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", college: "", department: "",
    domain: "", title: "", hasIdea: "", description: "",
    interests: [], additionalNotes: "",
    deadline: "", urgency: "",
    requirements: [],
    botField: ""
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.domain) newErrors.domain = "Please select a domain.";
    if (!formData.hasIdea) newErrors.hasIdea = "Please indicate if you have an idea.";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error roughly
      const firstErrorElement = document.querySelector('.border-red-500\\/50');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (group: 'interests' | 'requirements', value: string) => {
    setFormData(prev => {
      const currentList = prev[group];
      
      // Handle "All of the Above" logic for requirements
      if (group === 'requirements') {
        if (value === "All of the Above") {
          const isSelected = currentList.includes("All of the Above");
          return { ...prev, requirements: isSelected ? [] : [...requirementOptions] };
        } else {
          // If checking a normal item and 'All' was checked, remove 'All'
          // If unchecking a normal item and 'All' was checked, remove 'All'
          let newList = currentList.includes(value) 
            ? currentList.filter(item => item !== value && item !== "All of the Above")
            : [...currentList, value];
            
          // If all normal items are now checked, add 'All of the Above' automatically
          if (newList.length === requirementOptions.length - 1 && !newList.includes("All of the Above")) {
            newList.push("All of the Above");
          }
          return { ...prev, requirements: newList };
        }
      }

      // Normal array toggle logic for interests
      if (currentList.includes(value)) {
        return { ...prev, [group]: currentList.filter(item => item !== value) };
      } else {
        return { ...prev, [group]: [...currentList, value] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("submitting");
    setErrorMessage("");

    if (formData.botField) {
      console.log("Spam detected and blocked silently.");
      await new Promise(resolve => setTimeout(resolve, 800)); // Fake delay
      setFormState("success");
      return;
    }

    try {
      // Format data for email
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college || 'Not provided',
        department: formData.department || 'Not provided',
        project_domain: formData.domain,
        project_title: formData.title || 'Not provided',
        has_idea: formData.hasIdea,
        project_description: formData.description || 'None',
        deadline: formData.deadline || 'Not specified',
        urgency: formData.urgency || 'Not specified',
        requirements: formData.requirements.length > 0 ? formData.requirements.join(", ") : 'None',
        additional_notes: formData.interests.length > 0 ? `Interests: ${formData.interests.join(", ")}\n\nNotes: ${formData.additionalNotes}` : (formData.additionalNotes || 'None')
      };

      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("Missing EmailJS credentials");
      }

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      setFormState("success");
    } catch (error) {
      console.error("Failed to send email:", error);
      setFormState("error");
      setErrorMessage("Failed to submit request. Please try again or email us directly.");
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", email: "", phone: "", college: "", department: "",
      domain: "", title: "", hasIdea: "", description: "",
      interests: [], additionalNotes: "",
      deadline: "", urgency: "", requirements: [], botField: ""
    });
    setErrors({});
    setFormState("idle");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showIdeaGeneration = formData.hasIdea === "No" || formData.hasIdea === "Not Sure Yet";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="orb w-[400px] h-[400px] bg-accent bottom-0 right-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Request Project</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              Let&apos;s Build Your{" "}
              <TypewriterText texts={["Project", "Solution", "Idea", "Future"]} />
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              Tell us what you&apos;re looking for. Whether you already have a project idea or need help finding one, we&apos;ll help you through the entire process.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-accent/10 to-accent-secondary/5 border-accent/20">
                 <Rocket className="w-8 h-8 text-accent mb-4" />
                 <h2 className="text-xl font-bold text-white mb-2">How it works</h2>
                 <ul className="space-y-4 mt-4">
                   <li className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</div>
                     <p className="text-sm text-text-secondary">Submit your request using the form. It takes less than 2 minutes.</p>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</div>
                     <p className="text-sm text-text-secondary">Our team reviews your requirements or helps you select an idea.</p>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</div>
                     <p className="text-sm text-text-secondary">We discuss the scope, pricing, and timeline with you.</p>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">4</div>
                     <p className="text-sm text-text-secondary">We build your project and provide all necessary documentation.</p>
                   </li>
                 </ul>
              </div>

              <h2 className="text-base font-bold text-white mb-4 mt-8">Direct Contact</h2>
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block glass-card rounded-xl p-5 hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      {method.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-text-secondary font-medium mb-0.5">{method.label}</div>
                      <div className="text-white text-sm font-semibold truncate">{method.value}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Main Form */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
                
                {formState === "success" ? (
                  <div className="text-center py-16 px-4 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Your request has been received successfully.</h3>
                    <p className="text-text-secondary text-base mb-10 max-w-md mx-auto leading-relaxed">
                      Our team will review your requirements and contact you soon regarding project details, timelines, pricing, and any additional questions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button onClick={resetForm} className="btn-primary">
                        Submit Another Request
                      </button>
                      <Link href="/" className="btn-secondary">
                        Back to Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-10 relative z-10">
                    
                    {formState === "error" && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                         <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                         <p className="text-sm text-red-200">{errorMessage}</p>
                      </div>
                    )}

                    {/* Honeypot Field */}
                    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                      <label htmlFor="botField">Please leave this field blank</label>
                      <input 
                        type="text" 
                        name="botField" 
                        id="botField" 
                        value={formData.botField} 
                        onChange={handleChange} 
                        tabIndex={-1} 
                        autoComplete="off" 
                      />
                    </div>

                    {/* Section 1: Personal Details */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                         <span className="w-6 h-6 rounded-md bg-accent/20 text-accent flex items-center justify-center text-xs">1</span>
                         Personal Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Name <span className="text-red-400">*</span></label>
                          <input name="name" type="text" value={formData.name} onChange={handleChange} className={`form-input ${errors.name ? 'border-red-500/50' : ''}`} placeholder="e.g. Sudharsaa" />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1.5">Email Address <span className="text-red-400">*</span></label>
                          <input name="email" type="email" value={formData.email} onChange={handleChange} className={`form-input ${errors.email ? 'border-red-500/50' : ''}`} placeholder="e.g. sudharsaa149@gmail.com" />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`form-input ${errors.phone ? 'border-red-500/50' : ''}`} placeholder="+91 9876543210" />
                          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1.5">College Name <span className="text-white/30 text-xs ml-1">(Optional)</span></label>
                          <input name="college" type="text" value={formData.college} onChange={handleChange} className="form-input" placeholder="e.g. MIT, Stanford, or Local University" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1.5">Department <span className="text-white/30 text-xs ml-1">(Optional)</span></label>
                          <input name="department" type="text" value={formData.department} onChange={handleChange} className="form-input" placeholder="e.g. B.Tech AIML" />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Project Details */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                         <span className="w-6 h-6 rounded-md bg-accent/20 text-accent flex items-center justify-center text-xs">2</span>
                         Project Details
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1.5">Project Domain <span className="text-red-400">*</span></label>
                          <select name="domain" value={formData.domain} onChange={handleChange} className={`form-input appearance-none bg-surface ${errors.domain ? 'border-red-500/50' : ''}`}>
                            <option value="" className="text-bg bg-white">Select a domain...</option>
                            {domains.map(d => <option key={d} value={d} className="text-bg bg-white">{d}</option>)}
                          </select>
                          {errors.domain && <p className="text-red-400 text-xs mt-1">{errors.domain}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">Do You Already Have a Project Idea? <span className="text-red-400">*</span></label>
                          <div className="flex flex-wrap gap-4">
                            {["Yes", "No", "Not Sure Yet"].map(opt => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="hasIdea" value={opt} checked={formData.hasIdea === opt} onChange={handleChange} className="hidden" />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${formData.hasIdea === opt ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/50'}`}>
                                  {formData.hasIdea === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <span className="text-sm text-white group-hover:text-accent transition-colors">{opt}</span>
                              </label>
                            ))}
                          </div>
                          {errors.hasIdea && <p className="text-red-400 text-xs mt-1">{errors.hasIdea}</p>}
                        </div>

                        {formData.hasIdea === "Yes" && (
                           <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-5">
                             <div>
                               <label className="block text-sm font-medium text-text-secondary mb-1.5">Project Title <span className="text-white/30 text-xs ml-1">(Optional)</span></label>
                               <input name="title" type="text" value={formData.title} onChange={handleChange} className="form-input" placeholder="Example: Employee Attrition Prediction using XGBoost" />
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-text-secondary mb-1.5">Project Description <span className="text-white/30 text-xs ml-1">(Optional)</span></label>
                               <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="form-input resize-y" placeholder="Describe your idea, requirements, or goals if you have them." />
                             </div>
                           </div>
                        )}

                        {/* Idea Generation Option Section */}
                        {showIdeaGeneration && (
                           <div className="animate-in fade-in slide-in-from-top-4 duration-300 glass-card p-5 rounded-xl border border-accent/20 bg-accent/5">
                             <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className="w-5 h-5 text-accent" />
                                <h4 className="text-white font-bold">What are you interested in?</h4>
                             </div>
                             <p className="text-xs text-text-secondary mb-4">Select the fields that interest you, and we&apos;ll suggest tailored project ideas.</p>
                             
                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                               {interestOptions.map(opt => (
                                 <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                   <input type="checkbox" checked={formData.interests.includes(opt)} onChange={() => handleCheckboxChange('interests', opt)} className="hidden" />
                                   <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${formData.interests.includes(opt) ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/50'}`}>
                                     {formData.interests.includes(opt) && <CheckCircle className="w-3 h-3 text-white" />}
                                   </div>
                                   <span className="text-xs text-white group-hover:text-accent transition-colors select-none">{opt}</span>
                                 </label>
                               ))}
                             </div>

                             <div>
                               <label className="block text-sm font-medium text-text-secondary mb-1.5">Additional Notes <span className="text-white/30 text-xs ml-1">(Optional)</span></label>
                               <textarea name="additionalNotes" rows={2} value={formData.additionalNotes} onChange={handleChange} className="form-input resize-y bg-bg/50" placeholder="e.g. I want something related to medical imaging, or I prefer working with Python." />
                               <p className="text-[10px] text-text-secondary mt-1">This information helps our team suggest the best project ideas for you.</p>
                             </div>
                           </div>
                        )}
                      </div>
                    </div>

                    {/* Section 3: Timeline & Requirements */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                         <span className="w-6 h-6 rounded-md bg-accent/20 text-accent flex items-center justify-center text-xs">3</span>
                         Timeline & Requirements
                      </h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                           <div>
                             <label className="block text-sm font-medium text-text-secondary mb-1.5">Expected Deadline <span className="text-white/30 text-xs ml-1">(Optional)</span></label>
                             <div className="relative">
                                <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} className="form-input appearance-none bg-surface [&::-webkit-calendar-picker-indicator]:invert-[1]" />
                                <CalendarIcon className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                             </div>
                           </div>
                           <div>
                             <label className="block text-sm font-medium text-text-secondary mb-1.5">Urgency <span className="text-white/30 text-xs ml-1">(Optional)</span></label>
                             <select name="urgency" value={formData.urgency} onChange={handleChange} className="form-input appearance-none bg-surface">
                               <option value="" className="text-bg bg-white">Select urgency...</option>
                               {urgencies.map(u => <option key={u} value={u} className="text-bg bg-white">{u}</option>)}
                             </select>
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-text-secondary mb-3">Project Requirements</label>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {requirementOptions.map(opt => (
                               <label key={opt} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                 <input type="checkbox" checked={formData.requirements.includes(opt)} onChange={() => handleCheckboxChange('requirements', opt)} className="hidden" />
                                 <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${formData.requirements.includes(opt) ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/50'}`}>
                                   {formData.requirements.includes(opt) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                 </div>
                                 <span className={`text-sm select-none transition-colors ${formData.requirements.includes(opt) ? 'text-white font-medium' : 'text-text-secondary group-hover:text-white'}`}>{opt}</span>
                               </label>
                             ))}
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Notice instead of budget */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
                      <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Submit your project request and our team will contact you to discuss requirements, project scope, <span className="text-white font-medium">pricing</span>, timelines, and any questions you may have.
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]"
                    >
                      {formState === "submitting" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Request Project Consultation
                        </>
                      )}
                    </button>
                    
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
