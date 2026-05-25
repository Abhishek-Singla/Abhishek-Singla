import { useState } from "react";
import { motion } from "motion/react";
import { Check, AlertTriangle, ArrowRight, ShieldCheck, Database, Server, Smartphone, Cpu } from "lucide-react";

export function BBPSEcosystemMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: "user", label: "01. Consumer", desc: "Initiates payment request on the customer app", icon: Smartphone, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "cou", label: "02. Customer BBPOU", desc: "Aggregates payment request & routes to central network", icon: Server, color: "text-purple-600 bg-purple-50 border-purple-200" },
    { id: "npci", label: "03. Central BBPCU", desc: "Clears & routes transactions to biller networks", icon: Cpu, color: "text-amber-600 bg-amber-50 border-amber-200" },
    { id: "bou", label: "04. Biller BBPOU", desc: "Settles disputes & schedules batch postings", icon: Database, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "biller", label: "05. Utility Biller", desc: "Core database of electricity, telecom, water bills", icon: ShieldCheck, color: "text-rose-600 bg-rose-50 border-rose-200" }
  ];

  return (
    <div id="bbps-ecosystem-map" className="border border-slate-100 rounded-2xl bg-slate-50/50 p-6 md:p-8">
      <div className="mb-6">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">System Topology</span>
        <h4 className="text-lg font-sans font-medium text-slate-800 mt-2">The Multi-Hop BBPS Transaction Journey</h4>
        <p className="text-sm text-slate-500 mt-1">
          Hover over each node to see friction telemetry & latency stats. A single timeout across this 5-hop hopchain causes transaction status failure.
        </p>
      </div>

      {/* Nodes visual flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {nodes.map((node, index) => {
          const NodeIcon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              id={`bbps-node-${node.id}`}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative cursor-pointer transition-all duration-300 rounded-xl border p-4 bg-white shadow-xs ${
                isActive ? "border-slate-800 shadow-sm scale-102 ring-2 ring-slate-100" : "border-slate-100"
              }`}
            >
              <div className="flex items-center md:flex-col md:text-center md:items-center gap-3">
                <div className={`p-2.5 rounded-lg border ${node.color} flex items-center justify-center`}>
                  <NodeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans font-medium text-sm text-slate-800">{node.label}</h5>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 md:hidden lg:line-clamp-2">{node.desc}</p>
                </div>
              </div>

              {/* Connected Arrow */}
              {index < 4 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 bg-white border border-slate-100 rounded-full p-0.5 shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel based on active node hover */}
      <div className="mt-6 bg-white border border-slate-100 rounded-xl p-4 min-h-[96px] flex flex-col justify-center">
        {activeNode ? (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Friction Level</span>
              <p className="text-sm font-sans font-medium text-slate-800 mt-1">
                {activeNode === "user" && "Minimal (Checkout UI)"}
                {activeNode === "cou" && "Medium (Aggregator Network)"}
                {activeNode === "npci" && "Very Low (NPCI Central Engine)"}
                {activeNode === "bou" && "High (Biller-BBPOU reconciliation)"}
                {activeNode === "biller" && "Extremely High (Legacy Biller ERPs)"}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Avg. Latency Penalty</span>
              <p className="text-sm font-sans font-medium text-slate-800 mt-1">
                {activeNode === "user" && "50ms (App render)"}
                {activeNode === "cou" && "180ms - 220ms (Query forward)"}
                {activeNode === "npci" && "40ms (High performance clear)"}
                {activeNode === "bou" && "350ms - 800ms (Response parsing)"}
                {activeNode === "biller" && "800ms - 1500ms (Database lookup)"}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">PM Mitigation Strategy</span>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeNode === "user" && "Autofill billing details and surface local cache immediately."}
                {activeNode === "cou" && "Implement multi-thread query pools to keep websocket pipes unblocked."}
                {activeNode === "npci" && "Pre-validation protocols to restrict faulty payload formats before routing."}
                {activeNode === "bou" && "Enrich payload headers for automated dispute flag allocation on timeouts."}
                {activeNode === "biller" && "Implement Abhishek's dynamic fallback polling loops to bypass direct DB lock states."}
              </p>
            </div>
          </motion.div>
        ) : (
          <p className="text-sm text-slate-400 text-center italic">
            💡 Hover over the system topology blocks above to inspect core transaction latency and PM defense strategies.
          </p>
        )}
      </div>
    </div>
  );
}

