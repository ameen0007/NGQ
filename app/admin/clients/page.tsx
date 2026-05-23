"use client";

import { useState, useEffect } from "react";
import { getAllProfiles, deleteClientAccount, updateClientAccount } from "@/app/actions/admin";
import ClientForm from "@/components/ClientForm";
import PdfGeneratorModal from "@/components/PdfGeneratorModal";
import { 
  Users, MapPin, Phone, Briefcase, Search, ShieldCheck, MoreVertical,
  Eye, Pencil, Trash2, X, Loader2, AlertCircle, FileText, User, Heart, Shield,
  Target, ChevronDown, Building, TrendingUp, Activity, Plus, CheckCircle2
} from "lucide-react";
import SkeletonLoader from "@/components/SkeletonLoader";

// ── Dropdown Options ──
const SERVICE_OPTIONS = [{ value: "wealth_management", label: "Wealth Management" }, { value: "real_estate", label: "Real Estate" }];
const RISK_PROFILE_OPTIONS = [ { value: "", label: "Select risk profile..." }, { value: "conservative", label: "Conservative" }, { value: "moderate", label: "Moderate" }, { value: "aggressive", label: "Aggressive" }];
const MARITAL_STATUS_OPTIONS = [{ value: "", label: "Select status..." }, { value: "single", label: "Single" }, { value: "married", label: "Married" }];
const NOMINEE_RELATIONSHIP_OPTIONS = [{ value: "", label: "Select relationship..." }, { value: "spouse", label: "Spouse" }, { value: "father", label: "Father" }, { value: "mother", label: "Mother" }, { value: "son", label: "Son" }, { value: "daughter", label: "Daughter" }, { value: "brother", label: "Brother" }, { value: "sister", label: "Sister" }, { value: "other", label: "Other" }];
const GOAL_TYPES = [{ value: "Retirement", label: "Retirement" }, { value: "Child Education", label: "Child Education" }, { value: "Marriage", label: "Marriage" }, { value: "House Purchase", label: "House Purchase" }, { value: "Wealth Creation", label: "Wealth Creation" }, { value: "Passive Income", label: "Passive Income" }, { value: "Tax Saving", label: "Tax Saving" }, { value: "Business Expansion", label: "Business Expansion" }];
const PRIORITY_OPTIONS = [{ value: "High", label: "High" }, { value: "Medium", label: "Medium" }, { value: "Low", label: "Low" }];
const DEPENDENT_TYPES = [{ value: "spouse", label: "Spouse" }, { value: "children", label: "Children" }, { value: "parents", label: "Parents" }, { value: "siblings", label: "Siblings" }];

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
        <button type="button" onClick={() => onChange(true)} className={`px-5 py-3 text-[14px] font-semibold transition-all duration-150 ${value ? "bg-black text-white" : "bg-[#F9FAFB] text-neutral-400 hover:bg-neutral-100"}`}>Yes</button>
        <button type="button" onClick={() => onChange(false)} className={`px-5 py-3 text-[14px] font-semibold transition-all duration-150 ${!value ? "bg-black text-white" : "bg-[#F9FAFB] text-neutral-400 hover:bg-neutral-100"}`}>No</button>
      </div>
    </div>
  );
}

