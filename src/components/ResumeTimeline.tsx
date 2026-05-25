import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExperienceItem } from "../types";
import { Briefcase, MapPin, Calendar, CheckCircle2, ChevronDown, ChevronUp, Star, Filter } from "lucide-react";

interface ResumeTimelineProps {
  experiences: ExperienceItem[];
}

export default function ResumeTimeline({ experiences }: ResumeTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "fintech" | "core-pm" | "growth">("all");
  const [expandedId, setExpandedId] = useState<string | null>("exp-1");

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === "all") return true;
    return exp.category === activeFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "fintech":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "core-pm":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "growth":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getFilterLabel = (filter: string) => {
    switch (filter) {
      case "all":
        return "All Experience";
      case "fintech":
        return "FinTech Core";
      case "core-pm":
        return "Core Product & APIs";
      case "growth":
        return "SaaS & Growth Checkout";
      default:
        return filter;
    }
  };

  return (
    <div id="resume-timeline-container" className="space-y-8">
      {/* Experience Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Professional History</span>
          <h4 className="text-xl font-sans font-medium text-slate-800 mt-1">Stellar Product Architecture Roles</h4>
        </div>

        {/* Filters bar */}
        <div id="experience-filters" className="flex flex-wrap gap-2">
          {(["all", "fintech", "core-pm", "growth"] as const).map((filter) => (
            <button
              key={filter}
              id={`filter-btn-${filter}`}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                activeFilter === filter
                  ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                  : "bg-white border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-800"
              }`}
            >
              {filter === "all" && <Filter className="w-3 h-3 shrink-0" />}
              {getFilterLabel(filter)}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-slate-200 pl-4 md:pl-8 ml-4 md:ml-6 space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredExperiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <motion.div
                key={exp.id}
                layout
                id={`timeline-card-${exp.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`relative bg-white border rounded-2xl p-5 md:p-6 transition-all duration-300 ${
                  isExpanded ? "border-slate-300 shadow-sm" : "border-slate-100/80 hover:border-slate-300"
                }`}
              >
                {/* Connector Dot Icon */}
                <span className="absolute -left-[25px] md:-left-[41px] top-7 bg-white border-2 border-slate-800 rounded-full p-1 z-10 shadow-3xs">
                  <Briefcase className="w-3.5 h-3.5 text-slate-800" />
                </span>

                {/* Timeline Card Header */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="font-sans font-medium text-base text-slate-850">{exp.role}</h5>
                      <span className={`text-[10px] font-mono border px-2 py-0.5 rounded-full uppercase tracking-wider ${getCategoryColor(exp.category)}`}>
                        {exp.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-light mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-auto">
                    <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.timeline}
                    </span>
                    <button
                      type="button"
                      aria-label={isExpanded ? "Collapse item" : "Expand item"}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-50 border border-slate-100 transition-all"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded State Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-6 pt-5 border-t border-slate-100"
                    >
                      {/* Metric Badges */}
                      <div id="timeline-metrics" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {exp.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
                            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                              {m.label}
                            </span>
                            <p className="text-xl font-sans font-semibold text-slate-850 mt-1">
                              {m.value}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                              {m.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Accomplishment Bullets */}
                      <div className="space-y-3.5">
                        <span className="text-[10px] font-mono uppercase text-slate-450 tracking-wide block">
                          Core Contributions & Deliverables
                        </span>
                        <ul className="space-y-3 pl-0">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-slate-650 text-sm leading-relaxed">
                              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
