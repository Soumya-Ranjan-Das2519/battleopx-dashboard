import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "BGMI", value: 400 },
  { name: "FREE FIRE", value: 300 },
  { name: "CALL OF DUTY", value: 300 },
];

const COLORS = ["#38bdf8", "#ef4444", "#a78bfa"];

export default function DoughnutChartCard() {
  return (
    <div className="bg-[#0f1b3d] p-6 rounded-2xl border border-slate-300 h-[450px] text-white">
      <h3 className="text-lg font-semibold mb-4">Tournament Summary</h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
