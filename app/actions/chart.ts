"use server";

import { supabaseAdmin } from "@/lib/supabase-admin"

export async function getCompanyChartData() {
  try {
    // 1. Get total base investment
    const { data: profiles, error: profileErr } = await supabaseAdmin
      .from("profiles")
      .select("invested_fund")
      .eq("role", "client");

    if (profileErr) throw profileErr;

    const baseInvestment = profiles?.reduce((sum, p) => sum + (Number(p.invested_fund) || 0), 0) || 0;

    // 2. Get all performance records
    const { data: performance, error: perfErr } = await supabaseAdmin
      .from("performance")
      .select("year, week, profit")
      .order("year", { ascending: true })
      .order("week", { ascending: true });

    if (perfErr) throw perfErr;

    // 3. Group profits by year-week
    const weeklyProfits: Record<string, number> = {};
    const sortedLabels: string[] = [];

    if (performance && performance.length > 0) {
      performance.forEach(record => {
        const label = `W${record.week} ${record.year}`;
        if (!weeklyProfits[label]) {
          weeklyProfits[label] = 0;
          sortedLabels.push(label); // they are already ordered from db
        }
        weeklyProfits[label] += Number(record.profit) || 0;
      });
    }

    // 4. Build chart points
    // If no performance data, just return a single point or few mock points of current base
    if (sortedLabels.length === 0) {
      return {
        data: [
          { name: "Start", invested: baseInvestment, totalValue: baseInvestment },
          { name: "Current", invested: baseInvestment, totalValue: baseInvestment }
        ]
      };
    }

    let cumulativeProfit = 0;
    const chartData = sortedLabels.map(label => {
      cumulativeProfit += weeklyProfits[label];
      // Note: we just use current baseInvestment as a flat line for simplicity,
      // and add cumulative profit for the total value.
      return {
        name: label,
        invested: baseInvestment,
        totalValue: baseInvestment + cumulativeProfit
      };
    });

    // Add a "Start" point before the first week manually
    const finalData = [
      { name: "Start", invested: baseInvestment, totalValue: baseInvestment },
      ...chartData
    ];

    return { data: finalData };
  } catch (error: any) {
    return { error: error.message };
  }
}
