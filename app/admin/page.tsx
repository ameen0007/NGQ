"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  createClientAccount, 
  getAllProfiles, 
  deleteClientAction, 
  resetClientPasswordAction,
  updateClientPlanAction,
  addWeeklyPerformanceAction,
  updateClientCapitalAction
} from "@/app/actions/admin";
import { supabase } from "@/lib/supabase";
import { 
  Building, 
  Briefcase, 
  Loader2, 
  CheckCircle2, 
  Trash2, 
  KeyRound, 
  ShieldCheck,
  TrendingUp,
  X,
  AlertCircle
} from "lucide-react";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function AdminDashboardPage() {
  const router = useRouter();
  
  // Auth & Profile
  const [profile, setProfile] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]); // ALL users
  const [isLoading, setIsLoading] = useState(true);

  // Modals Data
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [weeklyUpdateTarget, setWeeklyUpdateTarget] = useState<any | null>(null);
  const [passwordResetTarget, setPasswordResetTarget] = useState<any | null>(null);
  const [planChangeTarget, setPlanChangeTarget] = useState<any | null>(null);
  const [capitalUpdateTarget, setCapitalUpdateTarget] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  // Form Processing States
  const [formPending, setFormPending] = useState(false);
  
  // Form Message State
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });
  const [modalMessage, setModalMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    async function initAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData?.role !== "admin") {
        router.push("/portfolio");
        return;
      }

      setProfile({ ...profileData, email: session.user.email });
      await loadUsers();
      setIsLoading(false);
    }
    initAdmin();
  }, [router]);

  async function loadUsers() {
    const { data } = await getAllProfiles();
    if (data) setUsers(data);
  }

  const clearMessage = () => setModalMessage({ text: "", type: "" });

  // --- FORM HANDLERS ---
  async function handleCreateClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormPending(true);
    setFormMessage({ text: "", type: "" });
    const formData = new FormData(e.currentTarget);
    const result = await createClientAccount(formData);

    if (result.error) {
      setFormMessage({ text: result.error, type: "error" });
    } else {
      setFormMessage({ text: result.message || "Success", type: "success" });
      await loadUsers();
      setTimeout(() => {
        setFormMessage({ text: "", type: "" });
        setIsCreateClientOpen(false);
      }, 2000);
    }
    setFormPending(false);
  }

  async function handleWeeklyUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormPending(true);
    clearMessage();
    const formData = new FormData(e.currentTarget);
    
    // Auto-calculate profit from percentage
    const direction = formData.get("direction") as string;
    const percentage = parseFloat(formData.get("percentage") as string);
    
    const invested = Number(weeklyUpdateTarget.invested_fund) || 0;
    const multiplier = direction === "up" ? 1 : -1;
    const calculatedProfit = invested * (percentage / 100) * multiplier;
    
    // Only send profit. The backend action automatically determines the next week number!
    const apiData = new FormData();
    apiData.append("user_id", weeklyUpdateTarget.id);
    apiData.append("profit", calculatedProfit.toString());

    const res = await addWeeklyPerformanceAction(apiData);
    setFormPending(false);
    
    if (res.error) setModalMessage({ text: res.error, type: "error" });
    else {
      setModalMessage({ text: "Weekly performance beautifully recorded!", type: "success" });
      await loadUsers();
      setTimeout(() => setWeeklyUpdateTarget(null), 1500);
    }
  }

  async function handlePasswordReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormPending(true);
    clearMessage();
    const formData = new FormData(e.currentTarget);
    const newPwd = formData.get("password") as string;
    
    const res = await resetClientPasswordAction(passwordResetTarget.id, newPwd);
    setFormPending(false);

    if (res.error) setModalMessage({ text: res.error, type: "error" });
    else {
      setModalMessage({ text: "Password fully reset and secured!", type: "success" });
      setTimeout(() => setPasswordResetTarget(null), 1500);
    }
  }

  async function handlePlanChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormPending(true);
    clearMessage();
    const formData = new FormData(e.currentTarget);
    const newPlan = formData.get("service_type") as string;
    
    const res = await updateClientPlanAction(planChangeTarget.id, newPlan);
    setFormPending(false);

    if (res.error) setModalMessage({ text: res.error, type: "error" });
    else {
      setModalMessage({ text: "Strategy plan aggressively updated!", type: "success" });
      await loadUsers();
      setTimeout(() => setPlanChangeTarget(null), 1500);
    }
  }

  async function handleCapitalUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormPending(true);
    clearMessage();
    const formData = new FormData(e.currentTarget);
    const newCapital = parseFloat(formData.get("amount") as string);
    
    const res = await updateClientCapitalAction(capitalUpdateTarget.id, newCapital);
    setFormPending(false);

    if (res.error) setModalMessage({ text: res.error, type: "error" });
    else {
      setModalMessage({ text: "Capital precisely overwritten in ledger!", type: "success" });
      await loadUsers();
      setTimeout(() => setCapitalUpdateTarget(null), 1500);
    }
  }

  async function handleConfirmDelete() {
    setFormPending(true);
    clearMessage();
    const res = await deleteClientAction(deleteTarget.id);
    setFormPending(false);

    if (res.error) setModalMessage({ text: res.error, type: "error" });
    else {
      await loadUsers();
      setDeleteTarget(null);
    }
  }

  // --- STATS CALCULATION ---
  const clientsOnly = users.filter(u => u.role === "client");
  const totalInvestors = clientsOnly.length;
  const totalInvested = clientsOnly.reduce((sum, u) => sum + (Number(u.invested_fund) || 0), 0);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const InlineModalMessage = () => {
    if (!modalMessage.text) return null;
    return (
      <div className={`mb-6 p-4 rounded-xl flex gap-3 text-[13px] items-start ${
        modalMessage.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
      }`}>
        {modalMessage.type === "error" ? <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
        <p>{modalMessage.text}</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-12 pb-24 flex flex-col gap-10">
      
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 border-b border-neutral-500/10 pb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">System Dashboard</h1>
          <span className="bg-neutral-500/10 border border-neutral-500/20 text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full shadow-sm">
            Admin View
          </span>
        </div>

        <div className="flex items-center gap-4 bg-transparent border border-neutral-500/20 rounded-full p-1.5 pr-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#FFDD33] flex items-center justify-center border-2 border-inherit shadow-sm overflow-hidden shrink-0">
             <svg viewBox="0 0 24 24" className="w-7 h-7 text-neutral-800" fill="currentColor">
               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
             </svg>
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-[13px] font-bold leading-tight">{profile?.name || "Admin"}</span>
            {profile?.email === 'ameencrews@gmail.com' ? (
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-amber-500">System Developer</span>
            ) : (
              <span className="text-[10px] font-bold tracking-[0.1em] text-[#A28822] uppercase">Admin</span>
            )}
          </div>
        </div>
      </header>

      <section>
        <button 
          onClick={() => { clearMessage(); setIsCreateClientOpen(true); }}
          className="group flex items-center justify-center lg:justify-start gap-4 bg-[#FFDD33] text-black w-full md:w-auto p-5 lg:px-8 lg:py-4 rounded-2xl hover:bg-[#EBC92C] transition-all duration-300 hover:-translate-y-1 shadow-lg active:scale-[0.98]"
        >
          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Building className="w-5 h-5 text-black" />
          </div>
          <div className="text-left">
            <h3 className="text-[16px] font-bold leading-tight uppercase tracking-wide">Register New Client</h3>
          </div>
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-500/5 rounded-[2rem] border border-neutral-500/10 p-8 md:p-10 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
          <Briefcase className="w-6 h-6 opacity-30 mb-6" />
          <h3 className="text-[10px] font-bold tracking-[0.1em] uppercase mb-2">Total Active Investors</h3>
          <span className="text-4xl font-bold tracking-tight">{totalInvestors}</span>
        </div>
        
        <div className="bg-neutral-500/5 rounded-[2rem] border border-neutral-500/10 p-8 md:p-10 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
          <TrendingUp className="w-6 h-6 opacity-30 mb-6" />
          <h3 className="text-[10px] font-bold tracking-[0.1em] uppercase mb-2">Total Invested (AUM)</h3>
          <span className="text-4xl font-bold tracking-tight">₹{totalInvested.toLocaleString()}</span>
        </div>
      </section>

      {/* MASTER USER TABLE */}
      <section className="bg-neutral-500/5 rounded-[2rem] border border-neutral-500/10 shadow-sm p-6 md:p-10 overflow-hidden flex flex-col min-h-[500px]">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Network User Directory</h2>
            <p className="text-[13px] opacity-60">Manage all internal admins and deployed client portfolios.</p>
          </div>
          {/* Inline message for overall actions */}
          <div className="min-h-[40px]">
             <InlineModalMessage />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-neutral-500/10 text-[10px] uppercase tracking-widest opacity-50">
                <th className="pb-4 font-bold pl-4">User Identity</th>
                <th className="pb-4 font-bold">System Role</th>
                <th className="pb-4 font-bold">Strategy / Plan</th>
                <th className="pb-4 font-bold">Invested Fund</th>
                <th className="pb-4 font-bold text-right pr-4">Management Controls</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
               {users.map(user => (
                 <tr key={user.id} className="border-b border-neutral-500/5 hover:bg-neutral-500/5 transition-colors group">
                   <td className="py-5 pl-4 font-bold text-[15px]">{user.name}</td>
                   <td className="py-5">
                     {user.email === 'ameencrews@gmail.com' ? (
                       <span className="bg-amber-500/10 text-amber-600 border border-amber-500/30 px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                         <ShieldCheck className="w-3 h-3"/> System Developer
                       </span>
                     ) : user.role === 'admin' ? (
                       <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                         <ShieldCheck className="w-3 h-3"/> Internal Admin
                       </span>
                     ) : (
                       <span className="bg-teal-500/10 text-teal-600 border border-teal-500/20 px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider w-max block">
                         Client Portfolio
                       </span>
                     )}
                   </td>
                   <td className="py-5">
                      {user.role === 'client' ? (
                        <span className={`font-semibold ${user.service_type === 'low' ? 'text-[#A28822]' : 'text-emerald-500'}`}>
                          {user.service_type === 'low' ? 'Low Risk' : 'Medium Risk'}
                        </span>
                      ) : (
                         <span className="opacity-30">N/A</span>
                      )}
                   </td>
                   <td className="py-5 font-semibold">
                      {user.role === 'client' ? `₹${Number(user.invested_fund).toLocaleString()}` : <span className="opacity-30">N/A</span>}
                   </td>
                   <td className="py-5 pr-4 flex items-center justify-end gap-2">
                      {user.role === 'admin' ? (
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-30 pr-2">Protected Node</span>
                      ) : (
                        <div className="flex gap-2 opacity-100 transition-opacity flex-wrap justify-end">
                          
                          <button 
                            onClick={() => { clearMessage(); setCapitalUpdateTarget(user); }}
                            className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors border border-purple-500/20"
                          >
                            Capital
                          </button>

                          <button 
                            onClick={() => { clearMessage(); setWeeklyUpdateTarget(user); }}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors border border-emerald-500/20"
                          >
                            Week Update
                          </button>

                          <button 
                            onClick={() => { clearMessage(); setPlanChangeTarget(user); }}
                            className="bg-neutral-500/10 hover:bg-neutral-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors border border-neutral-500/20"
                          >
                            Change Plan
                          </button>

                          <button 
                            onClick={() => { clearMessage(); setPasswordResetTarget(user); }}
                            className="bg-neutral-500/10 hover:bg-neutral-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors border border-neutral-500/20"
                          >
                            Reset PWD
                          </button>

                          <button 
                            onClick={() => { clearMessage(); setDeleteTarget(user); }}
                            className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20 ml-2"
                            title="Delete Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                   </td>
                 </tr>
               ))}
               {users.length === 0 && (
                 <tr>
                   <td colSpan={5} className="py-10 text-center opacity-50 text-[13px]">No users explicitly registered within the system yet.</td>
                 </tr>
               )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ======= MODALS ======= */}

      {/* CREATE REGISTRATION MODAL */}
      {isCreateClientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[500px] rounded-3xl p-8 relative shadow-2xl">
             <button onClick={() => setIsCreateClientOpen(false)} className="absolute top-6 right-6 opacity-50 hover:opacity-100">
               <X className="w-5 h-5" />
             </button>
             <h2 className="text-2xl font-bold mb-2">Onboard New Client</h2>
             <p className="text-[13px] text-neutral-500 mb-6">Securely register a new investor profile.</p>

             {formMessage.text && (
                <div className={`mb-6 p-4 rounded-xl flex gap-3 text-[13px] items-start ${
                  formMessage.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                }`}>
                  {formMessage.type === "error" ? <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
                  <p>{formMessage.text}</p>
                </div>
              )}

             <form onSubmit={handleCreateClient} className="flex flex-col gap-4">
                <input name="name" type="text" required placeholder="Full Name" className="w-full bg-[#F9FAFB] border border-neutral-200 focus:border-neutral-400 rounded-xl px-4 py-3 text-[14px] outline-none" />
                <input name="email" type="email" required placeholder="Email Address" className="w-full bg-[#F9FAFB] border border-neutral-200 focus:border-neutral-400 rounded-xl px-4 py-3 text-[14px] outline-none" />
                <input name="password" type="text" minLength={6} required placeholder="Initial Password" className="w-full bg-[#F9FAFB] border border-neutral-200 focus:border-neutral-400 rounded-xl px-4 py-3 text-[14px] outline-none" />
                
                <div className="grid grid-cols-2 gap-4">
                  <input name="invested_fund" type="number" required placeholder="Initial Row Deposit (₹)" className="w-full bg-[#F9FAFB] border border-neutral-200 focus:border-neutral-400 rounded-xl px-4 py-3 text-[14px] outline-none" />
                  <select name="service_type" className="w-full bg-[#F9FAFB] border border-neutral-200 focus:border-neutral-400 rounded-xl px-4 py-3 text-[14px] outline-none appearance-none">
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                  </select>
                </div>

                <button disabled={formPending} type="submit" className="w-full mt-2 bg-black text-white font-bold text-[14px] py-3.5 rounded-xl hover:bg-neutral-800 transition-all flex justify-center items-center">
                  {formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Identity"}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* WEEKLY UPDATE MODAL */}
      {weeklyUpdateTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[400px] rounded-3xl p-8 relative shadow-2xl">
             <button onClick={() => setWeeklyUpdateTarget(null)} className="absolute top-6 right-6 opacity-50 hover:opacity-100">
               <X className="w-5 h-5" />
             </button>
             <h2 className="text-xl font-bold mb-1">Add Weekly Profit</h2>
             <p className="text-[12px] text-neutral-500 mb-4">Target: {weeklyUpdateTarget.name}</p>

             <InlineModalMessage />

             <form onSubmit={handleWeeklyUpdate} className="flex flex-col gap-4">
                {/* Note: the week number is now calculated automatically in the backend. I completely removed the Week Number input from the frontend here! */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1 block">Direction</label>
                    <select name="direction" className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl px-4 py-3 text-[14px] outline-none appearance-none">
                      <option value="up">Bullish (Up)</option>
                      <option value="down">Bearish (Down)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1 block">Movement %</label>
                    <input name="percentage" type="number" step="0.01" min="0" required placeholder="e.g. 2.5" className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl px-4 py-3 text-[14px] outline-none" />
                  </div>
                </div>
                <button disabled={formPending} type="submit" className="w-full mt-2 bg-emerald-500 text-white font-bold text-[14px] py-3.5 rounded-xl hover:bg-emerald-600 transition-all flex justify-center items-center">
                  {formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Report"}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* CAPITAL UPDATE MODAL */}
      {capitalUpdateTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[400px] rounded-3xl p-8 relative shadow-2xl">
             <button onClick={() => setCapitalUpdateTarget(null)} className="absolute top-6 right-6 opacity-50 hover:opacity-100">
               <X className="w-5 h-5" />
             </button>
             <h2 className="text-xl font-bold mb-1">Set Capital Balance</h2>
             <p className="text-[12px] text-neutral-500 mb-4">Target: {capitalUpdateTarget.name} (Current: ₹{Number(capitalUpdateTarget.invested_fund).toLocaleString()})</p>

             <InlineModalMessage />

             <form onSubmit={handleCapitalUpdate} className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1 block">New Total Invested Fund (₹)</label>
                  <input name="amount" type="number" required placeholder="e.g. 50000" defaultValue={capitalUpdateTarget.invested_fund} className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl px-4 py-3 text-[14px] outline-none" />
                </div>
                <button disabled={formPending} type="submit" className="w-full mt-2 bg-purple-600 text-white font-bold text-[14px] py-3.5 rounded-xl hover:bg-purple-700 transition-all flex justify-center items-center">
                  {formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Overwrite Capital"}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* PLAN CHANGE MODAL */}
      {planChangeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[400px] rounded-3xl p-8 relative shadow-2xl">
             <button onClick={() => setPlanChangeTarget(null)} className="absolute top-6 right-6 opacity-50 hover:opacity-100">
               <X className="w-5 h-5" />
             </button>
             <h2 className="text-xl font-bold mb-1">Change Strategy Plan</h2>
             <p className="text-[12px] text-neutral-500 mb-4">Target: {planChangeTarget.name} (Currently {planChangeTarget.service_type === 'low' ? 'Low Risk' : 'Medium Risk'})</p>

             <InlineModalMessage />

             <form onSubmit={handlePlanChange} className="flex flex-col gap-4">
                <select name="service_type" defaultValue={planChangeTarget.service_type} className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl px-4 py-3 text-[14px] outline-none appearance-none">
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                </select>
                <button disabled={formPending} type="submit" className="w-full mt-2 bg-black text-white font-bold text-[14px] py-3.5 rounded-xl hover:bg-neutral-800 transition-all flex justify-center items-center">
                  {formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm New Plan"}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* PASSWORD RESET MODAL */}
      {passwordResetTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[400px] rounded-3xl p-8 relative shadow-2xl">
             <button onClick={() => setPasswordResetTarget(null)} className="absolute top-6 right-6 opacity-50 hover:opacity-100">
               <X className="w-5 h-5" />
             </button>
             <h2 className="text-xl font-bold mb-1">Reset Credential Key</h2>
             <p className="text-[12px] text-neutral-500 mb-4">Target: {passwordResetTarget.name}</p>

             <InlineModalMessage />

             <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                <input name="password" type="text" required minLength={6} placeholder="Type new password..." className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl px-4 py-3 text-[14px] outline-none" />
                <button disabled={formPending} type="submit" className="w-full mt-2 bg-black text-white font-bold text-[14px] py-3.5 rounded-xl hover:bg-neutral-800 transition-all flex justify-center items-center">
                  {formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Force Reset"}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[400px] rounded-3xl p-8 relative shadow-2xl">
             <button onClick={() => setDeleteTarget(null)} className="absolute top-6 right-6 opacity-50 hover:opacity-100">
               <X className="w-5 h-5" />
             </button>
             <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
               <AlertCircle className="w-6 h-6 text-red-500" />
             </div>
             <h2 className="text-xl font-bold mb-1 text-red-600">Permanently Erase Identity</h2>
             <p className="text-[13px] text-neutral-500 mb-6">Are you absolutely sure you want to permanently delete <strong className="text-black">{deleteTarget.name}</strong> from the database? This action cannot be reversed.</p>

             <InlineModalMessage />

             <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => setDeleteTarget(null)} 
                  className="flex-1 bg-neutral-100 text-neutral-600 font-bold text-[13px] py-3.5 rounded-xl hover:bg-neutral-200 transition-all"
                >
                  Cancel Action
                </button>
                <button 
                  onClick={handleConfirmDelete}
                  disabled={formPending}
                  className="flex-1 bg-red-500 text-white font-bold text-[13px] py-3.5 rounded-xl hover:bg-red-600 transition-all flex justify-center items-center"
                >
                  {formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Yes, Erase Identity"}
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
