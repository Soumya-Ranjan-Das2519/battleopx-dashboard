import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FiMoreVertical } from "react-icons/fi";

export default function Tournament() {
  const [tournaments] = useState([
    {
      id: 1,
      title: "Weekend Battle",
      game: "BGMI",
      entryFee: 50,
      prizePool: 5000,
      totalSlots: 100,
      filledSlots: 40,
      date: "25-02-2026",
      time: "18:00",
      status: "Upcoming",
    },
  ]);

  return (
    <div className="flex h-screen bg-[#071028] text-white overflow-hidden">

      {/* Sidebar */}
      <div className="w-64 bg-[#0c1630]">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header
          title="E-sports"
          subtitle="Manage game tournaments and room details"
        />

        {/* Top Right Button */}
        <div className="px-8 pt-6 flex justify-end">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2 rounded-full text-sm font-medium">
            + E-sports Games
          </button>
        </div>

        {/* Table Card */}
        <div className="flex-1 px-8 py-6 overflow-hidden">

          <div className="h-full border border-white/20 rounded-2xl bg-[#0f1b3d] shadow-[0_0_35px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden">

            {/* Title */}
            <div className="px-6 py-4 border-b border-white/20">
              <h2 className="text-lg font-semibold">All Games</h2>
            </div>

            {/* Scrollable Table */}
            <div className="flex-1 overflow-auto">

              <table className="w-full text-sm whitespace-nowrap">

                {/* Header */}
                <thead className="sticky top-0 bg-[#0f1b3d] border-b border-white/20 text-slate-300">
                  <tr>
                    <th className="px-6 py-4 text-left">S no.</th>
                    <th className="py-4 text-left">Title</th>
                    <th className="py-4 text-left">Game Name</th>
                    <th className="py-4 text-left">Entry Fee</th>
                    <th className="py-4 text-left">Prize Pool</th>
                    <th className="py-4 text-left">Slots</th>
                    <th className="py-4 text-left">Date</th>
                    <th className="py-4 text-left">Time</th>
                    <th className="py-4 text-left">Status</th>
                    <th className="py-4 text-center">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {tournaments.map((t, index) => (
                    <tr
                      key={t.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td>{t.title}</td>
                      <td>{t.game}</td>
                      <td>₹{t.entryFee}</td>
                      <td>₹{t.prizePool}</td>
                      <td>
                        {t.filledSlots}/{t.totalSlots}
                      </td>
                      <td>{t.date}</td>
                      <td>{t.time}</td>

                      {/* Status Badge */}
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            t.status === "Upcoming"
                              ? "bg-yellow-600/20 text-yellow-400"
                              : t.status === "Live"
                              ? "bg-green-600/20 text-green-400"
                              : t.status === "Completed"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-red-600/20 text-red-400"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="text-center">
                        <FiMoreVertical className="mx-auto cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Pagination (Same Style) */}
            <div className="px-6 py-3 border-t border-white/20 flex justify-end gap-4 text-sm">
              <button className="px-4 py-1 bg-white/10 rounded">
                Previous
              </button>
              <span>Page 1 of 5</span>
              <button className="px-4 py-1 bg-white/10 rounded">
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}