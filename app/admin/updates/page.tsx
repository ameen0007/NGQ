"use client";

import { useState, useEffect } from "react";
import { getRecentUpdatesAction, revertUpdateAction } from "@/app/actions/admin";
import { Loader2, TrendingUp, TrendingDown, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function ClientUpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formPending, setFormPending] = useState(false);
  const [revertTarget, setRevertTarget] = useState<any | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    loadUpdates();
  }, []);

  async function loadUpdates() {
    const { data } = await getRecentUpdatesAction();
    if (data) setUpdates(data);
    setIsLoading(false);
  }

  async function handleConfirmRevert() {
    if (!revertTarget) return;
    
    setFormPending(true);
    setMessage({ text: "", type: "" });
    const res = await revertUpdateAction(revertTarget.user_id, revertTarget.week, revertTarget.year);
    setFormPending(false);

    if (res.error) {
      setMessage({ text: res.error, type: "error" });
    } else {
      setMessage({ text: "Update successfully reverted. Client record restored.", type: "success" });
      await loadUpdates();
    }
    setRevertTarget(null);
  }

  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-8 lg:p-12 pb-24 flex flex-col gap-10 animate-in fade-in duration-500">
      <header className="flex flex-col gap-2 border-b border-neutral-500/10 pb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Client Updates Log</h1>
          <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full shadow-sm">
            Live Feed
          </span>
        </div>
        <p className="text-neutral-500 text-[14px]">Historical track record of all individually reported weekly portfolio performances.</p>
      </header>

      {message.text && (
        <div className={`p-4 rounded-xl flex gap-3 text-[13px] items-start ${
          message.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
        }`}>
          {message.type === "error" ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <p className="font-medium mt-0.5">{message.text}</p>
        </div>
      )}

      <section className="bg-neutral-500/5 rounded-[2rem] border border-neutral-500/10 shadow-sm p-6 md:p-10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
             <thead>
               <tr className="border-b border-neutral-500/10 text-[10px] uppercase tracking-widest opacity-50">
                 <th className="pb-4 font-bold pl-4">Client Identity</th>
                 <th className="pb-4 font-bold">Timeline Point</th>
                 <th className="pb-4 font-bold">Market Direction & %</th>
                 <th className="pb-4 font-bold">Generated Value (₹)</th>
                 <th className="pb-4 font-bold text-right pr-4">Action Oversight</th>
               </tr>
             </thead>
             <tbody className="text-[13px]">
               {updates.map((update, idx) => {
                 const isBullish = update.profit >= 0;
                 const baseFund = update.investedFund || 0;
                 // Attempt to get an exact percentage based on the invested fund vs profit
                 const percentString = baseFund > 0 ? ((Math.abs(update.profit) / baseFund) * 100).toFixed(2) : "0.00";

                 return (
                   <tr key={idx} className="border-b border-neutral-500/5 hover:bg-neutral-500/5 transition-colors group">
                     <td className="py-5 pl-4 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-black/20 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-neutral-400">
                         {update.clientName.charAt(0).toUpperCase()}
                       </div>
                       <span className="font-bold text-[15px]">{update.clientName}</span>
                     </td>
                     <td className="py-5">
                       <span className="bg-neutral-200/80 dark:bg-white/5 border border-neutral-300 dark:border-white/10 px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider">
                         Week {update.week}, {update.year}
                       </span>
                     </td>
                     <td className="py-5">
                       {isBullish ? (
                         <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-max">
                           <TrendingUp className="w-3.5 h-3.5"/> Bullish (+{percentString}%)
                         </span>
                       ) : (
                         <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-max">
                           <TrendingDown className="w-3.5 h-3.5"/> Bearish (-{percentString}%)
                         </span>
                       )}
                     </td>
                     <td className="py-5">
                       <span className={`text-[16px] font-bold ${isBullish ? "text-emerald-500" : "text-red-500"}`}>
                         {isBullish ? "+" : "-"}₹{Math.abs(update.profit).toLocaleString()}
                       </span>
                     </td>
                     <td className="py-5 pr-4 flex justify-end">
                       <button
                         onClick={() => setRevertTarget(update)}
                         disabled={formPending}
                         className="flex items-center gap-1.5 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-red-500/20 transition-all disabled:opacity-50"
                       >
                         {formPending && revertTarget?.user_id === update.user_id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                         Revert
                       </button>
                     </td>
                   </tr>
                 );
               })}
               {updates.length === 0 && (
                 <tr>
                   <td colSpan={5} className="py-14 text-center opacity-50 text-[13px] font-medium tracking-wide">No performance metrics have been recorded recently.</td>
                 </tr>
               )}
             </tbody>
          </table>
        </div>
      </section>

      {/* REVERT CONFIRMATION MODAL */}
      {revertTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[400px] rounded-3xl p-8 relative shadow-2xl">
             <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
               <AlertCircle className="w-6 h-6 text-red-500" />
             </div>
             <h2 className="text-xl font-bold mb-1 text-red-600">Revert Weekly Update</h2>
             <p className="text-[13px] text-neutral-500 mb-6">
               Are you absolutely sure you want to revert the update for <strong className="text-black">{revertTarget.clientName}</strong> at W{revertTarget.week} {revertTarget.year}? The recorded value of <strong className="text-black">{revertTarget.profit >= 0 ? "+" : "-"}₹{Math.abs(revertTarget.profit).toLocaleString()}</strong> will be permanently erased.
             </p>

             <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => setRevertTarget(null)} 
                  disabled={formPending}
                  className="flex-1 bg-neutral-100 text-neutral-600 font-bold text-[13px] py-3.5 rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50"
                >
                  Cancel Revert
                </button>
                <button 
                  onClick={handleConfirmRevert}
                  disabled={formPending}
                  className="flex-1 bg-red-500 text-white font-bold text-[13px] py-3.5 rounded-xl hover:bg-red-600 transition-all flex justify-center items-center disabled:opacity-50"
                >
                  {formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Yes, Revert Update"}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
