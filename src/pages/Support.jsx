import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Support() {
  // ── Saved state (what's stored) ──────────────────────────────
  const [saved, setSaved] = useState({
    mobile: "",
    whatsapp: "",
    email: "",
    telegram: "",
    telegramLink: "",
  });

  // ── Form state (what user is typing) ────────────────────────
  const [form, setForm] = useState({ ...saved });
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditDetails = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Basic validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setSaved({ ...form });
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setForm({ ...saved });
    setIsEditing(false);
  };

  const inputCls = (editing) =>
    `w-full px-4 py-3 rounded-lg text-sm outline-none transition ${
      editing
        ? "bg-[#1a274d] border border-cyan-500/40 text-white placeholder-gray-500 focus:border-cyan-500"
        : "bg-[#0c1a35] border border-white/10 text-gray-400 placeholder-gray-600 cursor-default"
    }`;

  const fields = [
    { key: "mobile",       label: "Mobile Number",    type: "tel",    placeholder: "Enter Mobile Number" },
    { key: "whatsapp",     label: "WhatsApp Number",  type: "tel",    placeholder: "Enter WhatsApp Number" },
    { key: "email",        label: "Email",            type: "email",  placeholder: "Enter Email Address" },
    { key: "telegram",     label: "Telegram Number",  type: "tel",    placeholder: "Enter Telegram Number" },
    { key: "telegramLink", label: "Telegram Link",    type: "url",    placeholder: "Enter Telegram Link" },
  ];

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
          title="Customer Support"
          subtitle="Manage support details and contact information"
        />

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="rounded-2xl border border-white/20 bg-[#0f1b3d] shadow-[0_0_40px_rgba(255,255,255,0.08)] p-8  max-w-3xl">

            {/* Success Toast */}
            {showSuccess && (
              <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: "#1a4a2e", border: "1px solid #166534", color: "#4ade80" }}>
                <span>✓</span> Details saved successfully!
              </div>
            )}

            {/* Fields */}
            <div className="space-y-5">
              {fields.map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-white mb-2">{label}</label>
                  <input 
                    type={type}
                    placeholder={isEditing ? placeholder : (saved[key] || "Enter Minimum Amount")}
                    value={isEditing ? form[key] : saved[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    readOnly={!isEditing}
                    className={`${inputCls(isEditing)} w-full bg-[#1a274d] border border-cyan-500/40 text-white placeholder-gray-500 focus:border-cyan-500`}
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEditDetails}
                  className="px-5 py-2.5 rounded-2xl text-sm font-semibold transition hover:opacity-90 active:scale-95"
                  style={{
                    background: "linear-gradient(90deg, #00d4ff 0%, #0099cc 100%)",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                  }}
                >
                  Edit Details
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 rounded-2xl text-sm font-semibold transition hover:opacity-90 active:scale-95"
                    style={{
                      background: "linear-gradient(90deg, #00d4ff 0%, #0099cc 100%)",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                    }}
                  >
                    Save Details
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-8 py-2.5 rounded-2xl text-sm font-semibold transition bg-white/10 hover:bg-white/20 text-white"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}