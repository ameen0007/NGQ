"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import TradingViewTicker from "@/components/TradingViewTicker";
import { Loader2, ArrowUpRight, ArrowDownRight, History } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function PortfolioPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [performances, setPerformances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("ALL"); // '1M', '3M', '1Y', 'ALL'

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.replace("/login");
          return; // Don't set isLoading=false — keep spinner while redirecting
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError || profileData?.role !== "client") {
          router.replace("/login");
          return; // Keep spinner during redirect
        }

        setProfile(profileData);

        // Fetch user's performance history, ordered from oldest to newest
        const { data: perfData } = await supabase
          .from("performance")
          .select("*")
          .eq("user_id", session.user.id)
          .order("week", { ascending: true });

        if (perfData) {
          setPerformances(perfData);
        }

        setIsLoading(false); // Only dismiss loading after successful auth
      } catch (error) {
        console.error(error);
        router.replace("/login");
      }
    }
    getUserData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-[#FFDD33] animate-spin" />
      </div>
    );
  }

  // --- Core Financial Formatting & Math ---
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const initialValue = profile?.invested_fund || 0;
  
  // Calculate running total of all profits safely
  const totalProfit = performances.reduce((sum, record) => sum + (Number(record.profit) || 0), 0);
  const currentValuation = initialValue + totalProfit;
  
  // Guard against divide by zero for initial 0 investments
  const netGainPctNumeric = initialValue > 0 ? (totalProfit / initialValue) * 100 : 0;
  const netGainString = (netGainPctNumeric > 0 ? "+" : "") + netGainPctNumeric.toFixed(2) + "%";
  const isGainPositive = netGainPctNumeric >= 0;

  // --- Build Mathematical Chart Data Engine ---
  // Start with their primary capital injection point.
  const masterChartData = [{ label: "Initial Capital", value: initialValue }];
  
  let dynamicRunningTotal = initialValue;
  performances.forEach((p) => {
    dynamicRunningTotal += Number(p.profit) || 0;
    masterChartData.push({
      label: `Week ${p.week}`,
      value: dynamicRunningTotal
    });
  });

  // Apply visual time-frame slicing
  let visualChartData = [...masterChartData];
  if (timeFilter === "1M") {
    // 4 weeks roughly = last 4 points + initial reference point
    visualChartData = masterChartData.slice(-4);
  } else if (timeFilter === "3M") {
    // 12 weeks
    visualChartData = masterChartData.slice(-12);
  } else if (timeFilter === "1Y") {
    // 52 weeks
    visualChartData = masterChartData.slice(-52);
  }

  // We ensure there's at least one reference point so the chart doesn't totally break if empty slice
  if (visualChartData.length === 0) {
    visualChartData = [{ label: "No Data", value: initialValue }];
  }

  // Generate an inverted array for the Recent Activity table (newest entries rendered at the top)
  const sortedLedger = [...performances].sort((a, b) => b.week - a.week);

  // --- Dynamic Subcomponents ---
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#171717] text-white px-4 py-3 rounded-xl shadow-lg border border-[#333]">
          <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-[15px] font-bold tracking-tight text-[#FFDD33]">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="font-sans antialiased text-neutral-900 selection:bg-[#FFDD33] selection:text-black">
      <main className="flex flex-col min-h-screen bg-white">
        <Navbar />

        <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-12 lg:py-20 flex flex-col gap-10 lg:gap-14">
          
          {/* Main Portfolio Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-0 border-b border-neutral-100 pb-12">
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-[4rem] font-bold tracking-tight leading-[1] mb-6 text-[#171717]">
                Welcome,<br />
                <span className="text-[#A28822]">{profile?.name}</span>
              </h1>
              <p className="text-neutral-500 text-[14px] md:text-[15px] leading-relaxed max-w-[380px]">
                Your {profile?.service_type === 'low' ? 'Low Risk' : 'Medium Risk'} financial gallery curated with precision. Track, analyze, and expand your assets directly from your master dashboard.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 self-start lg:self-auto w-full md:w-auto">
               <div className="bg-[#171717] text-white rounded-[1.5rem] px-8 py-5 flex flex-col items-center justify-center min-w-[180px] shadow-xl hover:-translate-y-1 transition-transform relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-neutral-400 mb-1">Total Absolute Valuation</span>
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">{formatCurrency(currentValuation)}</span>
              </div>
              
              <div className={`rounded-[1.5rem] px-8 py-5 flex flex-col items-center justify-center min-w-[140px] shadow-sm hover:-translate-y-1 transition-transform ${isGainPositive ? 'bg-[#FFDD33] text-[#171717]' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                <span className={`text-[9px] font-bold tracking-[0.1em] uppercase mb-1 ${isGainPositive ? 'text-neutral-800' : 'text-red-400'}`}>Aggregate Net Gain</span>
                <span className="text-2xl md:text-3xl font-bold tracking-tight">{netGainString}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* INTERACTIVE CHART ENGINE */}
            <div className="lg:col-span-2 bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col min-h-[450px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10 gap-4 md:gap-0">
                <div>
                  <h3 className="text-xl font-bold text-[#171717] tracking-tight mb-1">Valuation Trajectory</h3>
                  <p className="text-[12px] text-neutral-500">Live aggregate calculation over strictly recorded weeks.</p>
                </div>
                
                {/* W/M/Y Interactive Filter Map */}
                <div className="bg-white px-2 py-1.5 rounded-full flex gap-1 text-[11px] font-bold text-neutral-400 border border-neutral-100 shadow-sm shrink-0">
                   {["1M", "3M", "1Y", "ALL"].map(filter => (
                     <button 
                       key={filter}
                       onClick={() => setTimeFilter(filter)}
                       className={`px-4 py-1.5 rounded-full transition-all duration-300 ${timeFilter === filter ? 'bg-[#171717] text-white shadow-md' : 'hover:bg-neutral-50 hover:text-neutral-700'}`}
                     >
                       {filter}
                     </button>
                   ))}
                </div>
              </div>

              {/* The Recharts Component */}
              <div className="flex-1 w-full relative h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visualChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFDD33" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FFDD33" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                    
                    <XAxis 
                      dataKey="label" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }}
                      dy={10}
                      minTickGap={20}
                    />
                    
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D1D5DB', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#A28822" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CAPITAL VS GROWTH DISTRIBUTION WIDGET */}
            <div className="bg-white border border-neutral-100 shadow-sm rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[450px]">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[#171717] tracking-tight mb-1">Capital Integrity</h3>
                <p className="text-[12px] text-neutral-500">Deposit vs Dynamic Growth Division</p>
              </div>

              <div className="flex flex-col gap-10 flex-1 justify-center">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-neutral-400">Total Capital Injected</span>
                    <span className="text-[16px] font-semibold text-[#171717]">{formatCurrency(initialValue)}</span>
                  </div>
                  <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#171717] rounded-full w-[80%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#A28822]">Pure Realized Growth</span>
                    <span className={`text-[16px] font-semibold ${totalProfit >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {(totalProfit > 0 ? "+" : "")}{formatCurrency(totalProfit)}
                    </span>
                  </div>
                  <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden flex">
                    <div className={`h-full rounded-full w-[40%] ${totalProfit >= 0 ? 'bg-[#FFDD33]' : 'bg-red-400'}`} />
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* GENUINE RECENT PERFORMANCE LEDGER */}
          <div className="border border-neutral-100 shadow-sm rounded-[2rem] bg-white overflow-hidden mt-2">
             <div className="p-8 md:p-10 flex justify-between items-center border-b border-neutral-100 bg-[#F9FAFB]/50">
               <div>
                 <h3 className="text-xl font-bold text-[#171717] tracking-tight mb-0.5 flex items-center gap-2">
                   <History className="w-5 h-5 text-neutral-400" /> Administrative Ledger
                 </h3>
                 <p className="text-[12px] text-neutral-500">An audited record of all system-recorded weekly returns.</p>
               </div>
             </div>
             
             <div className="w-full overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[700px]">
                 <thead>
                   <tr>
                     <th className="py-5 px-8 text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase">Chronology</th>
                     <th className="py-5 px-8 text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase">System Time</th>
                     <th className="py-5 px-8 text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase">Action Type</th>
                     <th className="py-5 px-8 text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase text-right">Absolute Movement</th>
                   </tr>
                 </thead>
                 <tbody className="text-[13px]">
                   {sortedLedger.length === 0 ? (
                     <tr>
                        <td colSpan={4} className="py-12 text-center text-[13px] text-neutral-400 font-medium">
                          No performance data recorded yet.
                        </td>
                     </tr>
                   ) : (
                     sortedLedger.slice(0, 4).map((record) => {
                       const isPositive = Number(record.profit) >= 0;
                       const rawDate = new Date(record.created_at);
                       const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(rawDate);
                       
                       return (
                         <tr key={record.id} className="border-t border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                           <td className="py-6 px-8">
                             <div className="flex items-center gap-4">
                               <div className="w-8 h-8 rounded-full bg-[#F9FAFB] border border-neutral-100 flex items-center justify-center text-[10px] font-bold text-[#171717]">
                                 W{record.week}
                               </div>
                               <div>
                                 <div className="font-bold text-[#171717]">Week {record.week} Close</div>
                               </div>
                             </div>
                           </td>
                           <td className="py-6 px-8 text-neutral-500 font-medium">{formattedDate}</td>
                           <td className="py-6 px-8">
                             <span className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider ${isPositive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                               {isPositive ? 'Bullish Entry' : 'Bearish Correction'}
                             </span>
                           </td>
                           <td className={`py-6 px-8 font-bold text-[15px] text-right ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                              <div className="flex items-center justify-end gap-1.5">
                                {isPositive ? <ArrowUpRight className="w-4 h-4"/> : <ArrowDownRight className="w-4 h-4"/>}
                                {(isPositive ? "+" : "")}{formatCurrency(record.profit)}
                              </div>
                           </td>
                         </tr>
                       );
                     })
                   )}
                 </tbody>
               </table>
             </div>
          </div>

          <TradingViewTicker />

        </section>
      </main>
    </div>
  );
}
