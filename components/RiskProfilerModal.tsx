"use client";

import { useState } from "react";
import { X, ChevronRight, ChevronLeft, ShieldAlert, Target, Shield, AlertCircle, RefreshCw } from "lucide-react";

// ── Types & Data ──
type Option = { label: string; score: number; meta?: any };
type Question = {
  id: string;
  section: "A" | "B" | "C";
  title: string;
  subtitle?: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  // SECTION A: Psychological Risk Tolerance (30)
  {
    id: "q1", section: "A", title: "Investment Horizon", subtitle: "How long do you plan to stay invested?",
    options: [
      { label: "Less than 1 year", score: 1 },
      { label: "1–3 years", score: 3 },
      { label: "3–5 years", score: 5 },
      { label: "5–10 years", score: 7 },
      { label: "More than 10 years", score: 10 },
    ]
  },
  {
    id: "q2", section: "A", title: "Market Crash Reaction", subtitle: "If your investment falls 20%, what will you do?",
    options: [
      { label: "Withdraw immediately", score: 1 },
      { label: "Wait and watch", score: 3 },
      { label: "Hold patiently", score: 6 },
      { label: "Invest more", score: 10 },
    ]
  },
  {
    id: "q3", section: "A", title: "Return Preference", subtitle: "What kind of returns do you expect?",
    options: [
      { label: "Safe low returns", score: 1 },
      { label: "Moderate steady returns", score: 5 },
      { label: "High returns with some volatility", score: 8 },
      { label: "Maximum growth even with volatility", score: 10 },
    ]
  },

  // SECTION B: Financial Risk Capacity (50 + Extra for rules)
  {
    id: "q4", section: "B", title: "Age Group",
    options: [
      { label: "Above 60", score: 1, meta: { over55: true } },
      { label: "50–60", score: 4, meta: { over55: true } }, // Treats 50-60 as >55 for safety override
      { label: "40–50", score: 7 },
      { label: "30–40", score: 9 },
      { label: "Below 30", score: 10 },
    ]
  },
  {
    id: "q5", section: "B", title: "Monthly Savings Ratio", subtitle: "(Monthly Savings ÷ Monthly Income)",
    options: [
      { label: "Less than 5%", score: 1 },
      { label: "5–10%", score: 3 },
      { label: "10–20%", score: 6 },
      { label: "20–30%", score: 8 },
      { label: "Above 30%", score: 10 },
    ]
  },
  {
    id: "q6", section: "B", title: "EMI Burden", subtitle: "(Total EMI ÷ Monthly Income)",
    options: [
      { label: "Above 50%", score: 1, meta: { highDebt: true } },
      { label: "35–50%", score: 3, meta: { highDebt: true } }, // We'll count >40% loosely inside here or use exact
      { label: "20–35%", score: 6 },
      { label: "10–20%", score: 8 },
      { label: "Less than 10%", score: 10 },
    ]
  },
  {
    id: "q7", section: "B", title: "Emergency Fund",
    options: [
      { label: "None", score: 1, meta: { noFund: true } },
      { label: "Less than 3 months", score: 3 },
      { label: "3–6 months", score: 6 },
      { label: "More than 6 months", score: 10 },
    ]
  },
  {
    id: "q8", section: "B", title: "Dependents",
    options: [
      { label: "More than 4 dependents", score: 1, meta: { manyDep: true } },
      { label: "3–4 dependents", score: 4, meta: { manyDep: true } },
      { label: "1–2 dependents", score: 7 },
      { label: "No dependents", score: 10 },
    ]
  },
  {
    id: "q9", section: "B", title: "Single Earning Member?",
    options: [
      { label: "Yes", score: 2, meta: { singleEarning: true } },
      { label: "No", score: 10 },
    ]
  },
  {
    id: "q9b", section: "B", title: "Health Insurance Available?", subtitle: "Required for Protection Override analysis",
    options: [
      { label: "Yes", score: 0 },
      { label: "No", score: 0, meta: { noHealth: true } },
    ]
  },

  // SECTION C: Goal-Based Risk Need (20)
  {
    id: "q10", section: "C", title: "Goal Timeline",
    options: [
      { label: "Less than 3 years", score: 1 },
      { label: "3–5 years", score: 5 },
      { label: "5–10 years", score: 8 },
      { label: "More than 10 years", score: 10 },
    ]
  },
  {
    id: "q11", section: "C", title: "Goal Type",
    options: [
      { label: "Capital protection", score: 1 },
      { label: "Income generation", score: 4 },
      { label: "Wealth creation", score: 7 },
      { label: "Retirement / long-term growth", score: 10 },
    ]
  },
];

type ProfileResult = {
  profile: string;
  baseScore: number;
  finalScore: number;
  overridesApplied: string[];
  secA: number;
  secB: number;
  secC: number;
};

