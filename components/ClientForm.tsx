"use client";

import { useState, useEffect } from "react";
import { User, Building, TrendingUp, Activity, Heart, Shield, Target, ShieldCheck, ChevronDown, Plus, X, Loader2 } from "lucide-react";

// ── Dropdown Options ──
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

export default function ClientForm({ 
  initialData, 
  onSubmit, 
  isPending, 
  submitLabel = "Save Client" 
}: { 
  initialData?: any; 
  onSubmit: (formData: FormData) => void; 
  isPending: boolean;
  submitLabel?: string;
}) {
  const isEdit = !!initialData;
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ── BASIC STATE ──
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const [whatsappValue, setWhatsappValue] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [singleEarning, setSingleEarning] = useState(false);

  // ── ADVANCED STATES ──
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

  // Initialize from props
  useEffect(() => {
    if (initialData) {
      setMobileValue(initialData.mobile_number || "");
      setWhatsappValue(initialData.whatsapp_number || "");
      setSameAsMobile(initialData.mobile_number === initialData.whatsapp_number);
      setSelectedServices(initialData.services_required ? initialData.services_required.split(",") : []);
      setSingleEarning(!!initialData.single_earning_member);

      setIncSelf(Number(initialData.monthly_income_self) || 0);
      setIncSpouse(Number(initialData.monthly_income_spouse) || 0);
      setIncOther(Number(initialData.other_income) || 0);
      setExpMonthly(Number(initialData.monthly_expenses) || 0);
      setExpEmi(Number(initialData.emi_outflow) || 0);

      setDependentTypes(initialData.dependent_type ? initialData.dependent_type.split(",") : []);
      setElderlyDependent(!!initialData.elderly_parents_dependent);
      setChildEdResp(!!initialData.child_education_responsibility);

      setAstBank(Number(initialData.bank_savings) || 0);
      setAstFd(Number(initialData.fd_rd_value) || 0);
      setAstMf(Number(initialData.mutual_fund_value) || 0);
      setAstStocks(Number(initialData.stocks_value) || 0);
      setAstGold(Number(initialData.gold_value) || 0);
      setAstRe(Number(initialData.real_estate_value) || 0);
      setAstOther(Number(initialData.other_assets) || 0);

      setLiaHome(Number(initialData.home_loan_outstanding) || 0);
      setLiaPersonal(Number(initialData.personal_loan) || 0);
      setLiaVehicle(Number(initialData.vehicle_loan) || 0);
      setLiaCc(Number(initialData.credit_card_outstanding) || 0);
      setLiaOther(Number(initialData.other_liabilities) || 0);

      setHasHealthIns(!!initialData.health_insurance_available || (initialData.existing_insurance_cover && !!initialData.health_insurance_amount));
      setHasLifeIns(!!initialData.life_insurance_available || (initialData.existing_insurance_cover && !!initialData.life_insurance_amount));
      setHasCriticalIllness(!!initialData.critical_illness_cover);
      setFamilyCovered(!!initialData.family_covered);

      setHasSip(!!initialData.existing_sip);
      setHasDirectStocks(!!initialData.direct_stocks);
      setHasPms(!!initialData.pms_aif);
      setRetirementStarted(!!initialData.retirement_corpus_started);
      setHasEmergencyFund(!!initialData.emergency_fund_available);

      if (initialData.advanced_financial_goals && Array.isArray(initialData.advanced_financial_goals)) {
        setAdvancedGoals(initialData.advanced_financial_goals);
      } else {
        setAdvancedGoals([]);
      }
    }
  }, [initialData]);

  // Auto-calcs
  const totalIncome = incSelf + incSpouse + incOther;
  const totalOutflow = expMonthly + expEmi;
  const savingsCapacity = totalIncome - totalOutflow;
  const totalAssets = astBank + astFd + astMf + astStocks + astGold + astRe + astOther;
  const totalLiabilities = liaHome + liaPersonal + liaVehicle + liaCc + liaOther;

  function addAdvancedGoal() {
    setAdvancedGoals(p => [...p, { id: Date.now(), type: "", amount: "", year: "", priority: "" }]);
  }
  function removeAdvancedGoal(id: number) {
    setAdvancedGoals(p => p.filter(g => g.id !== id));
  }
  function updateAdvancedGoal(id: number, field: string, value: string) {
    setAdvancedGoals(p => p.map(g => g.id === id ? { ...g, [field]: value } : g));
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("services_required", selectedServices.join(","));
    if (sameAsMobile) formData.set("whatsapp_number", mobileValue);
    if (!sameAsMobile) formData.set("whatsapp_number", whatsappValue);

    // Advanced Checkboxes & Toggles
    formData.set("single_earning_member", singleEarning ? "true" : "false");

    if (showAdvanced || isEdit) {
      // If editing, always submit advanced fields so we don't accidentally overwrite them with nulls.
      formData.set("dependent_type", dependentTypes.join(","));
      formData.set("elderly_parents_dependent", elderlyDependent ? "true" : "false");
      formData.set("child_education_responsibility", childEdResp ? "true" : "false");

      formData.set("existing_insurance_cover", hasHealthIns || hasLifeIns ? "true" : "false"); 
      formData.set("health_insurance_available", hasHealthIns ? "true" : "false");
      formData.set("life_insurance_available", hasLifeIns ? "true" : "false");
      formData.set("critical_illness_cover", hasCriticalIllness ? "true" : "false");
      formData.set("family_covered", familyCovered ? "true" : "false");

      formData.set("existing_sip", hasSip ? "true" : "false");
      formData.set("direct_stocks", hasDirectStocks ? "true" : "false");
      formData.set("pms_aif", hasPms ? "true" : "false");
      formData.set("retirement_corpus_started", retirementStarted ? "true" : "false");
      formData.set("emergency_fund_available", hasEmergencyFund ? "true" : "false");

      formData.set("advanced_financial_goals", JSON.stringify(advancedGoals));
      formData.set("monthly_income", totalIncome.toString());
    }

    onSubmit(formData);
  }

  const input = "w-full bg-[#F9FAFB] text-neutral-900 border border-neutral-200 focus:border-neutral-400 rounded-xl px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-neutral-400";
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
            className={`px-5 py-2.5 rounded-xl text-[14px] font-semibold border transition-all duration-150 ${sel ? "bg-[#191970] text-white border-[#191970] shadow-sm" : "bg-[#F9FAFB] text-neutral-600 border-neutral-200 hover:border-neutral-400"}`}>
            {o.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
      {/* ── 1. BASIC DETAILS ── */}
      <SectionHeader icon={User} title="Basic Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Full Name {req}</label>
          <input name="name" type="text" required placeholder="Client's full legal name" defaultValue={initialData?.name} className={input} />
        </div>
        <div>
          <label className={label}>Date of Birth {opt}</label>
          <input name="date_of_birth" type="date" defaultValue={initialData?.date_of_birth || ""} className={input} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Mobile Number {req}</label>
          <input
            name="mobile_number" type="tel" required placeholder="+91 98765 43210"
            value={mobileValue} onChange={e => setMobileValue(e.target.value)} className={input}
          />
        </div>
        <div>
          <label className={label}>WhatsApp Number {opt}</label>
          <input
            name="whatsapp_number" type="tel" placeholder="+91 98765 43210"
            value={sameAsMobile ? mobileValue : whatsappValue}
            onChange={e => {
              if (!sameAsMobile) setWhatsappValue(e.target.value);
            }}
            readOnly={sameAsMobile}
            className={`${input} ${sameAsMobile ? "bg-neutral-100 text-neutral-400" : ""}`}
          />
          <label className="flex items-center gap-2 mt-2 cursor-pointer select-none w-fit">
            <input type="checkbox" checked={sameAsMobile} onChange={e => setSameAsMobile(e.target.checked)} className="w-4 h-4 accent-[#191970]" />
            <span className="text-[12px] text-neutral-500">Same as mobile</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Email Address {opt}</label>
          <input name="email" type="email" placeholder="client@example.com" defaultValue={initialData?.email || ""} readOnly={isEdit} className={`${input} ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`} />
        </div>
        <div>
          <label className={label}>City / Location {opt}</label>
          <input name="city" type="text" placeholder="e.g. Mumbai" defaultValue={initialData?.city || ""} className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Service Required {req}</label>
        <Chip value={selectedServices} options={SERVICE_OPTIONS} toggle={(v) => setSelectedServices(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])} />
        {selectedServices.length === 0 && <p className="text-[12px] text-neutral-400 mt-1.5">Select at least one service</p>}
      </div>

      {/* ── ADVANCED FORM TOGGLE ── */}
      <div className="my-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`w-full py-4 border-2 rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors ${showAdvanced ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50"}`}
        >
          <Target className="w-5 h-5" />
          {showAdvanced ? "Hide Advanced Financial Profile" : "Open Advanced Financial Profile"}
        </button>
      </div>

      {/* ── ADVANCED SECTIONS ── */}
      {(showAdvanced || isEdit) && (
        <div className={`flex flex-col gap-8 ${!showAdvanced ? "hidden" : "animate-in fade-in slide-in-from-top-4 duration-500"} border-l-2 border-indigo-100 pl-4 sm:pl-6 ml-2`}>

          {/* STEP 2 – Income & Cash Flow */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={TrendingUp} title="Step 2 – Income & Cash Flow" advanced />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={label}>Monthly Income (Self) {req}</label>
                <input type="hidden" name="monthly_income_self" value={incSelf} />
                {numInput(incSelf, setIncSelf, "0")}
              </div>
              <div>
                <label className={label}>Monthly Income (Spouse) {opt}</label>
                <input type="hidden" name="monthly_income_spouse" value={incSpouse} />
                {numInput(incSpouse, setIncSpouse, "0")}
              </div>
              <div>
                <label className={label}>Other Income {opt}</label>
                <input type="hidden" name="other_income" value={incOther} />
                {numInput(incOther, setIncOther, "0")}
              </div>
            </div>

            <div className="bg-indigo-50/50 rounded-xl p-4 flex justify-between items-center border border-indigo-100">
              <span className="text-[12px] font-bold uppercase text-indigo-400">Total Household Income</span>
              <span className="text-[18px] font-bold text-indigo-700">₹{totalIncome.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={label}>Monthly Expenses {req}</label>
                <input type="hidden" name="monthly_expenses" value={expMonthly} />
                {numInput(expMonthly, setExpMonthly, "0")}
              </div>
              <div>
                <label className={label}>EMI / Loan Outflow {opt}</label>
                <input type="hidden" name="emi_outflow" value={expEmi} />
                {numInput(expEmi, setExpEmi, "0")}
              </div>
            </div>

            <div className={`rounded-xl p-4 flex justify-between items-center border ${savingsCapacity >= 0 ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}>
              <span className={`text-[12px] font-bold uppercase ${savingsCapacity >= 0 ? "textemerald-500" : "text-red-500"}`}>Monthly Savings Capacity</span>
              <span className={`text-[18px] font-bold ${savingsCapacity >= 0 ? "text-emerald-600" : "text-red-600"}`}>₹{savingsCapacity.toLocaleString()}</span>
            </div>
          </div>

          {/* STEP 2 – Family Responsibility */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={Heart} title="Step 2 – Family Responsibility" advanced />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={label}>Number of Dependents {req}</label>
                <input name="number_of_dependents" type="number" min="0" required className={input} defaultValue={initialData?.number_of_dependents || 0} />
              </div>
              <div>
                <label className={label}>Dependent Type {opt}</label>
                <Chip value={dependentTypes} options={DEPENDENT_TYPES} toggle={(v) => setDependentTypes(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Toggle label="Elderly Parents Dependent?" value={elderlyDependent} onChange={setElderlyDependent} optional />
              <Toggle label="Child Ed Responsibility?" value={childEdResp} onChange={setChildEdResp} optional />
              <Toggle label="Single Earning Member?" value={singleEarning} onChange={setSingleEarning} />
            </div>
          </div>

          {/* STEP 2 – Assets */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={Building} title="Step 2 – Assets" advanced />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div><label className={label}>Bank Savings {opt}</label><input type="hidden" name="bank_savings" value={astBank} />{numInput(astBank, setAstBank, "0")}</div>
              <div><label className={label}>FD / RD {opt}</label><input type="hidden" name="fd_rd_value" value={astFd} />{numInput(astFd, setAstFd, "0")}</div>
              <div><label className={label}>Mutual Funds {opt}</label><input type="hidden" name="mutual_fund_value" value={astMf} />{numInput(astMf, setAstMf, "0")}</div>
              <div><label className={label}>Stocks {opt}</label><input type="hidden" name="stocks_value" value={astStocks} />{numInput(astStocks, setAstStocks, "0")}</div>
              <div><label className={label}>Gold {opt}</label><input type="hidden" name="gold_value" value={astGold} />{numInput(astGold, setAstGold, "0")}</div>
              <div><label className={label}>Real Estate {opt}</label><input type="hidden" name="real_estate_value" value={astRe} />{numInput(astRe, setAstRe, "0")}</div>
              <div><label className={label}>Other Assets {opt}</label><input type="hidden" name="other_assets" value={astOther} />{numInput(astOther, setAstOther, "0")}</div>
            </div>
            <div className="bg-indigo-50/50 rounded-xl p-4 flex justify-between items-center border border-indigo-100">
              <span className="text-[12px] font-bold uppercase text-indigo-400">Total Assets</span>
              <span className="text-[18px] font-bold text-indigo-700">₹{totalAssets.toLocaleString()}</span>
            </div>
          </div>

          {/* STEP 2 – Liabilities */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={Activity} title="Step 2 – Liabilities" advanced />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div><label className={label}>Home Loan {opt}</label><input type="hidden" name="home_loan_outstanding" value={liaHome} />{numInput(liaHome, setLiaHome, "0")}</div>
              <div><label className={label}>Personal Loan {opt}</label><input type="hidden" name="personal_loan" value={liaPersonal} />{numInput(liaPersonal, setLiaPersonal, "0")}</div>
              <div><label className={label}>Vehicle Loan {opt}</label><input type="hidden" name="vehicle_loan" value={liaVehicle} />{numInput(liaVehicle, setLiaVehicle, "0")}</div>
              <div><label className={label}>Credit Card {opt}</label><input type="hidden" name="credit_card_outstanding" value={liaCc} />{numInput(liaCc, setLiaCc, "0")}</div>
              <div><label className={label}>Other Liabilities {opt}</label><input type="hidden" name="other_liabilities" value={liaOther} />{numInput(liaOther, setLiaOther, "0")}</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 flex justify-between items-center border border-red-100">
              <span className="text-[12px] font-bold uppercase text-red-400">Total Liabilities</span>
              <span className="text-[18px] font-bold text-red-600">₹{totalLiabilities.toLocaleString()}</span>
            </div>
          </div>

          {/* STEP 2 – Protection Planning */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={Shield} title="Step 2 – Protection Planning" advanced />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-5">
              <div className="flex flex-col gap-3">
                <Toggle label="Health Insurance Available?" value={hasHealthIns} onChange={setHasHealthIns} />
                {hasHealthIns && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className={label}>Health Cover Amount {opt}</label>
                    <input name="health_insurance_amount" type="number" min="0" placeholder="Amount" defaultValue={initialData?.health_insurance_amount || ""} className={input} />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Toggle label="Life Insurance Available?" value={hasLifeIns} onChange={setHasLifeIns} />
                {hasLifeIns && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className={label}>Term Insurance Cover {opt}</label>
                    <input name="life_insurance_amount" type="number" min="0" placeholder="Amount" defaultValue={initialData?.life_insurance_amount || ""} className={input} />
                  </div>
                )}
              </div>
              <Toggle label="Critical Illness Cover?" value={hasCriticalIllness} onChange={setHasCriticalIllness} optional />
              <Toggle label="Family Covered?" value={familyCovered} onChange={setFamilyCovered} optional />
            </div>
          </div>

          {/* STEP 2 – Investment Profile */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={Building} title="Step 2 – Investment Profile" advanced />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="flex flex-col gap-3">
                <Toggle label="Existing SIP?" value={hasSip} onChange={setHasSip} optional />
                {hasSip && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className={label}>SIP Amount {opt}</label>
                    <input name="sip_amount" type="number" min="0" placeholder="Monthly amount" defaultValue={initialData?.sip_amount || ""} className={input} />
                  </div>
                )}
              </div>
              <Toggle label="Direct Stocks?" value={hasDirectStocks} onChange={setHasDirectStocks} optional />
              <Toggle label="PMS / AIF?" value={hasPms} onChange={setHasPms} optional />
              <Toggle label="Retirement Corpus Started?" value={retirementStarted} onChange={setRetirementStarted} optional />
              <Toggle label="Emergency Fund Available?" value={hasEmergencyFund} onChange={setHasEmergencyFund} />
            </div>
          </div>

          {/* STEP 2 – Financial Goals */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={Target} title="Step 2 – Financial Goals" advanced />

            <div className="flex flex-col gap-4">
              {advancedGoals.map((goal, index) => (
                <div key={goal.id} className="relative bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end animate-in fade-in slide-in-from-bottom-2">
                  <button type="button" onClick={() => removeAdvancedGoal(goal.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm">
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-neutral-500">Goal Type</label>
                    <select value={goal.type} onChange={(e) => updateAdvancedGoal(goal.id, "type", e.target.value)} className={`${input} py-2.5 text-[13px]`} required>
                      <option value="">Select type...</option>
                      {GOAL_TYPES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-neutral-500">Target Amount</label>
                    <input type="number" min="0" value={goal.amount} onChange={(e) => updateAdvancedGoal(goal.id, "amount", e.target.value)} placeholder="₹ Amount" className={`${input} py-2.5 text-[13px]`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-neutral-500">Target Year</label>
                    <input type="number" min="2024" max="2100" value={goal.year} onChange={(e) => updateAdvancedGoal(goal.id, "year", e.target.value)} placeholder="e.g. 2035" className={`${input} py-2.5 text-[13px]`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-neutral-500">Priority</label>
                    <select value={goal.priority} onChange={(e) => updateAdvancedGoal(goal.id, "priority", e.target.value)} className={`${input} py-2.5 text-[13px]`}>
                      <option value="">Select priority...</option>
                      {PRIORITY_OPTIONS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addAdvancedGoal} className="border-2 border-dashed border-neutral-300 text-neutral-500 hover:border-indigo-400 hover:text-indigo-600 rounded-2xl py-4 flex items-center justify-center gap-2 font-bold transition-colors text-[14px]">
                <Plus className="w-4 h-4" /> Add Financial Goal
              </button>
            </div>
          </div>

          {/* STEP 2 – Risk & Behaviour */}
          <div className="flex flex-col gap-5">
            <SectionHeader icon={ShieldCheck} title="Step 2 – Risk & Behaviour" advanced />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className={label}>Risk Profile {req}</label>
                <select name="risk_profile" defaultValue={initialData?.risk_profile || ""} className={`${input} appearance-none pr-10`} required>
                  {RISK_PROFILE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={label}>Investment Horizon {req}</label>
                <select name="investment_horizon" defaultValue={initialData?.investment_horizon || ""} className={`${input} appearance-none pr-10`} required>
                  <option value="">Select horizon...</option>
                  <option value="Short Term (< 3 Years)">Short Term (&lt; 3 Years)</option>
                  <option value="Medium Term (3 - 7 Years)">Medium Term (3 - 7 Years)</option>
                  <option value="Long Term (7+ Years)">Long Term (7+ Years)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={label}>Market Fall Tolerance {opt}</label>
                <select name="market_fall_tolerance" defaultValue={initialData?.market_fall_tolerance || ""} className={`${input} appearance-none pr-10`}>
                  <option value="">Select tolerance...</option>
                  <option value="Panic / Sell Everything">Panic / Sell Everything</option>
                  <option value="Concerned / Hold">Concerned / Hold</option>
                  <option value="Opportunity / Buy More">Opportunity / Buy More</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={label}>Investment Experience {opt}</label>
                <select name="investment_experience" defaultValue={initialData?.investment_experience || ""} className={`${input} appearance-none pr-10`}>
                  <option value="">Select experience...</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced / Expert">Advanced / Expert</option>
                </select>
              </div>
            </div>
          </div>

          {/* End of Advanced Form Wrapper */}
        </div>
      )}

      {/* ── FINAL NOMINEE & SUBMIT ── */}
      <SectionHeader icon={User} title="Final Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Nominee Name {req}</label>
          <input name="nominee_name" type="text" required placeholder="Nominee's full name" defaultValue={initialData?.nominee_name || ""} className={input} />
        </div>
        <div>
          <label className={label}>Nominee Relationship {req}</label>
          <div className="relative">
            <select name="nominee_relationship" defaultValue={initialData?.nominee_relationship || ""} required className={`${input} appearance-none pr-10`}>
              {NOMINEE_RELATIONSHIP_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className={label}>Notes {opt}</label>
        <textarea name="notes" rows={3} placeholder="Any additional notes..." defaultValue={initialData?.notes || ""} className={`${input} resize-none`} />
      </div>

      <button
        disabled={isPending} type="submit"
        className="w-full mt-3 bg-black text-white font-bold text-[15px] py-4 rounded-xl hover:bg-neutral-800 transition-all flex justify-center items-center shadow-md hover:shadow-lg active:scale-[0.99]"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : submitLabel}
      </button>

    </form>
  );
}