export function SettlementReconciliationLoop() {
  const [useAutoQueryLoop, setUseAutoQueryLoop] = useState(false);

  return (
    <div id="settlement-reconciliation-loop" className="border border-slate-100 rounded-2xl bg-white p-6 md:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 bg-amber-50 border border-amber-100 px-2 py-1 rounded">
            PM Architecture Treatment
          </span>
          <h4 className="text-lg font-sans font-medium text-slate-800 mt-2">Solving the 'Double Debit' Lock</h4>
          <p className="text-sm text-slate-500 mt-1">
            Toggle the toggle below to compare legacy wait processes against Abhishek's high-converting Auto-Query loop.
          </p>
        </div>

        {/* Toggle Option */}
        <div id="reconciliation-toggle-container" className="flex items-center bg-slate-100 p-1 rounded-lg self-start md:self-center">
          <button
            id="toggle-legacy"
            type="button"
            onClick={() => setUseAutoQueryLoop(false)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all ${
              !useAutoQueryLoop ? "bg-white text-slate-800 shadow-2xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Legacy Path (Manual)
          </button>
          <button
            id="toggle-optimized"
            type="button"
            onClick={() => setUseAutoQueryLoop(true)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all ${
              useAutoQueryLoop ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Abhishek's Auto-Query
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Animated Diagram Map */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-xl p-6 min-h-[300px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase">State Machine Sim</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${useAutoQueryLoop ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className="text-xs font-mono font-medium text-slate-600">
                {useAutoQueryLoop ? "Active Dynamic Engine" : "Passive Delay State"}
              </span>
            </div>
          </div>

          {/* Sequence diagram UI */}
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-slate-400" />
                Customer Debit
              </div>
              <div className="h-[2px] bg-slate-200 flex-1 mx-3 relative">
                <div className="absolute inset-y-0 left-0 bg-blue-500 w-full animate-[shimmer_2s_infinite]" />
              </div>
              <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5">
                <Server className="w-4 h-4 text-slate-400" />
                Aggregator Gateway
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-28 text-center" />
              <div className="flex-1 flex flex-col items-center">
                {useAutoQueryLoop ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono p-2 rounded-lg text-center"
                  >
                    🚀 Auto-Query pinging: 10s... 20s... Verified!
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono p-2 rounded-lg text-center"
                  >
                    ⚠️ Timeout. Awaiting Manual Reconciliation (T+2)
                  </motion.div>
                )}
              </div>
              <div className="w-28 text-center" />
            </div>

            <div className="flex items-center justify-between">
              <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5">
                <Server className="w-4 h-4 text-slate-400" />
                Aggregator Gateway
              </div>
              <div className="h-[2px] bg-slate-200 flex-1 mx-3 relative">
                <div className={`absolute inset-y-0 left-0 ${useAutoQueryLoop ? "bg-emerald-500 animate-[shimmer_1.5s_infinite]" : "bg-red-300"} w-full`} />
              </div>
              <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5">
                <Database className="w-4 h-4 text-slate-400" />
                Biller Database
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-slate-400">Outcome Comparison</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Net Success:</span>
                <span className={useAutoQueryLoop ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
                  {useAutoQueryLoop ? "99.85%" : "91.20%"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Support Tickets:</span>
                <span className={useAutoQueryLoop ? "text-emerald-700 font-semibold" : "text-red-700 font-semibold"}>
                  {useAutoQueryLoop ? "-35%" : "Baseline (+42% spike)"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative Copy */}
        <div className="lg:col-span-5 space-y-4">
          <h5 className="font-sans font-medium text-slate-800 text-base">
            {useAutoQueryLoop ? "Optimized Process Flow" : "Legacy Checkout Pitfalls"}
          </h5>
          <p className="text-sm text-slate-600 leading-relaxed">
            {useAutoQueryLoop
              ? "With Abhishek's recommended Loop design, when a timeout is registered, the frontend isn't abandoned with a 'failed' message. Instead, the merchant core launches automated secure status queries behind the scenes, ensuring that 99% of transient debit syncs resolve in under 30 seconds."
              : "In the legacy system, a network timeout immediately kills the transaction flow. The customer sees an error page, although their account is debited. This drives immediate customer distress, high support tickets, and destroys the merchant conversion funnel."}
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Product Deliverables</span>
            <ul className="text-xs text-slate-600 mt-2 space-y-2">
              <li className="flex items-start gap-2">
                {useAutoQueryLoop ? (
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <span>
                  {useAutoQueryLoop
                    ? "Immediate payment credit reduces client settlement lag."
                    : "Merchant faces high churn & cart abondanment."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                {useAutoQueryLoop ? (
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <span>
                  {useAutoQueryLoop
                    ? "Eliminates duplicate manual dispute tracking files."
                    : "Spikes manual accounting overhead at T+2."}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
