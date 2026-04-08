"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getCompanyChartData } from "@/app/actions/chart";

export default function InvestmentMapChart() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getCompanyChartData();
      if (res.data) {
        setData(res.data);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const currentInvested = data.length > 0 ? data[data.length - 1].invested : 0;
  const currentTotal = data.length > 0 ? data[data.length - 1].totalValue : 0;
  const profitAmt = currentTotal - currentInvested;
  const growthPercentage = currentInvested > 0 ? ((profitAmt / currentInvested) * 100).toFixed(1) : "0.0";

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16">
      <div className="bg-[#171717] rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-14 relative overflow-hidden border border-[#333]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFDD33]/10 blur-[100px] rounded-full -mt-[250px] -mr-[250px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -mb-[200px] -ml-[200px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-12 relative z-10 gap-8">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Total Company Growth Map</h2>
            <p className="text-neutral-400 text-[15px] leading-relaxed">
              Dynamically reflecting the aggregate performance of our entire managed portfolio. Watch the total investments grow week over week alongside calculated market profits.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6 shrink-0">
            {/* The stats boxes */}
            {!isLoading && data.length > 0 && (
              <div className="flex flex-col sm:flex-row w-full gap-3 sm:w-max">
                <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex flex-col items-start w-full sm:w-max min-w-[160px]">
                  <span className="text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase mb-1.5 whitespace-nowrap">Current AUM</span>
                  <span className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">₹{currentInvested.toLocaleString()}</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-4 flex flex-col items-start w-full sm:w-max min-w-[160px]">
                  <span className="text-[10px] font-bold tracking-[0.1em] text-emerald-500/80 uppercase mb-1.5 whitespace-nowrap">Net Profit Growth</span>
                  <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap whitespace-nowrap">
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400">+{growthPercentage}%</span>
                    <span className="text-[12px] sm:text-sm font-semibold text-emerald-400/60 mt-0.5">
                      (₹{profitAmt.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">Base Invested (AUM)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFDD33]" />
                <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">Total Cumulative Value</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] relative z-10 flex items-center justify-center">
          {isLoading ? (
            <div className="text-neutral-500 animate-pulse text-sm tracking-widest uppercase font-bold">
              Aggregating Portfolio Data...
            </div>
          ) : data.length === 0 ? (
            <div className="text-neutral-500 text-sm tracking-widest uppercase font-bold">
              Awaiting Investment Data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFDD33" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FFDD33" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#a3a3a3", fontSize: 10, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#a3a3a3", fontSize: 10, fontWeight: 500 }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  width={40}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#262626",
                    border: "1px solid #404040",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                  }}
                  itemStyle={{ fontSize: "14px", fontWeight: 600 }}
                  labelStyle={{ color: "#a3a3a3", marginBottom: "4px" }}
                  formatter={(value: any) => [`₹${Math.round(value).toLocaleString()}`, ""]}
                />
                <Area
                  type="monotone"
                  dataKey="totalValue"
                  name="Total Portfolio Value"
                  stroke="#FFDD33"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="invested"
                  name="Base Initial Invested"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorInvested)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}