export default function ClientsDirectoryPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [viewingClient, setViewingClient] = useState<any | null>(null);
  const [editingClient, setEditingClient] = useState<any | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [pdfClient, setPdfClient] = useState<any | null>(null);
  
  const [formPending, setFormPending] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });

  // ── BASIC STATE ──
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [singleEarning, setSingleEarning] = useState(false);

  // ── ADVANCED STATES ──
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [incSelf, setIncSelf] = useState<number>(0);
  const [incSpouse, setIncSpouse] = useState<number>(0);
  const [incOther, setIncOther] = useState<number>(0);
  const [expMonthly, setExpMonthly] = useState<number>(0);
  const [expEmi, setExpEmi] = useState<number>(0);

  const [dependentTypes, setDependentTypes] = useState<string[]>([]);
  const [elderlyDependent, setElderlyDependent] = useState(false);
  const [childEdResp, setChildEdResp] = useState(false);

  const [astBank, setAstBank] = useState<number>(0);
  const [astFd, setAstFd] = useState<number>(0);
  const [astMf, setAstMf] = useState<number>(0);
  const [astStocks, setAstStocks] = useState<number>(0);
  const [astGold, setAstGold] = useState<number>(0);
  const [astRe, setAstRe] = useState<number>(0);
  const [astOther, setAstOther] = useState<number>(0);

  const [liaHome, setLiaHome] = useState<number>(0);
  const [liaPersonal, setLiaPersonal] = useState<number>(0);
  const [liaVehicle, setLiaVehicle] = useState<number>(0);
  const [liaCc, setLiaCc] = useState<number>(0);
  const [liaOther, setLiaOther] = useState<number>(0);

  const [hasHealthIns, setHasHealthIns] = useState(false);
  const [hasLifeIns, setHasLifeIns] = useState(false);
  const [hasCriticalIllness, setHasCriticalIllness] = useState(false);
  const [familyCovered, setFamilyCovered] = useState(false);

  const [hasSip, setHasSip] = useState(false);
  const [hasDirectStocks, setHasDirectStocks] = useState(false);
  const [hasPms, setHasPms] = useState(false);
  const [retirementStarted, setRetirementStarted] = useState(false);
  const [hasEmergencyFund, setHasEmergencyFund] = useState(false);

  const [advancedGoals, setAdvancedGoals] = useState<{ id: number; type: string; amount: string; year: string; priority: string }[]>([]);

  

  const loadClients = async () => {
    setIsLoading(true);
    const { data } = await getAllProfiles();
    if (data) {
      const clientList = data.filter(p => p.role === "client");
      setClients(clientList);
      setFilteredClients(clientList);
    }
    setIsLoading(false);
  };

  useEffect(() => { loadClients(); }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setFilteredClients(clients); return; }
    const q = searchQuery.toLowerCase();
    const filtered = clients.filter(c => c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.mobile_number?.includes(q) || c.city?.toLowerCase().includes(q));
    setFilteredClients(filtered);
  }, [searchQuery, clients]);

  const handleDelete = async (id: string) => {
    setFormPending(true);
    const res = await deleteClientAccount(id);
    if (res.success) { setDeletingClientId(null); await loadClients(); }
    else alert(res.error);
    setFormPending(false);
  };

  const openEditModal = (client: any) => {
    setFormMessage({ text: "", type: "" });
    setEditingClient(client);
    setShowAdvanced(false);
  };

  const handleUpdate = async (formData: FormData) => {
    setFormPending(true);
    setFormMessage({ text: "", type: "" });

    const result = await updateClientAccount(editingClient.id, formData);
    if (result.error) {
      setFormMessage({ text: result.error, type: "error" });
    } else {
      setFormMessage({ text: result.message || "Client updated successfully!", type: "success" });
      await loadClients();
      setTimeout(() => { setEditingClient(null); }, 1000);
    }
    setFormPending(false);
  };
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

  const Chip = ({ value, options, toggle }: { value: string[]; options: {value:string;label:string}[]; toggle: (v: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(o => {
        const sel = value.includes(o.value);
        return <button key={o.value} type="button" onClick={() => toggle(o.value)} className={`px-5 py-2.5 rounded-xl text-[14px] font-semibold border transition-all duration-150 ${sel ? "bg-[#FFDD33] text-black border-[#FFDD33] shadow-sm" : "bg-[#F9FAFB] text-neutral-600 border-neutral-200 hover:border-neutral-400"}`}>{o.label}</button>;
      })}
    </div>
  );
  const Select = ({ name, options, required: req2, defaultValue }: { name: string; options: { value: string; label: string }[]; required?: boolean; defaultValue?: string }) => (
    <div className="relative">
      <select name={name} required={req2} defaultValue={defaultValue} className={`${input} appearance-none pr-10`}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );

  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-12 pb-24 flex flex-col gap-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col gap-2 border-b border-neutral-500/10 pb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Client Directory</h1>
          <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full shadow-sm">
            {clients.length} Registered
          </span>
        </div>
        <p className="text-neutral-500 text-[14px]">Comprehensive overview of all registered clients and their financial portfolios.</p>
      </header>

      {/* Search */}
      <section className="flex justify-end">
        <div className="relative w-full max-w-md">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search by name, email, phone, or city..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white dark:bg-[#141414] border border-neutral-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-[14px] outline-none focus:border-[#FFDD33] transition-colors shadow-sm" />
        </div>
      </section>

      {/* Table */}
      <section className="bg-neutral-500/5 rounded-[2rem] border border-neutral-500/10 shadow-sm p-6 md:p-10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
             <thead>
               <tr className="border-b border-neutral-500/10 text-[10px] uppercase tracking-widest opacity-50">
                 <th className="pb-4 font-bold pl-4">Client Identity</th>
                 <th className="pb-4 font-bold">Contact & Location</th>
                 <th className="pb-4 font-bold">Service Required</th>
                 <th className="pb-4 font-bold">Financial Status</th>
                 <th className="pb-4 font-bold pr-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="text-[13px]">
               {filteredClients.map((client) => {
                 const services = client.services_required?.split(",").map((s: string) => s.trim().replace("_", " ")) || [];
                 return (
                   <tr key={client.id} className="border-b border-neutral-500/5 hover:bg-neutral-500/5 transition-colors group relative">
                     
                     <td className="py-5 pl-4">
                       <div className="flex flex-col gap-1">
                         <span className="font-bold text-[15px] dark:text-white">{client.name}</span>
                         {client.email ? <span className="text-[12px] text-neutral-500 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3"/> Portal Enabled</span> : <span className="text-[12px] text-neutral-400 opacity-60">No Portal Access</span>}
                       </div>
                     </td>

                     <td className="py-5">
                       <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-[13px]"><Phone className="w-3.5 h-3.5 text-neutral-400" /><span className="font-medium">{client.mobile_number}</span></div>
                         {client.city && <div className="flex items-center gap-2 text-[13px] text-neutral-500"><MapPin className="w-3.5 h-3.5 text-neutral-400" /><span>{client.city}</span></div>}
                       </div>
                     </td>

                     <td className="py-5">
                       <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                         {services.map((srv: string, idx: number) => <span key={idx} className="bg-neutral-200/80 dark:bg-white/5 border border-neutral-300 dark:border-white/10 px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider capitalize">{srv}</span>)}
                       </div>
                     </td>

                     <td className="py-5">
                        {client.monthly_income > 0 && <span className="text-[13px] font-bold text-emerald-500">₹{Number(client.monthly_income).toLocaleString()} Monthly</span>}
                        <div className="flex gap-2 mt-1">
                           {client.existing_insurance_cover && <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100" title="Has Insurance">🛡️</span>}
                           {client.existing_sip && <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100" title="Has SIP">📈</span>}
                           {client.emergency_fund_available && <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100" title="Has Emergency Fund">💰</span>}
                        </div>
                     </td>

                     <td className="py-5 pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setViewingClient(client)} title="Full Details" className="p-2.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => openEditModal(client)} title="Edit Profile" className="p-2.5 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => setDeletingClientId(client.id)} title="Delete Client" className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                          <button onClick={() => setPdfClient(client)} title="Generate PDF" className="p-2.5 bg-[#191970] text-white hover:bg-[#111150] rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"><FileText className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider hidden xl:inline">Generate PDF</span></button>
                        </div>
                     </td>

                   </tr>
                 );
               })}
               {filteredClients.length === 0 && !isLoading && <tr><td colSpan={5} className="py-14 text-center opacity-50 text-[13px] font-medium tracking-wide">No clients found.</td></tr>}
             </tbody>
          </table>
        </div>
      </section>

      {pdfClient && (
        <PdfGeneratorModal 
          client={pdfClient} 
          onClose={() => setPdfClient(null)} 
        />
      )}

      {/* ── DELETE MODAL ── */}
      {deletingClientId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-3xl max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-2"><AlertCircle className="w-8 h-8" /></div>
            <h2 className="text-xl font-bold dark:text-white">Delete Client?</h2>
            <p className="text-[14px] text-neutral-500 leading-relaxed">This action is permanent and cannot be undone.</p>
            <div className="flex gap-3 w-full mt-4">
              <button onClick={() => setDeletingClientId(null)} className="flex-1 py-3.5 rounded-xl font-bold bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 transition-colors">Cancel</button>
              <button disabled={formPending} onClick={() => handleDelete(deletingClientId)} className="flex-1 py-3.5 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center">{formPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRINT PAPER VIEW ── */}
      {viewingClient && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto pt-10 pb-20">
          <div className="bg-[#FCFBF8] text-black w-full max-w-[900px] rounded-sm p-10 md:p-14 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-neutral-300 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
            <button onClick={() => setViewingClient(null)} className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity p-2 hover:bg-neutral-200 rounded-full z-10"><X className="w-5 h-5" /></button>

            <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">{viewingClient.name}</h1>
                <p className="text-[13px] font-medium text-neutral-500 uppercase tracking-widest mt-1">Advanced Financial Fact-Find</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Date Generated</p>
                <p className="text-[14px] font-mono text-neutral-800">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              
              {/* Basic */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-2 mb-4">Personal Contact</h3>
                <ul className="space-y-3 text-[14px]">
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Mobile:</span><span className="font-semibold">{viewingClient.mobile_number}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Email:</span><span className="font-semibold">{viewingClient.email || "N/A"}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">City:</span><span className="font-semibold">{viewingClient.city || "N/A"}</span></li>
                </ul>
              </div>

              {/* Cash Flow */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-2 mb-4">Income & Cash Flow</h3>
                <ul className="space-y-3 text-[14px]">
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Household Income:</span><span className="font-bold text-emerald-600">₹{Number(viewingClient.monthly_income || 0).toLocaleString()}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Monthly Expenses:</span><span className="font-semibold">₹{Number(viewingClient.monthly_expenses || 0).toLocaleString()}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">EMI Outflow:</span><span className="font-semibold">₹{Number(viewingClient.emi_outflow || 0).toLocaleString()}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1 pt-1 bg-neutral-100 px-2 rounded"><span className="text-neutral-600 font-bold">Net Savings:</span><span className="font-bold">₹{Number((viewingClient.monthly_income||0) - (viewingClient.monthly_expenses||0) - (viewingClient.emi_outflow||0)).toLocaleString()}</span></li>
                </ul>
              </div>

              {/* Balance Sheet */}
              <div className="md:col-span-2">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-2 mb-4">Net Worth Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-neutral-200 p-4 shadow-sm text-[13px]">
                    <span className="block font-bold mb-2 uppercase tracking-wide text-indigo-600 border-b pb-2">Total Assets</span>
                    <ul className="space-y-1">
                      <li className="flex justify-between"><span className="text-neutral-500">Bank Savings:</span> <span>₹{Number(viewingClient.bank_savings||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">FD / RD:</span> <span>₹{Number(viewingClient.fd_rd_value||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">Mutual Funds:</span> <span>₹{Number(viewingClient.mutual_fund_value||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">Stocks:</span> <span>₹{Number(viewingClient.stocks_value||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">Gold:</span> <span>₹{Number(viewingClient.gold_value||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">Real Estate:</span> <span>₹{Number(viewingClient.real_estate_value||0).toLocaleString()}</span></li>
                    </ul>
                  </div>
                  <div className="bg-white border border-neutral-200 p-4 shadow-sm text-[13px]">
                    <span className="block font-bold mb-2 uppercase tracking-wide text-red-600 border-b pb-2">Total Liabilities</span>
                    <ul className="space-y-1">
                      <li className="flex justify-between"><span className="text-neutral-500">Home Loan:</span> <span>₹{Number(viewingClient.home_loan_outstanding||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">Personal Loan:</span> <span>₹{Number(viewingClient.personal_loan||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">Vehicle Loan:</span> <span>₹{Number(viewingClient.vehicle_loan||0).toLocaleString()}</span></li>
                      <li className="flex justify-between"><span className="text-neutral-500">Credit Card:</span> <span>₹{Number(viewingClient.credit_card_outstanding||0).toLocaleString()}</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Protections */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-2 mb-4">Protection Planning</h3>
                <ul className="space-y-3 text-[14px]">
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Health Cover:</span><span className="font-semibold">{viewingClient.health_insurance_available ? `₹${Number(viewingClient.health_insurance_amount||0).toLocaleString()}` : "No"}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Life/Term Cover:</span><span className="font-semibold">{viewingClient.life_insurance_available ? `₹${Number(viewingClient.life_insurance_amount||0).toLocaleString()}` : "No"}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Emergency Fund:</span><span className="font-semibold">{viewingClient.emergency_fund_available ? "Yes" : "No"}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Critical Illness:</span><span className="font-semibold">{viewingClient.critical_illness_cover ? "Yes" : "No"}</span></li>
                </ul>
              </div>

              {/* Risk */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-2 mb-4">Risk & Behaviour</h3>
                <ul className="space-y-3 text-[14px]">
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Risk Profile:</span><span className="font-semibold capitalize">{viewingClient.risk_profile || "Unset"}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Horizon:</span><span className="font-semibold text-right max-w-[150px]">{viewingClient.investment_horizon || "N/A"}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Experience:</span><span className="font-semibold">{viewingClient.investment_experience || "N/A"}</span></li>
                  <li className="flex justify-between border-b border-neutral-100 pb-1"><span className="text-neutral-500">Market Fall Reaction:</span><span className="font-semibold text-right max-w-[150px]">{viewingClient.market_fall_tolerance || "N/A"}</span></li>
                </ul>
              </div>

              {/* Goals */}
              <div className="md:col-span-2">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-2 mb-4">Financial Goals</h3>
                {viewingClient.advanced_financial_goals && viewingClient.advanced_financial_goals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {viewingClient.advanced_financial_goals.map((g:any, i:number) => (
                      <div key={i} className="bg-white border border-neutral-200 p-4 shadow-sm text-[13px] relative">
                         <span className={`absolute top-0 right-0 w-1.5 h-full ${g.priority === "High" ? "bg-red-500" : g.priority === "Medium" ? "bg-amber-500" : "bg-neutral-300"}`}></span>
                         <p className="font-bold text-[14px] uppercase text-indigo-700 mb-2">{g.type}</p>
                         <p className="text-neutral-500 mb-1">Target: <span className="font-bold text-black">₹{Number(g.amount).toLocaleString()}</span></p>
                         <p className="text-neutral-500 mb-1">Year: <span className="font-bold text-black">{g.year}</span></p>
                         <p className="text-neutral-500">Priority: <span className="font-bold text-black">{g.priority}</span></p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-neutral-400 italic text-[14px]">No financial goals recorded.</p>}
              </div>

            </div>
          </div>
        </div>
      )}


      {/* ── EDIT MODAL ── */}
      {editingClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A1A1A] text-black dark:text-white w-full max-w-[1000px] max-h-[90vh] overflow-y-auto rounded-3xl p-10 relative shadow-2xl">
            <button onClick={() => setEditingClient(null)} className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity z-10"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-bold mb-1">Edit Client Profile</h2>
            
            {formMessage.text && (
              <div className={`mb-6 mt-4 p-4 rounded-xl flex gap-3 text-[14px] items-start ${formMessage.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                {formMessage.type === "error" ? <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />}
                <p>{formMessage.text}</p>
              </div>
            )}

            <ClientForm key={editingClient.id} initialData={editingClient} onSubmit={handleUpdate} isPending={formPending} submitLabel="Save Changes" />
          </div>
        </div>
      )}

    </div>
  );
}