export default function RiskProfilerModal({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [result, setResult] = useState<ProfileResult | null>(null);

  const handleSelect = (option: Option) => {
    const q = QUESTIONS[currentStep];
    setAnswers({ ...answers, [q.id]: option });
    
    // Auto-advance
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        calculateResult({ ...answers, [q.id]: option });
      }
    }, 300);
  };

  const calculateResult = (finalAnswers: Record<string, Option>) => {
    let secA = 0, secB = 0, secC = 0;
    
    let singleEarning = false;
    let manyDep = false;
    let noHealth = false;
    let noFund = false;
    let highDebt = false;
    let over55 = false;

    Object.entries(finalAnswers).forEach(([qid, opt]) => {
      const q = QUESTIONS.find(x => x.id === qid);
      if (!q) return;

      if (q.section === "A") secA += opt.score;
      if (q.section === "B") secB += opt.score;
      if (q.section === "C") secC += opt.score;

      if (opt.meta?.singleEarning) singleEarning = true;
      if (opt.meta?.manyDep) manyDep = true;
      if (opt.meta?.noHealth) noHealth = true;
      if (opt.meta?.noFund) noFund = true;
      if (opt.meta?.highDebt) highDebt = true; // EMI > 35%
      if (opt.meta?.over55) over55 = true; // Age > 50
    });

    // Base score is simply sum (out of 100 max)
    let baseScore = secA + secB + secC;
    let finalScore = baseScore;
    let overrides: string[] = [];

    // Rule 2 & 4: Subtractions
    if (highDebt) {
      finalScore -= 10;
      overrides.push("Debt Override: High EMI burden reduced score by 10.");
    }
    if (noFund) {
      finalScore -= 10;
      overrides.push("Emergency Fund Override: Lack of emergency fund reduced score by 10.");
    }
    if (finalScore < 0) finalScore = 0;

    // Classification Base
    let profileStr = "";
    if (finalScore <= 40) profileStr = "Conservative";
    else if (finalScore <= 70) profileStr = "Moderate";
    else profileStr = "Aggressive";

    // Rule 1 & 3: Profile Caps
    if (singleEarning && manyDep && noHealth && noFund) {
      overrides.push("Protection Risk Override: High risk exposure capped profile at Moderate.");
      if (finalScore > 70) {
        finalScore = 70;
        profileStr = "Moderate";
      }
    }
    
    if (over55 && profileStr === "Aggressive") {
      overrides.push("Age Override: Age over 55 capped profile at Moderate.");
      finalScore = 70;
      profileStr = "Moderate";
    }

    setResult({
      profile: profileStr,
      baseScore,
      finalScore,
      overridesApplied: overrides,
      secA, secB, secC
    });
  };

  const progress = Math.round(((currentStep + 1) / QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-[700px] min-h-[500px] rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-neutral-100 dark:bg-white/5 rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors z-10">
          <X className="w-5 h-5 text-neutral-500" />
        </button>

        {!result ? (
          <>
            {/* Header & Progress */}
            <div className="px-10 pt-10 pb-6 border-b border-neutral-100 dark:border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-indigo-500" />
                <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">FINZAVIO Risk Profiling</h2>
              </div>
              
              <div className="w-full bg-neutral-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-[12px] text-neutral-400 mt-2 font-medium">Question {currentStep + 1} of {QUESTIONS.length}</p>
            </div>

            {/* Question Body */}
            <div className="flex-1 p-10 flex flex-col justify-center animate-in slide-in-from-right-4 fade-in duration-300" key={currentStep}>
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 border border-indigo-100 dark:border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                  {QUESTIONS[currentStep].section === "A" ? "Section A: Psychological" : QUESTIONS[currentStep].section === "B" ? "Section B: Financial Capacity" : "Section C: Goal Need"}
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                  {QUESTIONS[currentStep].title}
                </h3>
                {QUESTIONS[currentStep].subtitle && (
                  <p className="text-neutral-500 text-[15px] mt-2">{QUESTIONS[currentStep].subtitle}</p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {QUESTIONS[currentStep].options.map((opt, i) => {
                  const isSelected = answers[QUESTIONS[currentStep].id]?.label === opt.label;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
                        isSelected 
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" 
                          : "border-neutral-200 dark:border-white/10 hover:border-indigo-300 hover:bg-neutral-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="font-semibold text-[15px]">{opt.label}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-indigo-500" : "border-neutral-300 group-hover:border-indigo-300"}`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="px-10 py-5 bg-neutral-50 dark:bg-black/20 border-t border-neutral-100 dark:border-white/5 flex justify-between items-center">
              <button 
                onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-[14px] font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            </div>
          </>
        ) : (
          /* Results View */
          <div className="flex-1 p-10 flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-500">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-10 h-10" />
            </div>
            
            <h2 className="text-xl font-bold text-neutral-500 mb-2 uppercase tracking-widest">Final Risk Profile</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white mb-8 tracking-tight">
              {result.profile}
            </h1>

            <div className="w-full bg-neutral-50 dark:bg-white/5 rounded-3xl p-6 border border-neutral-200 dark:border-white/10 mb-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase text-neutral-400">Psychological</span>
                  <span className="text-2xl font-bold">{result.secA}<span className="text-sm text-neutral-400">/30</span></span>
                </div>
                <div className="flex flex-col border-l border-r border-neutral-200 dark:border-white/10">
                  <span className="text-[11px] font-bold uppercase text-neutral-400">Capacity</span>
                  <span className="text-2xl font-bold">{result.secB}<span className="text-sm text-neutral-400">/50</span></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase text-neutral-400">Goal Need</span>
                  <span className="text-2xl font-bold">{result.secC}<span className="text-sm text-neutral-400">/20</span></span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-black rounded-xl p-4 flex justify-between items-center shadow-sm">
                <span className="font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-widest text-[12px]">Final Algorithm Score</span>
                <span className="text-2xl font-black text-indigo-600">{result.finalScore}<span className="text-lg text-neutral-400">/100</span></span>
              </div>
            </div>

            {result.overridesApplied.length > 0 && (
              <div className="w-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-5 text-left mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-amber-700 dark:text-amber-500 text-[13px] uppercase tracking-wide">Overrides Applied</span>
                </div>
                <ul className="space-y-2">
                  {result.overridesApplied.map((msg, idx) => (
                    <li key={idx} className="text-[13px] text-amber-700 dark:text-amber-400 font-medium flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span> {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button 
              onClick={onClose}
              className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-[15px] hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xl active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
