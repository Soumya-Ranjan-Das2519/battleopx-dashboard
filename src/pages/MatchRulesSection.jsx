import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import Header from "../components/Header";

export default function MatchRulesSection() {
  const [showAddRule, setShowAddRule] = useState(false);

  const rules = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    game: "User Joined Games",
    heading:
      "Your return balance of 34 has been successfully credited to your account.",
  }));

  return (
    <div className="flex flex-col h-full w-full">

      {/* ===== Header Always On Top ===== */}
      <Header
        title="Match rules"
        subtitle="Welcome back! Here's your gaming platform overview"
      />

      {/* ===== CONDITIONAL RENDERING ===== */}
      {!showAddRule ? (
        /* ================= TABLE VIEW ================= */
        <div className="flex-1 px-8 py-6 overflow-hidden">

          <div className="bg-[#0c1630] border border-[#1a2a4a] rounded-2xl flex flex-col h-full">

            {/* Table Header */}
            <div className="grid grid-cols-4 px-6 py-4 border-b border-[#1a2a4a] text-gray-300 font-semibold text-sm">
              <div>S no.</div>
              <div>Game</div>
              <div>Heading</div>
              <div className="text-center">Action</div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto">

              {rules.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 px-6 py-4 border-b border-[#1a2a4a] text-gray-300 text-sm items-center hover:bg-[#0f1d3d] transition"
                >
                  <div>{index + 1}</div>

                  <div>{item.game}</div>

                  <div className="flex items-center gap-3">
                    <span>{item.heading}</span>
                    <FaInfoCircle
                      className="text-gray-400"
                      size={14}
                    />
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <button className="text-gray-400 hover:text-white">
                      <FiMoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}

            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1F2A52]">

              {/* Empty left */}
              <div></div>

              {/* Add Rules Button */}
              <button
                onClick={() => setShowAddRule(true)}
                className="bg-[#00b0e0] hover:bg-[#0095c8] text-white px-6 py-2 rounded-full font-semibold transition flex items-center gap-2"
              >
                <span className="text-lg">+</span> Add Rules
              </button>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-4 p-4 border-t border-[#1F2A52] text-sm text-gray-300">
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
      ) : (
        /* ================= ADD RULE VIEW ================= */
        <div className="flex-1 px-8 py-6">

          <div className="bg-[#0c1630] border border-[#1a2a4a] rounded-2xl p-10">

            <h3 className="text-lg font-semibold mb-6 text-white">
              Add Game Rules
            </h3>

            {/* Title */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-white">
                Title<span>*</span>
              </label>
              <select className="w-full mt-2 bg-[#0f1d3d] border border-[#1a2a4a] rounded-lg px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#00b0e0]">
                <option>Enter Minimum Amount</option>
                <option>FREEFIRE</option>
                <option>PUBG</option>
              </select>
            </div>

            {/* Match Rules */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-white">
                Match Rules<span>*</span>
              </label>
              <textarea
                rows="4"
                placeholder="Enter maximum Amount"
                className="w-full mt-2 bg-[#0f1d3d] border border-[#1a2a4a] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#00b0e0]"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-6">
              <button className="bg-[#00b0e0] hover:bg-[#0095c8] px-10 py-2 rounded-lg text-white text-sm font-semibold transition">
                Add Rule
              </button>

              <button
                onClick={() => setShowAddRule(false)}
                className="bg-[#00b0e0] hover:bg-[#0095c8] px-10 py-2 rounded-lg text-white text-sm font-semibold transition"
              >
                Submit Rule
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}