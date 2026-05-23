"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientAccount, getAllProfiles } from "@/app/actions/admin";
import ClientForm from "@/components/ClientForm";
import { supabase } from "@/lib/supabase";
import {
  Building,
  Loader2,
  CheckCircle2,
  X,
  AlertCircle,
  User,
  FileText,
  Heart,
  Shield,
  Target,
  ChevronDown,
  ShieldCheck,
  Mail,
  Plus,
  Trash2,
  Briefcase,
  TrendingUp,
  Activity,
  Home
} from "lucide-react";
import SkeletonLoader from "@/components/SkeletonLoader";
import RiskProfilerModal from "@/components/RiskProfilerModal";

// ── Dropdown Options ────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  { value: "wealth_management", label: "Wealth Management" },
  { value: "real_estate", label: "Real Estate" },
];
const RISK_PROFILE_OPTIONS = [
  { value: "", label: "Select risk profile..." },
  { value: "conservative", label: "Conservative" },
  { value: "moderate", label: "Moderate" },
  { value: "aggressive", label: "Aggressive" },
];
const LEAD_SOURCE_OPTIONS = [
  { value: "", label: "Select source..." },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "referral", label: "Referral" },
  { value: "walk_in", label: "Walk-in" },
  { value: "other", label: "Other" },
];
const MARITAL_STATUS_OPTIONS = [
  { value: "", label: "Select status..." },
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
];
const NOMINEE_RELATIONSHIP_OPTIONS = [
  { value: "", label: "Select relationship..." },
  { value: "spouse", label: "Spouse" },
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "other", label: "Other" },
];
const GOAL_TYPES = [
  { value: "Retirement", label: "Retirement" },
  { value: "Child Education", label: "Child Education" },
  { value: "Marriage", label: "Marriage" },
  { value: "House Purchase", label: "House Purchase" },
  { value: "Wealth Creation", label: "Wealth Creation" },
  { value: "Passive Income", label: "Passive Income" },
  { value: "Tax Saving", label: "Tax Saving" },
  { value: "Business Expansion", label: "Business Expansion" },
];
const PRIORITY_OPTIONS = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];
const DEPENDENT_TYPES = [
  { value: "spouse", label: "Spouse" },
  { value: "children", label: "Children" },
  { value: "parents", label: "Parents" },
  { value: "siblings", label: "Siblings" },
];

