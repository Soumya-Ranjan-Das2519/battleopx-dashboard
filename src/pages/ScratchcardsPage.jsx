import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import { FaTrash, FaEdit } from "react-icons/fa";

const initialCards = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  minAmount: 50,
  maxAmount: 200,
  matchCount: 25,
  rewardAmount: 100,
}));

const ITEMS_PER_PAGE = 10;

export default function ScratchCardsPage() {
  const [cards, setCards] = useState(initialCards);
  const [currentPage, setCurrentPage] = useState(1);

  // ── Modal States ────────────────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState(null);       // holds card being edited
  const [previewData, setPreviewData] = useState(null); // holds card being viewed
  const [deleteId, setDeleteId] = useState(null);       // holds id to confirm delete

  // ── Add Form State ──────────────────────────────────────────
  const [scratchMin, setScratchMin] = useState("");
  const [scratchMax, setScratchMax] = useState("");
  const [scratchMatch, setScratchMatch] = useState("");
  // const [scratchReward, setScratchReward] = useState("");

  // ── Edit Form State ─────────────────────────────────────────
  const [editMin, setEditMin] = useState("");
  const [editMax, setEditMax] = useState("");
  const [editMatch, setEditMatch] = useState("");
  // const [editReward, setEditReward] = useState("");

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const paginated = cards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ── Handlers ────────────────────────────────────────────────
  const handleAdd = () => {
    if (!scratchMin || !scratchMax || !scratchMatch) return;
    setCards([
      ...cards,
      {
        id: Date.now(),
        minAmount: Number(scratchMin),
        maxAmount: Number(scratchMax),
        matchCount: Number(scratchMatch) || 0,
      },
    ]);
    setScratchMin(""); setScratchMax(""); setScratchMatch(""); setScratchReward("");
    setShowAddModal(false);
  };

  const openEdit = (card) => {
    setEditData(card);
    setEditMin(String(card.minAmount));
    setEditMax(String(card.maxAmount));
    setEditMatch(String(card.matchCount));
  };

  const handleEditSave = () => {
    if (!editMin || !editMax || !editMatch) return;
    setCards(cards.map((c) =>
      c.id === editData.id
        ? { ...c, minAmount: Number(editMin), maxAmount: Number(editMax), matchCount: Number(editMatch), rewardAmount: Number(editReward) || 0 }
        : c
    ));
    setEditData(null);
  };

  const confirmDelete = (id) => setDeleteId(id);

  const handleDelete = () => {
    setCards(cards.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    // adjust page if last item on page deleted
    const newTotal = Math.ceil((cards.length - 1) / ITEMS_PER_PAGE);
    if (currentPage > newTotal) setCurrentPage(Math.max(1, newTotal));
  };

  // ── Input class helper ───────────────────────────────────────
  const inputCls = "w-full px-4 py-3 rounded-lg bg-[#0a1628] border border-white/10 outline-none text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 transition";

  return (
    <div className="flex h-screen w-screen bg-[#071028] text-white overflow-hidden">

      {/* Sidebar */}
      <div className="w-64 bg-[#0c1630] flex-shrink-0 border-r border-white/10">
        <Sidebar />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}
                <Header
                  title="Rewards"
                  subtitle="Welcome back! Here's your gaming platform overview"
                />
  

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="rounded-2xl border border-white/20 bg-[#0f1b3d] shadow-[0_0_40px_rgba(255,255,255,0.08)] flex flex-col">

            {/* Card Header */}
            <div className="flex justify-between items-center px-6 py-5">
              <h2 className="text-lg font-semibold">Scratch Cards</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-sm px-5 py-2 rounded-full transition"
              >
                + Add Rewards
              </button>
            </div>

            {/* Table */}
            <div className="px-6 pb-2">
              <div className="rounded-xl border border-white/20 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#0c1630] border-b border-white/20">
                    <tr className="text-left">
                      <th className="py-4 px-6 font-medium">S No.</th>
                      <th className="px-6 font-medium">Min Amount</th>
                      <th className="px-6 font-medium">Max Amount</th>
                      <th className="px-6 font-medium">Match Count</th>                     
                      <th className="px-6 font-medium">Action</th>
                      <th className="px-6 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((card, index) => (
                      <tr key={card.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="py-4 px-6">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td className="px-6 text-gray-300">{card.minAmount}</td>
                        <td className="px-6 text-gray-300">{card.maxAmount}</td>
                        <td className="px-6 text-gray-300">{card.matchCount}</td>                       
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            {/* Edit */}
                            <button
                              onClick={() => openEdit(card)}
                              className="text-white/50 hover:text-white transition"
                              title="Edit"
                            >
                              <FaEdit size={14} />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => confirmDelete(card.id)}
                              className="text-white/50 hover:text-red-400 transition"
                              title="Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                            </div>
                        </td>
                        <td className="px-6 text-gray-300">
                          {/* View Details */}
                            <button
                              onClick={() => setPreviewData(card)}
                              className="px-3 py-1.5 rounded-full text-xs text-white/70 hover:text-white hover:border-white/40 transition"
                              style={{ border: "1px solid rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}
                            >
                              View Details
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex justify-end items-center gap-4 text-sm">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="px-4 py-1 rounded bg-[#0c1630] hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed">
                Previous
              </button>
              <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="px-4 py-1 rounded bg-[#0c1630] hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed">
                Next
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── View Details Modal ─────────────────────────────────── */}
      {previewData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f1b3d] w-[460px] rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)] p-8 relative">
            <button onClick={() => setPreviewData(null)}
              className="absolute top-4 right-5 text-white/50 hover:text-white text-xl leading-none">✕</button>

            <p className="text-center underline text-sm text-gray-400 mb-2">Preview Scratch Card</p>
            <h2 className="text-center text-lg font-semibold mb-5">Scratch Card #{previewData.id}</h2>
            <div className="border-t border-white/20 mb-5" />

            <div className="grid grid-cols-2 gap-5">
              {[
                { label: "Min Winning Coins", value: previewData.minAmount },
                { label: "Max Winning Coins", value: previewData.maxAmount },
                { label: "Target Match Count", value: previewData.matchCount },
                
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#0a1628] rounded-lg px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className="text-white font-semibold text-base">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal ─────────────────────────────────────────── */}
      {editData && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="relative rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)] p-8 w-[460px]"
            style={{ background: "#0f1b3d" }}>

            <button onClick={() => setEditData(null)}
              className="absolute top-4 right-5 text-white/50 hover:text-white text-xl leading-none">✕</button>

            <h3 className="text-center text-lg font-semibold underline underline-offset-4 mb-6">
              Edit Scratch card
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Min Winning Coins</label>
              <input type="number" placeholder="Enter Minimum Coins" className={inputCls}
                value={editMin} onChange={(e) => setEditMin(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Max Winning Coins</label>
              <input type="number" placeholder="Enter Maximum Coins" className={inputCls}
                value={editMax} onChange={(e) => setEditMax(e.target.value)} />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">Target Match Count</label>
              <input type="number" placeholder="Enter Match Count" className={inputCls}
                value={editMatch} onChange={(e) => setEditMatch(e.target.value)} />
            </div>

            <button onClick={handleEditSave}
              className="w-full py-3 rounded-lg text-sm font-semibold transition hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(90deg, #00d4ff 0%, #0099cc 100%)", color: "#fff", boxShadow: "0 0 10px rgba(0,212,255,0.1)" }}>
              + Add Rewards
            </button>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ──────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f1b3d] w-[400px] rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)] p-8 relative">
            <button onClick={() => setDeleteId(null)}
              className="absolute top-4 right-5 text-white/50 hover:text-white text-xl leading-none">✕</button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <FaTrash size={20} className="text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Delete Scratch Card</h3>
              <p className="text-sm text-gray-400 mb-6">
                Are you sure you want to delete this scratch card? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 transition">
                  Cancel
                </button>
                <button onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 transition text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Scratch Card Modal ────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="relative rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)] p-8 w-[460px]"
            style={{ background: "#0f1b3d" }}>

            <button onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-5 text-white/50 hover:text-white text-xl leading-none">✕</button>

            <h3 className="text-center text-lg font-semibold underline underline-offset-4 mb-6">
              Add Scratch Card
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Min Winning Coins</label>
              <input type="number" placeholder="Enter Minimum Coins" className={inputCls}
                value={scratchMin} onChange={(e) => setScratchMin(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Max Winning Coins</label>
              <input type="number" placeholder="Enter Maximum Coins" className={inputCls}
                value={scratchMax} onChange={(e) => setScratchMax(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Target Match Count</label>
              <input type="number" placeholder="Enter Match Count" className={inputCls}
                value={scratchMatch} onChange={(e) => setScratchMatch(e.target.value)} />
            </div>

            <button onClick={handleAdd}
              className="w-full py-3 rounded-lg text-sm font-semibold transition hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(90deg, #00d4ff 0%, #0099cc 100%)", color: "#fff", boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}>
              + Add Rewards
            </button>
          </div>
        </div>
      )}

    </div>
  );
}