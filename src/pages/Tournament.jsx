import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";




const gamesData = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  title: "FREEFIRE",
  gameName:
    i === 0 || i === 1 || i === 4
      ? "FREEFIRE MAX"
      : i === 2 || i === 3
      ? "FREEFIRE LONELY WOLF"
      : "FREEFIRE",
}));

export default function TournamentPage() {
  const [currentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className="flex h-screen bg-[#0a1224] text-white overflow-hidden"
    >
      {/* Sidebar */}
      <Sidebar/>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Tournaments"
          subtitle="Manage tournament details and registrations"
        />

        {/* Content */}
        <main className="flex-1 overflow-auto px-8 py-6">
          {/* Add Button */}
          <div className="flex justify-end mb-5">
            <button className="flex items-center gap-2 bg-[#00b0e0] hover:bg-[#00b0e0] text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wider ">
              <span className="text-lg leading-none">+</span>
              E-sports Games
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-[#070f1f] rounded-2xl border border-[#0d2040] overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-[#0d2040]">
              <h2 className="text-xl font-black tracking-widest text-white">All Games</h2>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-[#0d2040]">
                  {["S no.", "Title", "Game Name", "Image Preview", "Action"].map((col) => (
                    <th
                      key={col}
                      className="py-4 px-6 text-xs font-bold tracking-widest text-[#3a6090] uppercase text-center"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gamesData.map((game) => (
                  <tr
                    key={game.id}
                    onMouseEnter={() => setHoveredRow(game.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`border-b border-[#0a1828] transition-all duration-150 ${
                      hoveredRow === game.id ? "bg-[#091525]" : ""
                    }`}
                  >
                    <td className="py-3.5 px-6 text-center text-sm text-[#4a6a8a] font-semibold">
                      {game.id}
                    </td>
                    <td className="py-3.5 px-6 text-center text-xs font-bold tracking-widest text-[#8ab0d0]">
                      {game.title}
                    </td>
                    <td className="py-3.5 px-6 text-center text-xs font-bold tracking-widest text-[#8ab0d0]">
                      {game.gameName}
                    </td>
                    <td className="py-3.5 px-6 flex justify-center">
                      <div className="w-10 h-10 rounded-md bg-[#0d1f35] border border-[#1a3a5a] flex items-center justify-center">
                        <span className="text-[#1a3a5a] text-xs">▣</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        {/* Info button */}
                        <button className="w-7 h-7 rounded-full border border-[#1a4070] text-white hover:border-[#0084ff] hover:text-[#0084ff] text-xs flex items-center justify-center transition-colors">
                          ℹ
                        </button>
                        {/* More options */}
                        <button className="flex items-center gap-0.5 text-[#3a6080] hover:text-white transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-[#0d2040]">
              <button className="px-4 py-1.5 rounded-md text-xs font-bold tracking-wider text-[#4a6a8a] bg-[#0a1828] border border-[#0d2a4a] hover:border-[#0084ff] hover:text-white transition-all">
                Previous
              </button>
              <span className="text-xs text-[#3a5a7a]">Page {currentPage} of 1</span>
              <button className="px-4 py-1.5 rounded-md text-xs font-bold tracking-wider text-[#4a6a8a] bg-[#0a1828] border border-[#0d2a4a] hover:border-[#0084ff] hover:text-white transition-all">
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}