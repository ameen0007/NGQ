import { supabaseAdmin } from "@/lib/supabase-admin";
import { generateReportData } from "@/lib/reportEngine";
import { AssetDonutChart } from "@/components/ReportCharts";
import { notFound } from "next/navigation";
import { ShieldCheck, Target, TrendingUp, Activity, Heart, Briefcase, FileText } from "lucide-react";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: profile } = await supabaseAdmin.from("profiles").select("*").eq("id", resolvedParams.id).single();
  if (!profile) return notFound();

  const report = generateReportData(profile);
  const { metrics, wellness, flags, observations } = report;

  // Format currency
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // Colors
  const bgBlue = "bg-[#191970]";
  const textBlue = "text-[#191970]";
  const borderBlue = "border-[#191970]";
  const bgGrey = "bg-[#DFDFE9]";

  const A4Page = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto print:mx-0 shadow-xl print:shadow-none overflow-hidden relative flex flex-col mb-8 print:mb-0 break-after-page text-black font-sans">
      {/* Header */}
      <div className={`h-[15mm] ${bgBlue} flex items-center px-8 shrink-0`}>
        <div className="text-white font-bold text-lg tracking-widest uppercase">FINZAVIO</div>
        <div className="ml-auto text-white/80 text-xs">Private & Confidential</div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-10 flex flex-col gap-6">
        {children}
      </div>

      {/* Footer */}
      <div className={`h-[12mm] ${bgGrey} flex items-center px-8 shrink-0 mt-auto`}>
        <div className="text-xs text-neutral-600 font-medium">FINZAVIO Financial Services LLP</div>
        <div className="ml-auto text-xs text-neutral-500">{new Date().toLocaleDateString('en-IN')}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-200 py-10 print:py-0 print:bg-white text-black" id="pdf-report-container">
      
      {/* PAGE 1: COVER & SNAPSHOT */}
      <A4Page>
        <div className="flex flex-col items-center justify-center flex-1 py-20 text-center">
          <div className={`w-32 h-1 bg-[#191970] mb-8`}></div>
          <h1 className={`text-5xl font-black ${textBlue} tracking-tight mb-4 uppercase`}>Financial Wellness</h1>
          <h2 className="text-3xl font-light text-neutral-600 mb-12 tracking-wide uppercase">Assessment Report</h2>
          
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 w-full max-w-lg mb-16 shadow-sm">
            <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest mb-2">Prepared For</p>
            <p className="text-2xl font-bold text-black">{profile.name}</p>
            {profile.city && <p className="text-neutral-500 mt-1">{profile.city}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Date</p>
              <p className="font-semibold">{new Date().toLocaleDateString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Reference ID</p>
              <p className="font-semibold text-xs text-neutral-500">{profile.id.substring(0,8).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </A4Page>

      {/* PAGE 2: FINANCIAL HEALTH SNAPSHOT */}
      <A4Page>
        <div className={`flex items-center gap-3 border-b-2 ${borderBlue} pb-3 mb-6`}>
          <Activity className={`w-6 h-6 ${textBlue}`} />
          <h2 className={`text-2xl font-bold ${textBlue} uppercase tracking-wide`}>Financial Health Snapshot</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">FINZAVIO Wellness Score</p>
            <div className="flex items-end gap-3 mt-2">
              <span className={`text-5xl font-black ${wellness.score >= 70 ? 'text-emerald-600' : wellness.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                {wellness.score}
              </span>
              <span className="text-xl font-medium text-neutral-400 mb-1">/ 100</span>
            </div>
            <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-white border shadow-sm">
              Rating: {wellness.rating}
            </div>
          </div>
          <div className={`p-6 rounded-xl border ${bgBlue} text-white shadow-md`}>
            <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">Estimated Net Worth</p>
            <p className="text-4xl font-bold mt-2">{formatCurrency(metrics.netWorth)}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-white/80">
              <div className="flex justify-between"><span>Total Assets</span><span>{formatCurrency(metrics.totalAssets)}</span></div>
              <div className="flex justify-between"><span>Total Liabilities</span><span>{formatCurrency(metrics.totalLiabilities)}</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="border border-neutral-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-neutral-600 uppercase tracking-wide">Savings Ratio</p>
              <TrendingUp className="w-4 h-4 text-neutral-400" />
            </div>
            <p className="text-2xl font-bold">{metrics.savingsRatio.toFixed(1)}%</p>
            <div className="w-full bg-neutral-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(metrics.savingsRatio, 100)}%` }}></div>
            </div>
          </div>
          
          <div className="border border-neutral-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-neutral-600 uppercase tracking-wide">EMI Burden Ratio</p>
              <Activity className="w-4 h-4 text-neutral-400" />
            </div>
            <p className="text-2xl font-bold">{metrics.emiBurdenRatio.toFixed(1)}%</p>
            <div className="w-full bg-neutral-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className={`h-full ${metrics.emiBurdenRatio > 40 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(metrics.emiBurdenRatio, 100)}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center gap-3 border-b-2 ${borderBlue} pb-3 mb-6 mt-4`}>
          <FileText className={`w-6 h-6 ${textBlue}`} />
          <h2 className={`text-2xl font-bold ${textBlue} uppercase tracking-wide`}>Key Observations</h2>
        </div>
        <div className="flex flex-col gap-4">
          {observations.map((obs, i) => (
            <div key={i} className="flex gap-4 items-start bg-neutral-50 p-4 rounded-xl border border-neutral-100">
              <div className={`w-6 h-6 rounded-full ${bgBlue} text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5`}>{i+1}</div>
              <p className="text-sm text-neutral-700 leading-relaxed font-medium">{obs}</p>
            </div>
          ))}
          {observations.length === 0 && (
            <p className="text-sm text-neutral-500 italic">No specific observations generated based on the provided profile data.</p>
          )}
        </div>
      </A4Page>

      {/* PAGE 3: ASSETS & LIABILITIES */}
      <A4Page>
        <div className="grid grid-cols-2 gap-8 h-full">
          <div className="flex flex-col">
            <div className={`flex items-center gap-3 border-b-2 ${borderBlue} pb-3 mb-6`}>
              <Briefcase className={`w-6 h-6 ${textBlue}`} />
              <h2 className={`text-2xl font-bold ${textBlue} uppercase tracking-wide`}>Asset Overview</h2>
            </div>
            
            <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-100 mb-6">
              <AssetDonutChart data={[
                { name: "Bank", value: Number(profile.bank_savings) || 0 },
                { name: "FD/RD", value: Number(profile.fd_rd_value) || 0 },
                { name: "Mutual Funds", value: Number(profile.mutual_fund_value) || 0 },
                { name: "Stocks", value: Number(profile.stocks_value) || 0 },
                { name: "Gold", value: Number(profile.gold_value) || 0 },
                { name: "Real Estate", value: Number(profile.real_estate_value) || 0 },
                { name: "Other", value: Number(profile.other_assets) || 0 },
              ]} />
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: "Bank Savings", value: profile.bank_savings },
                { label: "FD / RD", value: profile.fd_rd_value },
                { label: "Mutual Funds", value: profile.mutual_fund_value },
                { label: "Stocks", value: profile.stocks_value },
                { label: "Gold", value: profile.gold_value },
                { label: "Real Estate", value: profile.real_estate_value },
                { label: "Other Assets", value: profile.other_assets }
              ].filter(a => Number(a.value) > 0).map((a, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-neutral-100 text-sm">
                  <span className="font-medium text-neutral-600">{a.label}</span>
                  <span className="font-bold">{formatCurrency(Number(a.value))}</span>
                </div>
              ))}
            </div>
            <div className={`mt-4 p-4 rounded-xl ${bgBlue} text-white flex justify-between items-center`}>
              <span className="font-bold uppercase text-xs">Total Assets</span>
              <span className="font-bold text-lg">{formatCurrency(metrics.totalAssets)}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className={`flex items-center gap-3 border-b-2 border-red-800 pb-3 mb-6`}>
              <Activity className={`w-6 h-6 text-red-800`} />
              <h2 className={`text-2xl font-bold text-red-800 uppercase tracking-wide`}>Liability Overview</h2>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {[
                { label: "Home Loan", value: profile.home_loan_outstanding },
                { label: "Personal Loan", value: profile.personal_loan },
                { label: "Vehicle Loan", value: profile.vehicle_loan },
                { label: "Credit Card", value: profile.credit_card_outstanding },
                { label: "Other Liabilities", value: profile.other_liabilities }
              ].map((l, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-neutral-100 text-sm">
                  <span className="font-medium text-neutral-600">{l.label}</span>
                  <span className="font-bold">{formatCurrency(Number(l.value) || 0)}</span>
                </div>
              ))}
            </div>
            <div className={`mt-auto p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex justify-between items-center`}>
              <span className="font-bold uppercase text-xs">Total Liabilities</span>
              <span className="font-bold text-lg">{formatCurrency(metrics.totalLiabilities)}</span>
            </div>
          </div>
        </div>
      </A4Page>

      {/* PAGE 4: PROTECTION & GOALS */}
      <A4Page>
        <div className={`flex items-center gap-3 border-b-2 ${borderBlue} pb-3 mb-6`}>
          <ShieldCheck className={`w-6 h-6 ${textBlue}`} />
          <h2 className={`text-2xl font-bold ${textBlue} uppercase tracking-wide`}>Protection Readiness</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`p-4 rounded-xl border ${flags.hasHealthIns ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Health Insurance</p>
            <p className={`text-lg font-bold ${flags.hasHealthIns ? 'text-emerald-700' : 'text-red-700'}`}>
              {flags.hasHealthIns ? `Available (${formatCurrency(Number(profile.health_insurance_amount) || 0)})` : 'Not Available'}
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${flags.hasLifeIns ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Life Insurance</p>
            <p className={`text-lg font-bold ${flags.hasLifeIns ? 'text-emerald-700' : 'text-red-700'}`}>
              {flags.hasLifeIns ? `Available (${formatCurrency(Number(profile.life_insurance_amount) || 0)})` : 'Not Available'}
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${flags.hasEmergencyFund ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Emergency Fund</p>
            <p className={`text-lg font-bold ${flags.hasEmergencyFund ? 'text-emerald-700' : 'text-amber-700'}`}>
              {flags.hasEmergencyFund ? 'Available' : 'Insufficient / Unknown'}
            </p>
          </div>
          <div className={`p-4 rounded-xl border bg-neutral-50 border-neutral-200`}>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Risk Profile</p>
            <p className={`text-lg font-bold text-neutral-900 capitalize`}>
              {profile.risk_profile || 'Unassessed'}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 border-b-2 ${borderBlue} pb-3 mb-6 mt-4`}>
          <Target className={`w-6 h-6 ${textBlue}`} />
          <h2 className={`text-2xl font-bold ${textBlue} uppercase tracking-wide`}>Financial Goals</h2>
        </div>

        {Array.isArray(profile.advanced_financial_goals) && profile.advanced_financial_goals.length > 0 ? (
          <div className="flex flex-col gap-3">
            {profile.advanced_financial_goals.map((g: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-neutral-900">{g.type}</span>
                  <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Target: {g.year} • Priority: {g.priority}</span>
                </div>
                <div className="text-xl font-bold text-[#191970]">
                  {formatCurrency(Number(g.amount) || 0)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500 italic p-6 text-center border border-dashed border-neutral-300 rounded-xl">
            No advanced financial goals have been explicitly defined for this profile.
          </p>
        )}
      </A4Page>

      {/* PAGE 5: DISCLAIMER */}
      <A4Page>
        <div className={`flex items-center gap-3 border-b-2 ${borderBlue} pb-3 mb-6`}>
          <ShieldCheck className={`w-6 h-6 ${textBlue}`} />
          <h2 className={`text-2xl font-bold ${textBlue} uppercase tracking-wide`}>Legal Disclaimer</h2>
        </div>
        
        <div className="flex flex-col gap-4 text-[11px] leading-relaxed text-justify text-neutral-600 mb-12">
          <p>This report has been prepared based on information voluntarily provided by the client and processed through internal profiling and assessment models used for financial wellness review and educational understanding.</p>
          <p>FINZAVIO Financial Services LLP operates primarily under a distribution-based business model and is not acting as a SEBI-registered Investment Adviser or SEBI-registered Research Analyst for the purpose of this report.</p>
          <p>The contents of this report are intended solely for educational understanding, financial awareness, client profiling, and informational review.</p>
          <p>This document does not constitute investment advice, research recommendation, personalized advisory service, portfolio management service, or guaranteed financial outcome of any kind.</p>
          <p>Any observations, illustrations, risk assessments, or financial wellness scores presented in this report are indicative in nature and should not be construed as a binding recommendation or solicitation to buy, sell, invest, or act in any financial product solely based on this report.</p>
          <p>Clients are encouraged to undertake independent evaluation and consult appropriate licensed professionals wherever required before making financial decisions.</p>
          <p>FINZAVIO Financial Services LLP values transparency, honesty, and client trust, and this report is shared in good faith as part of our commitment to improving financial awareness and informed decision-making.</p>
          <p>Past performance, assumptions, projections, illustrations, and score-based outputs do not guarantee future outcomes.</p>
          <p>All financial decisions carry risks and should be considered carefully based on individual circumstances.</p>
        </div>

        <div className="mt-auto border-t border-neutral-200 pt-8 flex flex-col gap-1 text-center items-center">
          <p className="font-bold text-neutral-900">Mahin Ahmad, CWM</p>
          <p className="text-sm text-neutral-600 font-medium">Founder & CEO – FINZAVIO Financial Services LLP</p>
          <p className="text-xs text-neutral-500 italic mt-1">Chartered Wealth Manager & Financial Coach & Real Estate Investment Advisor</p>
        </div>
      </A4Page>

    </div>
  );
}
