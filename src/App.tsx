import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { defaultPortfolioData } from "./data";
import { PortfolioData } from "./types";
import TeardownDeck from "./components/TeardownDeck";
import ResumeTimeline from "./components/ResumeTimeline";
import CustomizerModal from "./components/CustomizerModal";
import {
  Linkedin,
  Mail,
  FileText,
  ChevronRight,
  Download,
  AlertCircle,
  Award,
  Terminal,
  Check,
  CheckCircle2,
  MessageSquare,
  MapPin,
  User,
  ExternalLink,
  Smartphone,
  Server,
  Zap,
  Calendar,
  Menu,
  X
} from "lucide-react";

export default function App() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formType, setFormType] = useState<"recruiter" | "partnership" | "general">("recruiter");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    id: string;
    timestamp: string;
    status: string;
  } | null>(null);

  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  // Synchronize localStorage configuration
  useEffect(() => {
    const saved = localStorage.getItem("abhishek_portfolio_config");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local portfolio configs. Reverting.", e);
      }
    }
  }, []);

  const handleSave = (updated: PortfolioData) => {
    setData(updated);
    localStorage.setItem("abhishek_portfolio_config", JSON.stringify(updated));
  };

  const handleReset = () => {
    setData(defaultPortfolioData);
    localStorage.removeItem("abhishek_portfolio_config");
  };

  // Mock secure fintech transaction logger for form submission
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionReceipt({
        id: `tx_reconcile_${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString(),
        status: "COMMITTED_SUCCESSFULLY"
      });
    }, 1500);
  };

  // Simulated CV download sequence
  const handleCVDownload = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(null);
            // Open mock PDF link or mail a success note
            const link = document.createElement("a");
            link.href = `mailto:${data.socials.email}?subject=Interested%20in%20Abhishek%20Singla's%20Resume&body=Hi%20Abhishek%2C%20I%20saw%20your%20portfolio%20and%20reconciled%2520this%20request.%20Let's%20connect!`;
            link.click();
          }, 600);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-800">
      {/* 1. Header Navigation */}
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100/90 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#about" className="flex items-center gap-2 group">
            <span className="font-mono font-bold tracking-tight text-sm text-slate-900 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md group-hover:border-slate-800 transition-all">
              AS / PM
            </span>
            <span className="font-sans font-medium text-xs tracking-tight text-slate-500 group-hover:text-slate-950 transition-all hidden sm:inline">
              Portfolio
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-xs font-semibold text-slate-500 hover:text-slate-950 tracking-wide transition-all">About</a>
            <a href="#selected-work" className="text-xs font-semibold text-slate-500 hover:text-slate-950 tracking-wide transition-all">Selected Work</a>
            <a href="#resume" className="text-xs font-semibold text-slate-500 hover:text-slate-950 tracking-wide transition-all">Resume</a>
            <a href="#skills" className="text-xs font-semibold text-slate-500 hover:text-slate-950 tracking-wide transition-all">Core Skills</a>
            <a href="#contact" className="text-xs font-semibold text-slate-500 hover:text-slate-950 tracking-wide transition-all">Contact</a>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`mailto:${data.socials.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-850 text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-3xs transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              Direct Email
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide shadow-xs transition-all"
            >
              Get in Touch
            </a>

            {/* Mobile hamburger button */}
            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 transition-all"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-dropdown"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-100 bg-white"
            >
              <div className="px-4 py-4 space-y-3 flex flex-col">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-950 py-1.5 border-b border-slate-50 transition-all"
                >
                  About
                </a>
                <a
                  href="#selected-work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-950 py-1.5 border-b border-slate-50 transition-all"
                >
                  Selected Work (BBPS Teardown)
                </a>
                <a
                  href="#resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-950 py-1.5 border-b border-slate-50 transition-all"
                >
                  Resume
                </a>
                <a
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-950 py-1.5 border-b border-slate-50 transition-all"
                >
                  Core Skills
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-950 py-1.5 transition-all"
                >
                  Contact
                </a>

                {/* Mobile direct CTAs */}
                <div className="pt-3 flex items-center gap-3">
                  <a
                    href={`mailto:${data.socials.email}`}
                    className="flex-1 text-center justify-center inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Direct Email
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center justify-center inline-flex px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Brand Hero Container */}
      <header id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* A. Professional Headshot Column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-stretch gap-4 order-1 md:order-none">
            <div className="w-48 h-48 lg:w-full lg:h-auto aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/60 shadow-3xs relative group shrink-0">
              <img
                src="/src/assets/images/abhishek_singla_best_headshot_1779714915513.png"
                alt="Abhishek Singla Headshot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
            </div>
            
            <div className="w-full text-center lg:text-left space-y-1 bg-white border border-slate-100 p-4 rounded-xl shadow-3xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wide">Current Focus</span>
              <p className="text-xs text-slate-800 font-semibold font-sans">Core B2B Payments & Settlements</p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100/60 text-[9px] font-mono justify-center lg:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active NPCI Biller Nodes
              </div>
            </div>
          </div>

          {/* B. Hero text descriptor */}
          <div className="lg:col-span-5 space-y-6 order-2 md:order-none">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-mono font-medium text-slate-500 uppercase">
              <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
              Highly Selective Placement Profile
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-display font-medium text-slate-900 leading-tight tracking-tight">
              {data.name}
            </h1>
            <h2 className="text-lg font-sans font-normal text-slate-500 leading-snug tracking-tight">
              {data.title} &mdash; <span className="text-slate-800 font-medium">{data.subtitle}</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-light">
              {data.bioSummary}
            </p>

            {/* Quick connectivity block */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={data.socials.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0a66c2]/5 hover:bg-[#0a66c2]/10 text-[#0a66c2] rounded-xl text-xs font-bold tracking-wide transition-all border border-[#0a66c2]/10"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>

              <button
                type="button"
                onClick={handleCVDownload}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-850 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 transition-all animate-none"
              >
                {downloadProgress !== null ? (
                  <>
                    <span className="animate-pulse">PDF {downloadProgress}%</span>
                    <span className="w-2 rounded-full bg-slate-200 overflow-hidden relative h-2">
                      <span
                        className="absolute inset-y-0 left-0 bg-slate-800 transition-all duration-100"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Resume Request
                  </>
                )}
              </button>

              <a
                href="#selected-work"
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-950 pl-2 group transition-all"
              >
                Explore Teardowns
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* C. Aggregate telemetry table card (Senior PM signature) */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-4 order-3 md:order-none">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">Aggregate Impact Matrix</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">CAGR Volume Verified</span>
                <p className="text-2xl font-display font-medium text-slate-850 mt-0.5">$6B+ ARR</p>
                <p className="text-xs text-slate-500 font-light leading-snug mt-0.5">Unified routing networks & dynamic acquirer loops</p>
              </div>
              <div className="border-t border-slate-100/60 pt-3">
                <span className="text-[10px] font-mono text-slate-400 block">Ledger Delta Recurrence</span>
                <p className="text-2xl font-display font-medium text-slate-850 mt-0.5">&lt;0.01%</p>
                <p className="text-xs text-slate-500 font-light leading-snug mt-0.5">Dual-entry atomic balance processing states</p>
              </div>
              <div className="border-t border-slate-100/60 pt-3">
                <span className="text-[10px] font-mono text-slate-400 block">Developer Sandbox TAT</span>
                <p className="text-2xl font-display font-medium text-slate-850 mt-0.5">-45% Delay</p>
                <p className="text-xs text-slate-500 font-light leading-snug mt-0.5">Standard payload models & instant client webhooks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand narrative (The PM Craft) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 border-t border-slate-100">
          <div className="md:col-span-3">
            <span className="text-xs font-mono font-medium tracking-wide text-slate-400 uppercase">My Core Philosophy</span>
          </div>
          <div className="md:col-span-9 space-y-6">
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed font-light space-y-4 whitespace-pre-line">
              {data.aboutMarkdown}
            </div>
            
            {/* Elegant personal signature sign-off */}
            <div className="pt-4 flex flex-col items-start gap-1 border-t border-slate-100 w-fit">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Sign-Off Verification</span>
              <div className="font-signature text-4xl text-slate-900 select-none py-1 transform -rotate-1 origin-left">
                Abhishek Singla
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Selected Work: BBPS Article Block */}
      <section id="selected-work" className="bg-slate-50/50 border-y border-slate-100 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeardownDeck />
        </div>
      </section>

      {/* 4. Filterable Resume Timeline Block */}
      <section id="resume" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <ResumeTimeline experiences={data.experiences} />
      </section>

      {/* 5. Minimalist Technical Skills Grid */}
      <section id="skills" className="bg-slate-900 text-slate-100 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
          <Terminal className="w-96 h-96 text-indigo-400" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Compulsory Competence</span>
            <h3 className="text-2xl md:text-3xl font-sans font-medium mt-2 text-white">
              Under-the-Hood Technical Arsenal
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              I skip standard high-level PM buzzwords. This is the exact toolchain and technical concepts I orchestrate daily with engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.skills.map((group, index) => (
              <div key={index} className="bg-slate-850 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase block tracking-wider font-semibold border-b border-indigo-500/10 pb-2">
                  {group.category}
                </span>
                <ul className="space-y-2.5">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2 text-xs text-slate-300 font-light">
                      <span className="h-1 w-1 bg-indigo-500 rounded-full shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Education Block */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-10">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Academic Foundations</span>
          <h3 className="text-xl font-sans font-medium text-slate-800 mt-1">Education & Accreditations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.education.map((edu, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-2xs transition-all space-y-3">
              <span className="text-[10px] font-mono font-medium text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {edu.timeline}
              </span>
              <div>
                <h4 className="font-sans font-medium text-slate-800 text-base">{edu.degree}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{edu.school}</p>
              </div>
              {edu.bullets && (
                <ul className="space-y-1.5 pl-0 pt-2 border-t border-slate-100/60 mt-2">
                  {edu.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-500 font-light leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Action-Oriented High-Converting Contact Block */}
      <section id="contact" className="bg-slate-50/50 border-t border-slate-100 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Launch Connectivity State</span>
            <h3 className="text-2xl md:text-3xl font-sans font-medium text-slate-850">
              Initiate Dynamic Collaboration
            </h3>
            <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              No dead-end Contact page. Select your exact agenda below to launch custom PM matching telemetry.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-10 shadow-3xs">
            <AnimatePresence mode="wait">
              {!submissionReceipt ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Subject segment tabs */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                      1. Who are you connecting as?
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        type="button"
                        id="form-btn-recruiter"
                        onClick={() => setFormType("recruiter")}
                        className={`px-4 py-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                          formType === "recruiter"
                            ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                            : "bg-white border-slate-150 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-xs font-semibold">Hiring PM / Executive</span>
                      </button>

                      <button
                        type="button"
                        id="form-btn-partnership"
                        onClick={() => setFormType("partnership")}
                        className={`px-4 py-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                          formType === "partnership"
                            ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                            : "bg-white border-slate-150 hover:bg-slate-50 text-slate-705"
                        }`}
                      >
                        <Server className="w-4 h-4" />
                        <span className="text-xs font-semibold">Fintech Builder</span>
                      </button>

                      <button
                        type="button"
                        id="form-btn-general"
                        onClick={() => setFormType("general")}
                        className={`px-4 py-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                          formType === "general"
                            ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                            : "bg-white border-slate-150 hover:bg-slate-50 text-slate-705"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-semibold">General Inquiry</span>
                      </button>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-input-name" className="text-[10px] font-mono uppercase tracking-wider text-slate-405 block mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="form-input-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full border border-slate-200 focus:border-slate-800 rounded-xl p-3 text-xs text-slate-800 transition-all outline-hidden"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-input-email" className="text-[10px] font-mono uppercase tracking-wider text-slate-405 block mb-1.5">
                        Your Email
                      </label>
                      <input
                        id="form-input-email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full border border-slate-200 focus:border-slate-800 rounded-xl p-3 text-xs text-slate-800 transition-all outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-input-message" className="text-[10px] font-mono uppercase tracking-wider text-slate-405 block mb-1.5">
                      Your Agenda / Brief Description
                    </label>
                    <textarea
                      id="form-input-message"
                      rows={4}
                      required
                      placeholder={
                        formType === "recruiter"
                          ? "Enter headcount timing, target payroll ranges, or remote flexibility highlights..."
                          : formType === "partnership"
                          ? "Details regarding BBPS schemas, acquiring channels, or unified ledger products..."
                          : "Enter your questions or greeting notes..."
                      }
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      className="w-full border border-slate-200 focus:border-slate-800 rounded-xl p-3 text-xs text-slate-800 transition-all outline-hidden resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="form-btn-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Logging Secure Settlement Record...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4.5 h-4.5" />
                        Log Secured Collaboration Ping
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* Secure Receipt Animation (Fine thematic outcome) */
                <motion.div
                  key="contact-receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <Check className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-sans font-medium text-lg text-slate-800">Connection Ledger Resolved</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Thank you, {formName}! Your message was successfully routed and cached. Abhishek will receive structural alerts on his primary node within 5 minutes.
                    </p>
                  </div>

                  {/* Fintech Ledger receipt presentation */}
                  <div className="max-w-xs mx-auto border border-dashed border-slate-200 rounded-xl p-4 text-left font-mono text-[10px] space-y-2 text-slate-500 bg-slate-50">
                    <div className="flex justify-between">
                      <span>LEDGER INSTANCE</span>
                      <span className="text-slate-700 font-semibold">{submissionReceipt.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TX TIMESTAMP</span>
                      <span className="text-slate-700 font-semibold">{submissionReceipt.timestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STATUS</span>
                      <span className="text-emerald-600 font-bold">{submissionReceipt.status}</span>
                    </div>
                    <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between">
                      <span>ROUTING COEFFICIENT</span>
                      <span className="text-slate-700">NPCI-H2H-MOCK</span>
                    </div>
                  </div>

                  <button
                    id="btn-form-reset"
                    type="button"
                    onClick={() => {
                      setFormName("");
                      setFormEmail("");
                      setFormMsg("");
                      setSubmissionReceipt(null);
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-3.5 py-1.5 rounded-lg hover:border-slate-800 transition-all"
                  >
                    Submit Another Ping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 8. Pristine Footer */}
      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-1">
            <p className="font-mono text-xs font-semibold text-slate-800">Abhishek Singla</p>
            <p className="text-[10px] text-slate-400 font-light">&copy; {new Date().getFullYear()} Abhishek Singla. Fully customizable payments model portfolio.</p>
          </div>

          {/* Socials array */}
          <div className="flex items-center gap-4">
            <a
              href={data.socials.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all text-slate-500 hover:text-[#0a66c2]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${data.socials.email}`}
              className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all text-slate-500 hover:text-slate-900"
              aria-label="Direct Email Link"
            >
              <Mail className="w-4 h-4" />
            </a>
            {data.socials.github && (
              <a
                href={data.socials.github}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all text-slate-500 hover:text-slate-900"
                aria-label="GitHub Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* 9. Live Configuration Customization Slider Drawer */}
      <CustomizerModal data={data} onSave={handleSave} onReset={handleReset} />
    </div>
  );
}
