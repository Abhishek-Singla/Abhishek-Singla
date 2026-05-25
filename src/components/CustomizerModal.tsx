import { useState } from "react";
import { PortfolioData } from "../types";
import { X, Check, RotateCcw, Download, Settings, Github, Linkedin, Mail, Sparkles } from "lucide-react";

interface CustomizerModalProps {
  data: PortfolioData;
  onSave: (updated: PortfolioData) => void;
  onReset: () => void;
}

export default function CustomizerModal({ data, onSave, onReset }: CustomizerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<PortfolioData>({ ...data });

  const handleChange = (field: keyof PortfolioData, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (field: "linkedin" | "email" | "github" | "twitter", value: string) => {
    setProfile((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [field]: value
      }
    }));
  };

  const handleApply = () => {
    onSave({ ...profile, hasCustomized: true });
    setIsOpen(false);
  };

  const handleResetClick = () => {
    if (confirm("Are you sure you want to reset back to Abhishek Singla's primary defaults?")) {
      onReset();
      setIsOpen(false);
    }
  };

  const handleExportJSON = () => {
    const fileData = JSON.stringify(profile, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-config-${profile.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Floating customize pill trigger */}
      <button
        id="btn-trigger-customizer"
        type="button"
        onClick={() => {
          setProfile({ ...data });
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-semibold tracking-wide flex items-center gap-2 border border-slate-850"
      >
        <Settings className="w-4 h-4 animate-spin-slow" />
        Configure Portfolio Content
      </button>

      {isOpen && (
        <div id="customizer-overlay" className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] flex items-center justify-end">
          <div
            id="customizer-panel"
            className="bg-white w-full max-w-lg h-full overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between"
          >
            {/* Header Block */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-slate-100 border border-slate-200">
                    <Settings className="w-4 h-4 text-slate-850" />
                  </span>
                  <div>
                    <h4 className="font-sans font-medium text-slate-800 text-sm">Portfolio Quick-Setup</h4>
                    <p className="text-[10px] text-slate-400">Personalize with your LinkedIn details instantly</p>
                  </div>
                </div>
                <button
                  id="btn-close-customizer"
                  type="button"
                  aria-label="Close configuration panel"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-50 border border-slate-100 transition-all text-slate-400 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Informative Help Banner */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-slate-500">
                <Sparkles className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <p>
                  No complicated build setup required. You can edit your name, titles, socials, and bios here. Saving updates the preview immediately using local persistence. You can also export the JSON content schema below!
                </p>
              </div>

              {/* Form Input Grid */}
              <div className="space-y-4 pt-2">
                <div>
                  <label htmlFor="input-name" className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full border border-slate-200 focus:border-slate-800 rounded-lg p-2.5 text-xs text-slate-820 transition-all outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="input-title" className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Professional Title
                  </label>
                  <input
                    id="input-title"
                    type="text"
                    value={profile.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full border border-slate-200 focus:border-slate-800 rounded-lg p-2.5 text-xs text-slate-820 transition-all outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="input-subtitle" className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Target Focal Subtitle
                  </label>
                  <input
                    id="input-subtitle"
                    type="text"
                    value={profile.subtitle}
                    onChange={(e) => handleChange("subtitle", e.target.value)}
                    className="w-full border border-slate-200 focus:border-slate-800 rounded-lg p-2.5 text-xs text-slate-820 transition-all outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="input-bio" className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Elevator Hook (Bio Summary)
                  </label>
                  <textarea
                    id="input-bio"
                    rows={3}
                    value={profile.bioSummary}
                    onChange={(e) => handleChange("bioSummary", e.target.value)}
                    className="w-full border border-slate-200 focus:border-slate-800 rounded-lg p-2.5 text-xs text-slate-820 transition-all outline-hidden resize-none"
                  />
                </div>

                {/* Social Nodes */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-405 block">
                    Social Connectivity Profiles
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        id="input-social-linkedin"
                        type="text"
                        placeholder="LinkedIn profile URL"
                        value={profile.socials.linkedin}
                        onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                        className="w-full p-0 border-0 outline-hidden text-xs text-slate-820 bg-transparent"
                      />
                    </div>

                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        id="input-social-email"
                        type="text"
                        placeholder="Contact email"
                        value={profile.socials.email}
                        onChange={(e) => handleSocialChange("email", e.target.value)}
                        className="w-full p-0 border-0 outline-hidden text-xs text-slate-820 bg-transparent"
                      />
                    </div>

                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5">
                      <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        id="input-social-github"
                        type="text"
                        placeholder="GitHub profile URL"
                        value={profile.socials.github || ""}
                        onChange={(e) => handleSocialChange("github", e.target.value)}
                        className="w-full p-0 border-0 outline-hidden text-xs text-slate-820 bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2">
                <button
                  id="btn-reset-customizer"
                  type="button"
                  onClick={handleResetClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-850 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-850 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>
                <button
                  id="btn-export-json"
                  type="button"
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-850 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-850 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export JSON
                </button>
              </div>

              <button
                id="btn-apply-customizer"
                type="button"
                onClick={handleApply}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                Apply & Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
