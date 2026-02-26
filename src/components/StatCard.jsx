import React from "react";
export default function StatCard({ title, value, titleColor }) {
  return (
    <div className="relative 
                bg-[#0f1b3d] 
                rounded-2xl 
                p-6 
                border border-slate-300
                shadow-[0_0_30px_rgba(255,255,255,0.10)]
                backdrop-blur-sm text-white">

      <p className={`text-sm font-medium ${titleColor}`}>
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

