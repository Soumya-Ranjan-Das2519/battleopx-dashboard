import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import Header from "../components/Header";

export default function MatchRulesSection() {
  const rules = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    game: "User Joined Games",
    heading:
      "Your return balance of 34 has been successfully credited to your account.",
  }));

  return (
    <div className="flex flex-col h-full w-full">

      {/* ===== Top Header (Full Width) ===== */}
      <div className="w-full">
        <Header
          title="Match rules"
          subtitle="Welcome back! Here's your gaming platform overview"
        />
      </div>

      {/* ===== Content Area ===== */}
      <div className="flex-1 px-8 py-6 overflow-hidden">

        <div className="bg-[#0c1630] border border-[#1a2a4a] rounded-2xl flex flex-col h-full">

          {/* Table Header */}
          <div className="grid grid-cols-4 px-6 py-4 border-b border-[#1a2a4a] text-gray-300 font-semibold text-sm">
            <div className="text-left">S no.</div>
            <div className="text-left">Game</div>
            <div className="text-left">Heading</div>
            <div className="text-center">Action</div>
          </div>

          {/* Scrollable Table Body */}
          <div className="flex-1 overflow-y-auto">

            {rules.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-4 px-6 py-4 border-b border-[#1a2a4a] text-gray-300 text-sm items-center hover:bg-[#0f1d3d] transition"
              >
                <div>{index + 1}</div>

                <div>{item.game}</div>

                <div className="flex items-center gap-18">
                  <span>{item.heading}</span>
                </div>

                <div className="flex justify-center">
                    <FaInfoCircle className="text-gray-400" size={14} />
                    <button className="text-gray-400 hover:text-white ml-2">
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between px-6 py-4  border-[#1a2a4a]">
            <div></div>
            {/* Add Rules Button */}
            <button className="bg-[#00b0e0] hover:bg-[#0095c8] text-white px-6 py-2 rounded-full font-semibold transition flex items-center gap-2">
              <span className="text-lg">+</span> Add Rules
            </button>
          </div>

        <div className="flex justify-end items-center gap-4 p-2 border-t border-[#1F2A52] text-sm text-gray-300">
            <button className="px-4 py-2 bg-[#0F1A3C] rounded-lg hover:bg-[#1A2554]">
              Previous
            </button>

            <span>Page 1 of 1</span>

            <button className="px-4 py-2 bg-[#0F1A3C] rounded-lg hover:bg-[#1A2554]">
              Next
            </button>
        </div>

        </div>
      </div>
    </div>
  );
}