import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaEllipsisV, FaPlus, FaEdit } from "react-icons/fa";

export default function RewardsPage() {
  // ── Page State (same pattern as convertor | note | withdrawal) ──
  const [activePage, setActivePage] = useState("rewards"); // "rewards" | "addReward"

  // ── Rewards Data ──
  const [rewards, setRewards] = useState(
    Array.from({ length: 17 }, (_, i) => ({
      id: i + 1,
      img: null,
      amount: 50,
      date: "13-02-2006",
    }))
  );

  // ── Add Reward Form State ──
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const fileRef = useRef();

  // ── Pagination ──
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rewards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = rewards.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1); };
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(p => p - 1); };

  // ── Image Upload ──
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgSrc(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ── Reset Form ──
  const resetForm = () => {
    setAmount("");
    setDate("");
    setImgSrc(null);
  };

  // ── Submit New Reward ──
  const handleSubmit = () => {
    if (!amount || !date) {
      alert("Please select Amount and Date.");
      return;
    }
    const [y, m, d] = date.split("-");
    setRewards(prev => [
      ...prev,
      {
        id: prev.length + 1,
        img: imgSrc,
        amount: parseInt(amount),
        date: `${d}-${m}-${y}`,
      },
    ]);
    resetForm();
    setActivePage("rewards");
  };

  return (
    <div className="flex min-h-screen bg-[#0a1224] text-white">

      {/* ── Sidebar ── */}
      <div className="w-64 bg-[#0c1630] border-r border-white/10">
        <Sidebar />
      </div>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col">
        <Header
          title="Rewards"
          subtitle="Welcome back! Here's your gaming platform overview"
        />

        <div className="m-6 rounded-2xl border border-white/20 bg-[#0f1b3d] p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">

          {/* ======================================================
              REWARDS LIST PAGE
          ====================================================== */}
          {activePage === "rewards" && (
            <>
              {/* Top Bar */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm lowercase text-white/80">daily rewards</h2>
                <button
                  onClick={() => { resetForm(); setActivePage("addReward"); }}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-full text-sm transition"
                >
                  <FaPlus size={12} />
                  Add Daily rewards
                </button>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-white/20 overflow-hidden">

                {/* Header Row */}
                <div className="grid grid-cols-5 bg-[#142046] px-6 py-4 text-sm text-white/70 font-medium">
                  <div>S no.</div>
                  <div>Image</div>
                  <div>Amount</div>
                  <div>Date</div>
                  <div className="text-center">Actions</div>
                </div>

                {/* Body Rows */}
                {currentData.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-5 items-center px-6 py-5 border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <div className="text-white/70 text-sm">{startIndex + index + 1}</div>

                    <div>
                      {item.img
                        ? <img src={item.img} alt="reward" className="w-14 h-14 rounded-md object-cover" />
                        : <div className="w-14 h-14 bg-gray-400 rounded-md" />
                      }
                    </div>

                    <div className="font-medium">{item.amount}</div>

                    <div className="text-white/80 text-sm">{item.date}</div>

                    <div className="flex justify-center">
                      <FaEllipsisV className="text-white/70 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                ))}

                {currentData.length === 0 && (
                  <div className="text-center py-10 text-white/50">No rewards available</div>
                )}

                {/* Pagination */}
                <div className="flex justify-end items-center gap-4 px-6 py-4 border-t border-white/10 bg-[#101a34]">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#1b274b] rounded-md text-sm hover:bg-[#243567] disabled:opacity-40 transition"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-white/60">
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#1b274b] rounded-md text-sm hover:bg-[#243567] disabled:opacity-40 transition"
                  >
                    Next
                  </button>
                </div>

              </div>
            </>
          )}

          {/* ======================================================
              ADD REWARD PAGE — same pattern as "note" page
          ====================================================== */}
          {activePage === "addReward" && (
            <>
              {/* Title + Close — exactly like NOTE page header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold tracking-wide">
                  Add Daily Reward
                </h2>
                <button
                  onClick={() => { resetForm(); setActivePage("rewards"); }}
                  className="text-white/60 hover:text-red-400 text-xl transition"
                >
                  ✕
                </button>
              </div>

              {/* Form Card — same style as NOTE's textarea card */}
              <div className="bg-[#1b274b] rounded-xl p-6 mb-8 border border-white/10 w-full max-w-3xl">
                <div className="flex gap-8">

                  {/* ── LEFT: Amount + Date ── */}
                  <div className="flex-1 flex flex-col gap-6">

                    {/* Amount */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-300">
                        Amount *
                      </label>
                      <div className="relative">
                        <select
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-[#0f1b3d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 appearance-none outline-none focus:border-cyan-500 cursor-pointer transition"
                        >
                          <option value="" disabled>Enter your amount</option>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="500">500</option>
                        </select>
                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-300">
                        Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-[#0f1b3d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 outline-none focus:border-cyan-500 transition [color-scheme:dark]"
                        />
                      </div>
                    </div>

                  </div>

                  {/* ── RIGHT: Image Upload ── */}
                  <div className="flex flex-col gap-3 w-[180px]">

                    {/* Preview Box */}
                    <div
                      onClick={() => fileRef.current.click()}
                      className="w-full aspect-square bg-[#0f1b3d] border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-cyan-500 transition overflow-hidden relative"
                    >
                      {imgSrc ? (
                        <img src={imgSrc} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <svg className="w-7 h-7 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <p className="text-xs text-white/30">Upload Image</p>
                        </>
                      )}
                    </div>

                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

                    <button
                      onClick={() => fileRef.current.click()}
                      className="w-full border border-white/10 hover:border-cyan-500 hover:text-cyan-400 text-white/70 text-sm py-2 rounded-lg transition"
                    >
                      Upload Image
                    </button>

                    <button
                      onClick={() => { resetForm(); setActivePage("rewards"); }}
                      className="w-full border border-white/10 hover:border-red-400 hover:text-red-400 text-white/70 text-sm py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>

                  </div>
                </div>
              </div>

              {/* Bottom Buttons — exactly like NOTE page */}
              <div className="flex gap-6">
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
                >
                  <FaEdit size={14} />
                  Edit
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-full text-sm transition"
                >
                  Submit
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}