function SectionHeader({ icon: Icon, title, advanced = false }: { icon: any; title: string; advanced?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 pt-4 pb-1 border-t mt-2 ${advanced ? "border-indigo-100" : "border-neutral-100"}`}>
      <Icon className={`w-4 h-4 ${advanced ? "text-indigo-400" : "text-neutral-400"}`} />
      <span className={`text-[11px] font-bold uppercase tracking-[0.12em] ${advanced ? "text-indigo-500" : "text-neutral-400"}`}>
        {title} {advanced && <span className="text-indigo-300 ml-1">(Advanced)</span>}
      </span>
    </div>
  );
}

function Toggle({ label, value, onChange, optional }: { label: string; value: boolean; onChange: (v: boolean) => void; optional?: boolean }) {
  return (
    <div>
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-500 block mb-2">
        {label} {optional && <span className="text-neutral-300 font-normal normal-case tracking-normal ml-1">(optional)</span>}
      </span>
      <div className="flex items-center gap-0 rounded-xl overflow-hidden border border-neutral-200 w-fit">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`px-5 py-3 text-[14px] font-semibold transition-all duration-150 ${value ? "bg-black text-white" : "bg-[#F9FAFB] text-neutral-400 hover:bg-neutral-100"}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`px-5 py-3 text-[14px] font-semibold transition-all duration-150 ${!value ? "bg-black text-white" : "bg-[#F9FAFB] text-neutral-400 hover:bg-neutral-100"}`}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [isRiskProfilerOpen, setIsRiskProfilerOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formPending, setFormPending] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });
  const [admins, setAdmins] = useState<any[]>([]);

  // ── BASIC STATE ──
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const [whatsappValue, setWhatsappValue] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [singleEarning, setSingleEarning] = useState(false);

  // ── ADVANCED STATES ──
  // Income & Cash Flow
  const [incSelf, setIncSelf] = useState<number>(0);
  const [incSpouse, setIncSpouse] = useState<number>(0);
  const [incOther, setIncOther] = useState<number>(0);
  const [expMonthly, setExpMonthly] = useState<number>(0);
  const [expEmi, setExpEmi] = useState<number>(0);

  // Family Resp
  const [dependentTypes, setDependentTypes] = useState<string[]>([]);
  const [elderlyDependent, setElderlyDependent] = useState(false);
  const [childEdResp, setChildEdResp] = useState(false);

  // Assets
  const [astBank, setAstBank] = useState<number>(0);
  const [astFd, setAstFd] = useState<number>(0);
  const [astMf, setAstMf] = useState<number>(0);
  const [astStocks, setAstStocks] = useState<number>(0);
  const [astGold, setAstGold] = useState<number>(0);
  const [astRe, setAstRe] = useState<number>(0);
  const [astOther, setAstOther] = useState<number>(0);

  // Liabilities
  const [liaHome, setLiaHome] = useState<number>(0);
  const [liaPersonal, setLiaPersonal] = useState<number>(0);
  const [liaVehicle, setLiaVehicle] = useState<number>(0);
  const [liaCc, setLiaCc] = useState<number>(0);
  const [liaOther, setLiaOther] = useState<number>(0);

  // Protection
  const [hasHealthIns, setHasHealthIns] = useState(false);
  const [hasLifeIns, setHasLifeIns] = useState(false);
  const [hasCriticalIllness, setHasCriticalIllness] = useState(false);
  const [familyCovered, setFamilyCovered] = useState(false);

  // Investment Profile
  const [hasSip, setHasSip] = useState(false);
  const [hasDirectStocks, setHasDirectStocks] = useState(false);
  const [hasPms, setHasPms] = useState(false);
  const [retirementStarted, setRetirementStarted] = useState(false);
  const [hasEmergencyFund, setHasEmergencyFund] = useState(false);

  // Financial Goals (Dynamic Array)
  const [advancedGoals, setAdvancedGoals] = useState<{ id: number; type: string; amount: string; year: string; priority: string }[]>([]);

  useEffect(() => {
    async function initAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData?.role !== "admin") { router.push("/portfolio"); return; }
      setProfile({ ...profileData, email: session.user.email });

      const { data: allProfiles } = await getAllProfiles();
      if (allProfiles) {
        setAdmins(allProfiles.filter(p => p.role === "admin"));
      }
      setIsLoading(false);
    }
    initAdmin();
  }, [router]);

  async function handleCreateClient(formData: FormData) {
    setFormPending(true);
    setFormMessage({ text: "", type: "" });

    const result = await createClientAccount(formData);
    if (result.error) {
      setFormMessage({ text: result.error, type: "error" });
    } else {
      setFormMessage({ text: result.message || "Client registered successfully!", type: "success" });
      setTimeout(() => { setIsCreateClientOpen(false); }, 2000);
    }
    setFormPending(false);
  }

  if (isLoading) return <SkeletonLoader />;

  const input = "w-full bg-[#F9FAFB] border border-neutral-200 focus:border-neutral-400 rounded-xl px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-neutral-400";
  const numInput = (val: number, setVal: any, ph: string) => (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-neutral-400 font-medium">₹</span>
      <input type="number" min="0" value={val || ""} onChange={e => setVal(Number(e.target.value))} placeholder={ph} className={`${input} pl-8`} />
    </div>
  );
  const label = "text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-500 mb-2 block";
  const opt = <span className="text-neutral-300 font-normal normal-case tracking-normal ml-1">(optional)</span>;
  const req = <span className="text-red-400 ml-0.5">*</span>;

  const Chip = ({ value, options, toggle }: { value: string[]; options: { value: string; label: string }[]; toggle: (v: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(o => {
        const sel = value.includes(o.value);
        return (
          <button key={o.value} type="button" onClick={() => toggle(o.value)}
            className={`px-5 py-2.5 rounded-xl text-[14px] font-semibold border transition-all duration-150 ${sel ? "bg-[#FFDD33] text-black border-[#FFDD33] shadow-sm" : "bg-[#F9FAFB] text-neutral-600 border-neutral-200 hover:border-neutral-400"}`}>
            {o.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-12 pb-24 flex flex-col gap-10">

      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 border-b border-neutral-500/10 pb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">System Dashboard</h1>
          <span className="bg-neutral-500/10 border border-neutral-500/20 text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full">Admin View</span>
        </div>
        <div className="flex items-center gap-4 bg-transparent border border-neutral-500/20 rounded-full p-1.5 pr-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#FFDD33] flex items-center justify-center border-2 border-inherit overflow-hidden shrink-0">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-neutral-800" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-[13px] font-bold leading-tight">{profile?.name || "Admin"}</span>
            {profile?.email === "ameencrews@gmail.com"
              ? <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-amber-500">System Developer</span>
              : <span className="text-[10px] font-bold tracking-[0.1em] text-[#A28822] uppercase">Admin</span>}
          </div>
        </div>
      </header>

      {/* Action Buttons */}
      <section className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => { setIsCreateClientOpen(true); }}
          className="group flex-1 flex items-center justify-center lg:justify-start gap-4 bg-[#FFDD33] text-black p-5 lg:px-8 lg:py-4 rounded-2xl hover:bg-[#EBC92C] transition-all duration-300 hover:-translate-y-1 shadow-lg active:scale-[0.98]"
        >
          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Building className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-[16px] font-bold uppercase tracking-wide">Register New Client</h3>
        </button>

        <button
          onClick={() => setIsRiskProfilerOpen(true)}
          className="group flex-1 flex items-center justify-center lg:justify-start gap-4 bg-indigo-600 text-white p-5 lg:px-8 lg:py-4 rounded-2xl hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-1 shadow-lg active:scale-[0.98]"
        >
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-[16px] font-bold uppercase tracking-wide leading-none">FINZAVIO Risk Profiling Calculator</h3>
            <span className="text-[11px] font-medium opacity-80 mt-1">Risk Profiling Calculator</span>
          </div>
        </button>
      </section>

      {/* Internal Admins List */}
      <section className="bg-neutral-500/5 rounded-[2rem] border border-neutral-500/10 shadow-sm p-6 md:p-10 overflow-hidden">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Internal Operations Team</h2>
          <p className="text-[13px] opacity-60">System administrators and authorized personnel managing the platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {admins.map((admin) => (
            <div key={admin.id} className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
                  {admin.name?.charAt(0).toUpperCase()}
                </div>
                {admin.email === 'ameencrews@gmail.com' ? (
                  <span className="bg-amber-500/10 text-amber-600 border border-amber-500/30 px-3 py-1 rounded-[8px] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" /> System Dev
                  </span>
                ) : (
                  <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-3 py-1 rounded-[8px] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-bold text-neutral-900 dark:text-white leading-tight">{admin.name}</h3>
                <div className="flex items-center gap-2 text-neutral-500 mt-1">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="text-[13px] font-medium truncate">{admin.email}</span>
                </div>
              </div>
            </div>
          ))}
          {admins.length === 0 && (
            <div className="col-span-full py-10 text-center opacity-50 text-[13px] font-medium">
              Loading administration team...
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL ── */}
      {isCreateClientOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-[1000px] max-h-[90vh] overflow-y-auto rounded-3xl p-10 relative shadow-2xl">

            <button type="button" onClick={() => setIsCreateClientOpen(false)} className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity z-10">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-1">Register New Client</h2>
            <p className="text-[14px] text-neutral-500 mb-6">Complete the basic profile, or expand the advanced form for a full financial fact-find.</p>

            {formMessage.text && (
              <div className={`mb-6 p-4 rounded-xl flex gap-3 text-[14px] items-start ${formMessage.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                {formMessage.type === "error" ? <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />}
                <p>{formMessage.text}</p>
              </div>
            )}

            <ClientForm key={isCreateClientOpen ? 'open' : 'closed'} onSubmit={handleCreateClient} isPending={formPending} submitLabel="Register Client Account" />
          </div>
        </div>
      )}
      {/* ── FINZAVIO RISK PROFILER MODAL ── */}
      {isRiskProfilerOpen && (
        <RiskProfilerModal onClose={() => setIsRiskProfilerOpen(false)} />
      )}
    </div>
  );
}
