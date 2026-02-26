import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaExchangeAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function WithdrawalConverter() {
  const [coins, setCoins] = useState(1000);
  const [realAmount, setRealAmount] = useState(1000);
  const [rate] = useState(1);

  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const [activePage, setActivePage] = useState("convertor"); 
  // convertor | note | withdrawal

  const [presets, setPresets] = useState([
    30, 50, 70, 100, 200,
    300, 500, 700, 1000, 2000,
  ]);

  // ===== Convert Logic =====
  const handleCoinsChange = (value) => {
    setCoins(value);
    setRealAmount(value * rate);
  };

  const handleRealChange = (value) => {
    setRealAmount(value);
    setCoins(value / rate);
  };

  const handleSwap = () => {
    setCoins(realAmount);
    setRealAmount(coins);
  };

  const handlePresetClick = (value) => {
    setCoins(value);
    setRealAmount(value * rate);
  };

  const handleDelete = (index) => {
    setPresets(presets.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const newValue = prompt("Edit preset value:", presets[index]);
    if (newValue !== null) {
      const updated = [...presets];
      updated[index] = Number(newValue);
      setPresets(updated);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a1224] text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0c1630] border-r border-white/10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
  title={
    activePage === "withdrawal"
      ? "Withdrawal Amount"
      : "Withdrawal Convertor"
  }
  subtitle="Welcome back! Here's your gaming platform overview"
/>
        {/* <Header
          title="Withdrawal Convertor"
          subtitle="Welcome back! Here's your gaming platform overview"
        /> */}

        <div className="m-6 rounded-2xl border border-white/20 bg-[#0f1b3d] p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">

          {/* ================= CONVERTOR PAGE ================= */}
          {activePage === "convertor" && (
            <>
              {/* Add Note Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setActivePage("note")}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-full text-sm transition"
                >
                  <FaPlus />
                  Add Note
                </button>
              </div>

              {/* Converter Inputs */}
              <div className="flex items-center gap-8 mb-10">
                <div className="flex-1">
                  <label className="text-sm text-gray-300 mb-2 block">
                    Coins
                  </label>
                  <input
                    type="number"
                    value={coins}
                    onChange={(e) =>
                      handleCoinsChange(Number(e.target.value))
                    }
                    className="w-full bg-[#1b274b] rounded-lg px-4 py-3 outline-none"
                  />
                </div>

                <div
                  onClick={handleSwap}
                  className="cursor-pointer text-white/70 hover:text-cyan-400 transition"
                >
                  <FaExchangeAlt size={22} />
                </div>

                <div className="flex-1">
                  <label className="text-sm text-gray-300 mb-2 block">
                    Real Amount
                  </label>
                  <input
                    type="number"
                    value={realAmount}
                    onChange={(e) =>
                      handleRealChange(Number(e.target.value))
                    }
                    className="w-full bg-[#1b274b] rounded-lg px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Preset Grid */}
              <div className="space-y-8">
                {[presets.slice(0, 5), presets.slice(5, 10)].map(
                  (row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center justify-between">

                      <div className="flex gap-20">
                        {row.map((value, index) => {
                          const realIndex = rowIndex * 5 + index;
                          return (
                            <div
                              key={realIndex}
                              onClick={() => handlePresetClick(value)}
                              className="bg-[#1b274b] px-6 py-4 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition text-center min-w-[80px]"
                            >
                              {value}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex gap-5">
                        <FaEdit
                          onClick={() => handleEdit(rowIndex * 5)}
                          className="cursor-pointer text-white/60 hover:text-white"
                        />
                        <FaTrash
                          onClick={() => handleDelete(rowIndex * 5)}
                          className="cursor-pointer text-white/60 hover:text-red-400"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Submit */}
              <div className="mt-10">
                <button
                  onClick={() => setActivePage("withdrawal")}
                  className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-full text-sm transition"
                >
                  Submit
                </button>
              </div>
            </>
          )}

          {/* ================= NOTE PAGE ================= */}
          {activePage === "note" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold tracking-wide">
                  NOTE
                </h2>

                <button
                  onClick={() => setActivePage("convertor")}
                  className="text-white/60 hover:text-red-400 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="bg-[#1b274b] rounded-xl p-6 mb-8 border border-white/10 w-full max-w-3xl">
                <textarea
                  disabled={!isEditing}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your note here..."
                  className="w-full h-32 bg-transparent outline-none resize-none text-white disabled:opacity-60"
                />
              </div>

              <div className="flex gap-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
                >
                  <FaEdit size={14} />
                  Edit
                </button>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    alert("Note Saved!");
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-full text-sm transition"
                >
                  Submit
                </button>
              </div>
            </>
          )}

          {/* ================= WITHDRAWAL PAGE ================= */}
          {activePage === "withdrawal" && (
            <>
              <h2 className="text-lg font-semibold mb-6">
                Withdrawal Amount
              </h2>

              <div className="max-w-md">
                <input
                  type="number"
                  value={realAmount}
                  className="w-full bg-[#1b274b] text-white px-4 py-3 rounded-lg outline-none border border-white/10"
                />
              </div>

              <div className="flex gap-6 mt-8">
                <button
                  onClick={() => setActivePage("convertor")}
                  className="px-6 py-3 rounded-full border border-white/20 text-sm"
                >
                  Back
                </button>

                <button
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