"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calculator } from "lucide-react";

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<"SIP" | "SWP" | "LUMPSUM" | "GOAL">("SIP");

  // SIP States
  const [sipMonthly, setSipMonthly] = useState<number>(25000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // SWP States
  const [swpTotal, setSwpTotal] = useState<number>(5000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState<number>(50000);
  const [swpRate, setSwpRate] = useState<number>(10);
  const [swpYears, setSwpYears] = useState<number>(10);

  // Lumpsum States
  const [lumpsumTotal, setLumpsumTotal] = useState<number>(500000);
  const [lumpsumRate, setLumpsumRate] = useState<number>(12);
  const [lumpsumYears, setLumpsumYears] = useState<number>(10);

  // Goal States
  const [goalTarget, setGoalTarget] = useState<number>(10000000);
  const [goalRate, setGoalRate] = useState<number>(12);
  const [goalYears, setGoalYears] = useState<number>(10);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // SIP Calculation
  const calculateSIP = () => {
    const i = sipRate / 12 / 100;
    const n = sipYears * 12;
    const futureValue = sipMonthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = sipMonthly * n;
    const estimatedReturns = futureValue - investedAmount;
    return {
      futureValue: futureValue > 0 ? futureValue : 0,
      investedAmount,
      estimatedReturns: estimatedReturns > 0 ? estimatedReturns : 0,
    };
  };

  // SWP Calculation
  const calculateSWP = () => {
    const i = swpRate / 12 / 100;
    const n = swpYears * 12;
    let balance = swpTotal;
    let totalWithdrawal = 0;

    for (let month = 1; month <= n; month++) {
      const interest = balance * i;
      balance += interest;
      balance -= swpWithdrawal;
      totalWithdrawal += swpWithdrawal;
      if (balance < 0) {
        balance = 0;
        break; // depleted
      }
    }

    return {
      finalBalance: balance,
      totalWithdrawal,
      totalInvestment: swpTotal,
    };
  };

  // Lumpsum Calculation
  const calculateLumpsum = () => {
    const futureValue = lumpsumTotal * Math.pow(1 + lumpsumRate / 100, lumpsumYears);
    const estimatedReturns = futureValue - lumpsumTotal;
    return {
      futureValue: futureValue > 0 ? futureValue : 0,
      investedAmount: lumpsumTotal,
      estimatedReturns: estimatedReturns > 0 ? estimatedReturns : 0,
    };
  };

  // Goal Calculation
  const calculateGoal = () => {
    const i = goalRate / 12 / 100;
    const n = goalYears * 12;
    let monthlySip = 0;
    if (i > 0 && n > 0) {
      monthlySip = goalTarget / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    }
    const totalInvested = monthlySip * n;
    const estimatedReturns = goalTarget - totalInvested;
    return {
      monthlySip: monthlySip > 0 ? monthlySip : 0,
      totalInvested: totalInvested > 0 ? totalInvested : 0,
      estimatedReturns: estimatedReturns > 0 ? estimatedReturns : 0,
    };
  };

  const sipResult = calculateSIP();
  const swpResult = calculateSWP();
  const lumpsumResult = calculateLumpsum();
  const goalResult = calculateGoal();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans selection:bg-[#191970] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-6 md:px-12 lg:px-20 max-w-[1280px] w-full mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-[#191970] rounded-xl flex items-center justify-center shadow-md">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#171717]">
              Financial Calculators
            </h1>
            <p className="text-neutral-500 text-[15px] mt-1">
              Plan your wealth accumulation and systematic withdrawals.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap md:flex-nowrap bg-white rounded-xl shadow-sm border border-neutral-200 p-1 mb-8 w-full max-w-3xl">
          {(["SIP", "SWP", "LUMPSUM", "GOAL"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[140px] py-3 text-[13px] sm:text-[14px] font-bold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-[#191970] text-white shadow-md"
                  : "text-neutral-600 hover:text-[#171717] hover:bg-neutral-50"
              }`}
            >
              {tab === "LUMPSUM" ? "Lumpsum" : tab === "GOAL" ? "Goal Planner" : `${tab} Calculator`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-neutral-100">
            <h2 className="text-xl font-bold text-[#171717] mb-8">
              {activeTab === "SIP" && "Systematic Investment Plan"}
              {activeTab === "SWP" && "Systematic Withdrawal Plan"}
              {activeTab === "LUMPSUM" && "Lumpsum Calculator"}
              {activeTab === "GOAL" && "Goal Planner (SIP)"}
            </h2>

            {activeTab === "SIP" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Monthly Investment</label>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">₹</span>
                      <input
                        type="number"
                        value={sipMonthly}
                        onChange={(e) => setSipMonthly(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-7 pr-3 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[120px] md:w-[140px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="1000000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Expected Return Rate (p.a)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={sipRate}
                        onChange={(e) => setSipRate(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-7 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Time Period (Years)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={sipYears}
                        onChange={(e) => setSipYears(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-8 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">Yr</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === "SWP" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Total Investment</label>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">₹</span>
                      <input
                        type="number"
                        value={swpTotal}
                        onChange={(e) => setSwpTotal(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-7 pr-3 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[120px] md:w-[140px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="50000000"
                    step="50000"
                    value={swpTotal}
                    onChange={(e) => setSwpTotal(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Withdrawal Per Month</label>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">₹</span>
                      <input
                        type="number"
                        value={swpWithdrawal}
                        onChange={(e) => setSwpWithdrawal(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-7 pr-3 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[120px] md:w-[140px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={swpWithdrawal}
                    onChange={(e) => setSwpWithdrawal(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Expected Return Rate (p.a)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={swpRate}
                        onChange={(e) => setSwpRate(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-7 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={swpRate}
                    onChange={(e) => setSwpRate(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Time Period (Years)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={swpYears}
                        onChange={(e) => setSwpYears(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-8 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">Yr</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={swpYears}
                    onChange={(e) => setSwpYears(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === "LUMPSUM" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Total Investment</label>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">₹</span>
                      <input
                        type="number"
                        value={lumpsumTotal}
                        onChange={(e) => setLumpsumTotal(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-7 pr-3 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[120px] md:w-[140px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="50000000"
                    step="10000"
                    value={lumpsumTotal}
                    onChange={(e) => setLumpsumTotal(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Expected Return Rate (p.a)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={lumpsumRate}
                        onChange={(e) => setLumpsumRate(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-7 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={lumpsumRate}
                    onChange={(e) => setLumpsumRate(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Time Period (Years)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={lumpsumYears}
                        onChange={(e) => setLumpsumYears(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-8 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">Yr</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={lumpsumYears}
                    onChange={(e) => setLumpsumYears(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === "GOAL" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Target Amount</label>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">₹</span>
                      <input
                        type="number"
                        value={goalTarget}
                        onChange={(e) => setGoalTarget(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-7 pr-3 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[120px] md:w-[140px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="100000000"
                    step="100000"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Expected Return Rate (p.a)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={goalRate}
                        onChange={(e) => setGoalRate(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-7 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={goalRate}
                    onChange={(e) => setGoalRate(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[14px] font-semibold text-neutral-600">Time to Goal (Years)</label>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={goalYears}
                        onChange={(e) => setGoalYears(Number(e.target.value))}
                        className="bg-[#F3F4F6] pl-3 pr-8 py-2 rounded-lg font-bold text-[#191970] outline-none border-2 border-transparent focus:border-[#191970]/30 w-[90px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-[#191970]">Yr</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={goalYears}
                    onChange={(e) => setGoalYears(Number(e.target.value))}
                    className="w-full accent-[#191970] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5">
            <div className="bg-[#191970] rounded-[2rem] p-8 md:p-10 text-white shadow-xl sticky top-28 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-6 text-[#A28822]">
                {activeTab === "SIP" && "SIP Returns"}
                {activeTab === "SWP" && "SWP Projection"}
                {activeTab === "LUMPSUM" && "Lumpsum Returns"}
                {activeTab === "GOAL" && "Action Plan"}
              </h3>

              {activeTab === "SIP" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Total Invested Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(sipResult.investedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Estimated Returns</p>
                    <p className="text-2xl font-bold text-emerald-400">+{formatCurrency(sipResult.estimatedReturns)}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[14px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Total Future Value</p>
                    <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      {formatCurrency(sipResult.futureValue)}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "SWP" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Total Investment</p>
                    <p className="text-2xl font-bold">{formatCurrency(swpResult.totalInvestment)}</p>
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Total Withdrawals</p>
                    <p className="text-2xl font-bold text-emerald-400">{formatCurrency(swpResult.totalWithdrawal)}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[14px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Final Balance After {swpYears} Yr</p>
                    <p className={`text-4xl md:text-5xl font-bold tracking-tight ${swpResult.finalBalance > 0 ? "text-white" : "text-red-400"}`}>
                      {swpResult.finalBalance > 0 ? formatCurrency(swpResult.finalBalance) : "Fund Depleted"}
                    </p>
                    {swpResult.finalBalance <= 0 && (
                      <p className="text-[13px] text-red-300 mt-2 font-medium">Your withdrawal amount exceeds the returns generated over this period.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "LUMPSUM" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Total Invested Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(lumpsumResult.investedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Estimated Returns</p>
                    <p className="text-2xl font-bold text-emerald-400">+{formatCurrency(lumpsumResult.estimatedReturns)}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[14px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Total Future Value</p>
                    <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      {formatCurrency(lumpsumResult.futureValue)}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "GOAL" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Target Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(goalTarget)}</p>
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Estimated Returns</p>
                    <p className="text-2xl font-bold text-emerald-400">+{formatCurrency(goalResult.estimatedReturns)}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[14px] uppercase tracking-wider text-neutral-300 font-bold mb-1">Required Monthly SIP</p>
                    <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      {formatCurrency(goalResult.monthlySip)}
                    </p>
                    <p className="text-[13px] text-neutral-300 mt-2 font-medium">Invest {formatCurrency(goalResult.monthlySip)} every month to reach your goal of {formatCurrency(goalTarget)} in {goalYears} years.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
