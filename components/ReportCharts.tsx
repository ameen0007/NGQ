"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#191970', '#3b3b98', '#6a6ac6', '#9c9cf4', '#ceceff'];

export function AssetDonutChart({ data }: { data: { name: string; value: number }[] }) {
  const filteredData = data.filter(d => d.value > 0);
  if (filteredData.length === 0) return <div className="text-sm text-neutral-400 p-10 text-center">No asset data available.</div>;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            animationDuration={0} // Disable animation for puppeteer capture
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
