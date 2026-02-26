import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import React from "react";
import { FiFilter } from "react-icons/fi";

const chartData = [
  { month: "Jan", value: 27000 },
  { month: "Feb", value: 27000 },
  { month: "Mar", value: 40000 },
  { month: "Apr", value: 40000 },
  { month: "May", value: 32000 },
  { month: "Jun", value: 32000 },
  { month: "Jul", value: 50000 },
  { month: "Aug", value: 50000 },
  { month: "Sept", value: 50000 },
  { month: "Oct", value: 35000 },
  { month: "Nov", value: 35000 },
  { month: "Dec", value: 45000 },
];

const tabs = [
  "Total Registered User",
  "Active users",
  "Revenue",
  "Tournaments",
];

export default function ReportChart() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="relative bg-[#0f1b3d] h-[450px] rounded-2xl p-6 border border-slate-300 shadow-[0_0_25px_rgba(0,255,255,0.10)]">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-white text-xl font-semibold">Report</h2>
        <FiFilter className="text-slate-400 text-xl cursor-pointer hover:text-white" />
      </div>

      {/* Tabs Section */}
      <div className="flex flex-wrap gap-8 mb-6">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="cursor-pointer"
          >
            <h3 className="text-white font-semibold">50k</h3>
            <p
              className={`text-sm mt-1 ${
                activeTab === tab
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "text-slate-400"
              }`}
            >
              {tab}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
