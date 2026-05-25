import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { defaultTeardownSlides } from "../data";
import { BBPSEcosystemMap, SettlementReconciliationLoop } from "./VisualDiagrams";
import { ArrowLeft, ArrowRight, BookOpen, Layers, Sparkles, HelpCircle, FileText } from "lucide-react";

export default function TeardownDeck() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"deck" | "document">("deck");
  const slide = defaultTeardownSlides[currentIdx];

  const handleNext = () => {
    if (currentIdx < defaultTeardownSlides.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  return (
    <div id="bbps-teardown-section" className="border border-slate-100/80 rounded-3xl bg-white p-6 md:p-10 shadow-xs">
      {/* Article Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span id="article-badge" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Selected Work / Product deep-dive
            </span>
          </div>
          <h3 id="article-title" className="text-2xl md:text-3xl font-sans font-medium text-slate-800 tracking-tight mt-2">
            Deconstructing the Bharat Bill Payment System (BBPS)
          </h3>
          <p id="article-subtitle" className="text-slate-500 text-sm mt-1 max-w-2xl">
            Architectural Fractures, API Latency Bottlenecks, and the PM Playbook for +18% Net Conversion Boosts.
          </p>
        </div>

        {/* View mode switcher */}
        <div id="view-mode-container" className="flex items-center bg-slate-50 border border-slate-100 p-1 rounded-lg self-start md:self-end">
          <button
            id="view-mode-deck"
            type="button"
            onClick={() => setViewMode("deck")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 ${
              viewMode === "deck" ? "bg-white text-slate-800 shadow-2xs" : "text-slate-400 hover:text-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Interactive Slide Deck
          </button>
          <button
            id="view-mode-document"
            type="button"
            onClick={() => setViewMode("document")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 ${
              viewMode === "document" ? "bg-white text-slate-800 shadow-2xs" : "text-slate-400 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Full Article View
          </button>
        </div>
      </div>

      {viewMode === "deck" ? (
        <div id="deck-view">
          {/* Quick Category Selectors */}
          <div id="category-tabs" className="flex overflow-x-auto gap-2 pb-4 scrollbar-none border-b border-slate-100 mb-6">
            {defaultTeardownSlides.map((s, index) => (
              <button
                key={s.id}
                id={`cat-button-${s.id}`}
                type="button"
                onClick={() => setCurrentIdx(index)}
                className={`flex-none px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  index === currentIdx
                    ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>

          {/* Core Deck Display Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[440px]">
            {/* Primary content card */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <span className="text-xs font-mono font-medium tracking-tight text-slate-400">
                    Slide {currentIdx + 1} of {defaultTeardownSlides.length} — {slide.category}
                  </span>
                  <h4 className="text-xl md:text-2xl font-sans font-medium text-slate-800 tracking-tight leading-snug">
                    {slide.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{slide.summary}</p>

                  {/* Bullet points structure */}
                  <div className="space-y-3 pt-2">
                    {slide.points.map((pt, pIdx) => (
                      <div key={pIdx} className="bg-slate-50 border border-slate-100/60 rounded-xl p-4 flex gap-3">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-mono font-semibold text-slate-400 bg-white border border-slate-200 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                            {pIdx + 1}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-sans font-medium text-sm text-slate-700">{pt.title}</span>
                            {pt.badge && (
                              <span className="text-[9px] font-mono uppercase bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                                {pt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{pt.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Deck Navigation Controls */}
              <div id="deck-controls" className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  id="btn-prev-slide"
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                    currentIdx === 0
                      ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                      : "bg-white border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900 shadow-2xs"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Slide
                </button>

                <div className="flex items-center gap-1.5">
                  {defaultTeardownSlides.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      onClick={() => setCurrentIdx(dotIdx)}
                      className={`h-2 rounded-full transition-all ${
                        dotIdx === currentIdx ? "bg-slate-800 w-6" : "bg-slate-200 w-2 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  id="btn-next-slide"
                  type="button"
                  onClick={handleNext}
                  disabled={currentIdx === defaultTeardownSlides.length - 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                    currentIdx === defaultTeardownSlides.length - 1
                      ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                      : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-white shadow-sm"
                  }`}
                >
                  Next Slide
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Interactive / Display Panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* Context-aware dynamic widget block */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-sm border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Sparkles className="w-24 h-24 text-teal-400" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="p-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-mono font-medium tracking-tight text-teal-400">
                    PM Insight Flash
                  </span>
                </div>

                <p className="text-sm font-sans italic text-slate-300 leading-relaxed font-light">
                  "{slide.insight}"
                </p>

                <div className="border-t border-slate-800 mt-4 pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">Telemetry Anchor</span>
                  <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">
                    100% Real-World Scenarios
                  </span>
                </div>
              </div>

              {/* Render dynamic matching diagrams directly under relevant slides! */}
              {currentIdx === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <BBPSEcosystemMap />
                </motion.div>
              )}
              {currentIdx === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <SettlementReconciliationLoop />
                </motion.div>
              )}

              {/* Secondary static widgets for other slides */}
              {(currentIdx === 2 || currentIdx === 3) && (
                <div className="border border-slate-100 bg-slate-50/40 rounded-2xl p-6">
                  <h5 className="font-sans font-medium text-sm text-slate-800 mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    How this maps to Abhishek's PM Work?
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    At <span className="text-slate-700 font-medium">EnKash</span> and{" "}
                    <span className="text-slate-700 font-medium">Mindgate Solutions</span>, Abhishek deployed these exact API configurations. By introducing streamlined schemas and optimizing status reconciliations, he successfully decreased merchant integration times from weeks or months down to just 2-3 calendar days.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Dev Hours Saved</span>
                      <p className="text-sm font-sans font-semibold text-slate-800 mt-0.5">80+ Hours/Merchant</p>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Conversion Lift</span>
                      <p className="text-sm font-sans font-semibold text-slate-800 mt-0.5">Up to +18% net yield</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Full Article Document view */
        <div id="document-view" className="space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">
            <span>Estimated Reading Time: 8 Mins</span>
            <div className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Scroll below to read</span>
            </div>
          </div>

          <article className="prose prose-slate max-w-none prose-sm md:prose-base space-y-6 text-slate-600 leading-relaxed">
            <h4 className="text-xl font-sans font-semibold text-slate-800 border-b border-slate-100 pb-2">
              Introduction: The Retail Utility Landscape
            </h4>
            <p>
              Under NPCI guidance, the Bharat Bill Payment System (BBPS) established a unified mechanism for utility payments across India, facilitating interconnected settlements among gas, electricity, water, and broadband billers. From a service availability perspective, BBPS remains a colossal technical achievement. However, from a product manager's transaction conversion lens, standard implementations harbor significant friction points that lead to customer dropout, trapped debits, and integration fatigue.
            </p>

            <BBPSEcosystemMap />

            <h4 className="text-xl font-sans font-semibold text-slate-800 border-b border-slate-100 pb-2 pt-4">
              Failure Vectors: Multi-Hop Latency & The Desync Void
            </h4>
            <p>
              As outlined in the topology illustration above, the standard BBPS journey spans at least five processing nodes: the consumer handset, Cust-BBPOU gateway, central NPCI router, Biller-BBPOU gateway, and the biller's custom ERP database. 
            </p>
            <p>
              Because legacy utility companies manage hardware database clusters on slower mainframe connections, their transactional query processing clocks can exceed 1500ms. When consumer applications register a query timeout at 1000ms, a state of absolute system desynchronization arises. This creates the dreaded 'Double-Debit, Status Unknown' loop, where client funds are drawn from banking servers but fail to settle on utility networks, spiking customer support ticket rates instantly.
            </p>

            <SettlementReconciliationLoop />

            <h4 className="text-xl font-sans font-semibold text-slate-800 border-b border-slate-100 pb-2 pt-4 font-sans">
              API Optimization Protocols: Streamlined Playbook
            </h4>
            <p>
              To fix these architectural flaws, Abhishek designed a two-fold engineering treatment:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Unified Developer Payloads:</strong> By abstracting hundreds of biller formats into a standard structural schema on the aggregator gateway, developers can plug utility bills into checkout pages via a single API node, skipping individual integration pipelines.
              </li>
              <li>
                <strong>Background Auto-Query Loop:</strong> Rather than exiting a transaction session as failed during bank network timeouts, the core settlement engine initiates background auto-query retries every 10 seconds for the first minute. This safeguards checkouts and automatically updates transaction nodes to success once the banking callbacks reconcile.
              </li>
            </ol>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 my-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">Technical Key Takeaway</span>
              <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">
                "Payments infrastructure isn't defined by visual gimmicks. Net conversion increments require structured, dynamic error-reconciliation loops at the API level. Real PM impact comes from converting latency states into elegant fallback pathways that protect user confidence."
              </p>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
