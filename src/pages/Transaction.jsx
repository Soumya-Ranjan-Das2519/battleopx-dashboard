import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaInfoCircle, FaEllipsisH, FaFilter } from "react-icons/fa";

// ─── Data ─────────────────────────────────────────────────────
const generateTransactions = () => {
  const statuses = ["Completed", "Pending", "Rejected"];
  const types = ["Claimed", "Withdrawal", "Deposit"];
  const txnIds = ["4954854894", "549814904523", "24452320452345"];
  return Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    name: "Rahul Ds",
    userId: "FLAOPSFKFLA",
    amount: "15,000",
    transactionId: txnIds[i % 3],
    status: statuses[i % 3],
    type: types[i % 3],
  }));
};

const generateWithdrawalRows = () =>
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    mobile: "9311457576",
    username: "Ankitdr 234",
    holderName: "Ankit Kumar",
    totalWinnings: "4954854894",
    amount: "50000000",
    time: "09/07/2026",
    status: i % 3 === 0 ? "Accepted" : i % 3 === 1 ? "Rejected" : "Pending",
  }));

const allTransactions = generateTransactions();
const allWithdrawalRows = generateWithdrawalRows();
const ITEMS_PER_PAGE = 14;

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Completed: { bg: "#1a4a2e", color: "#4ade80", border: "#166534" },
    Accepted:  { bg: "#1a4a2e", color: "#4ade80", border: "#166534" },
    Pending:   { bg: "#4a3000", color: "#fbbf24", border: "#92400e" },
    Rejected:  { bg: "#4a1a1a", color: "#f87171", border: "#991b1b" },
  };
  const s = map[status] || map.Pending;
  return (
    <span className="px-3 py-1 rounded text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {status}
    </span>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────
function DetailModal({ txn, onClose }) {
  if (!txn) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0f1b3d] w-[440px] rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)] p-7 relative">
        <button onClick={onClose} className="absolute top-4 right-5 text-white/50 hover:text-white text-xl">✕</button>
        <p className="text-center underline text-sm text-gray-400 mb-2">Transaction Details</p>
        <h2 className="text-center text-lg font-semibold mb-5">{txn.name}</h2>
        <div className="border-t border-white/20 mb-5" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: "User I'D", value: txn.userId },
            { label: "Amount", value: txn.amount },
            { label: "Transaction I'D", value: txn.transactionId },
            { label: "Type", value: txn.type },
            { label: "Status", value: txn.status, isStatus: true },
          ].map(({ label, value, isStatus }) => (
            <div key={label} className="bg-[#0a1628] rounded-lg px-4 py-3">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              {isStatus ? <StatusBadge status={value} /> : <p className="text-white font-semibold">{value}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Action Menu ─────────────────────────────────────────────
function ActionMenu({ txn, onView, onEdit, activeMenu, setActiveMenu }) {
  const isOpen = activeMenu === txn.id;
  return (
    <div className="relative inline-block">
      <button onClick={() => setActiveMenu(isOpen ? null : txn.id)} className="text-white/60 hover:text-white transition">
        <FaEllipsisH size={14} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
          <div className="absolute right-0 top-6 z-20 bg-[#0c1630] border border-white/10 rounded-xl shadow-xl min-w-[130px] py-1">
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-white/10 transition text-white/80"
              onClick={() => { onView(txn); setActiveMenu(null); }}>
              View Details
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-white/10 transition text-white/80"
              onClick={() => { onEdit(txn); setActiveMenu(null); }}>
              Edit
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-white/10 transition text-red-400">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Filter View (Accepted / Rejected / Pending tabs) ─────────
function FilterView({ onBack }) {
  const [activeTab, setActiveTab] = useState("Accepted");
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ["Accepted", "Rejected", "Pending"];

  const filtered = allWithdrawalRows.filter((r) => r.status === activeTab);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (t) => { setActiveTab(t); setCurrentPage(1); };

  return (
    <>
        {/* Header */}
        <Header
          title="Transactions"
          subtitle="Manage user transactions and payment details"
        />

      {/* Tabs */}
      <div className="flex items-center px-8 pt-4 pb-0">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => handleTabChange(tab)}
              className="px-8 py-3 text-sm font-medium transition relative"
              style={{ color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.5)" }}>
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "#06b6d4" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-8" />

      {/* Table */}
      <div className="flex-1 p-5 overflow-auto">
        <div className="rounded-2xl border border-white/20 bg-[#0f1b3d] shadow-[0_0_40px_rgba(255,255,255,0.08)]">
          <table className="w-full text-sm">
            <thead className="border-b border-white/20">
              <tr className="text-left">
                {["S no.", "Mobile no.", "Username", "Holder Name", "Total Winnings", "Amount", "Time", "Status", "Action"].map((h) => (
                  <th key={h} className="py-4 px-4 font-semibold text-white text-sm first:pl-6 last:pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, index) => (
                <tr key={row.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 pl-6 text-gray-300">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="px-4 text-gray-300">{row.mobile}</td>
                  <td className="px-4 text-gray-300">{row.username}</td>
                  <td className="px-4 text-gray-300">{row.holderName}</td>
                  <td className="px-4 text-gray-300">{row.totalWinnings}</td>
                  <td className="px-4 text-gray-300">{row.amount}</td>
                  <td className="px-4 text-gray-300">{row.time}</td>
                  <td className="px-4"><StatusBadge status={row.status} /></td>
                  <td className="px-4 pr-6">
                    <button className="text-white/50 hover:text-white transition" title="View Info">
                      <FaInfoCircle size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-gray-500 text-sm">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-8 py-4 flex justify-end items-center gap-4 text-sm border-t border-white/10">
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
    </>
  );
}

// ─── Withdrawal Edit View ─────────────────────────────────────
function WithdrawalDetailView({ txn, onBack }) {
  const [activeTab, setActiveTab] = useState("Accepted");
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ["Accepted", "Rejected", "Pending"];
  const filtered = allWithdrawalRows.filter((r) => r.status === activeTab);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <div className="px-8 pt-6 pb-4 border-b border-white/10 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition text-xl leading-none">←</button>
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back! Here's your gaming platform overview</p>
        </div>
      </div>

      <div className="flex items-center px-8 pt-4 pb-0">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className="px-8 py-3 text-sm font-medium transition relative"
              style={{ color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.5)" }}>
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "#06b6d4" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-8" />

      <div className="flex-1 p-5 overflow-auto">
        <div className="rounded-2xl border border-white/20 bg-[#0f1b3d] shadow-[0_0_40px_rgba(255,255,255,0.08)]">
          <table className="w-full text-sm">
            <thead className="border-b border-white/20">
              <tr className="text-left">
                {["S no.", "Mobile no.", "Username", "Holder Name", "Total Winnings", "Amount", "Time", "Status", "Action"].map((h) => (
                  <th key={h} className="py-4 px-4 font-semibold text-white first:pl-6 last:pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, index) => (
                <tr key={row.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 pl-6 text-gray-300">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="px-4 text-gray-300">{row.mobile}</td>
                  <td className="px-4 text-gray-300">{row.username}</td>
                  <td className="px-4 text-gray-300">{row.holderName}</td>
                  <td className="px-4 text-gray-300">{row.totalWinnings}</td>
                  <td className="px-4 text-gray-300">{row.amount}</td>
                  <td className="px-4 text-gray-300">{row.time}</td>
                  <td className="px-4"><StatusBadge status={row.status} /></td>
                  <td className="px-4 pr-6">
                    <button className="text-white/50 hover:text-white transition"><FaInfoCircle size={15} /></button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={9} className="py-16 text-center text-gray-500 text-sm">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-8 py-4 flex justify-end items-center gap-4 text-sm border-t border-white/10">
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
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function TransactionPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [editTxn, setEditTxn] = useState(null);
  const [showFilterView, setShowFilterView] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const tabs = ["All", "Claimed", "Withdrawal"];

  const tabFiltered = allTransactions.filter((t) => {
    if (activeTab === "All") return true;
    if (activeTab === "Claimed") return t.type === "Claimed";
    if (activeTab === "Withdrawal") return t.type === "Withdrawal";
    return true;
  });

  const totalPages = Math.ceil(tabFiltered.length / ITEMS_PER_PAGE) || 1;
  const paginated = tabFiltered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (tab) => { setActiveTab(tab); setCurrentPage(1); };

  // Determine which view to show
  const showMain = !showFilterView && !editTxn;

  return (
    <div className="flex h-screen w-screen bg-[#071028] text-white overflow-hidden">

      {/* Sidebar */}
      <div className="w-64 bg-[#0c1630] flex-shrink-0 border-r border-white/10">
        <Sidebar />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Filter View */}
        {showFilterView && <FilterView onBack={() => setShowFilterView(false)} />}

        {/* Edit / Withdrawal Detail View */}
        {editTxn && !showFilterView && <WithdrawalDetailView txn={editTxn} onBack={() => setEditTxn(null)} />}

        {/* Main Transaction List */}
        {showMain && (
          <>
        {/* Header */}
        <Header
          title="Transactions"
          subtitle="Manage user transactions and payment details"
        />

            {/* Tabs + Filter icon */}
            <div className="flex items-center justify-between px-8 pt-4 pb-0">
              <div className="flex gap-0">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => handleTabChange(tab)}
                    className="px-8 py-3 text-sm font-medium transition relative"
                    style={{ color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.5)" }}>
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "#06b6d4" }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Filter icon → opens Accepted/Rejected/Pending view */}
              <button
                onClick={() => setShowFilterView(true)}
                className="text-white/60 hover:text-white transition p-2"
                title="Filter: Accepted / Rejected / Pending"
              >
                <FaFilter size={16} />
              </button>
            </div>

            <div className="mx-8" />

            {/* Table */}
            <div className="flex-1 p-5 overflow-auto">
              <div className="rounded-2xl border border-white/20 bg-[#0f1b3d] shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/20">
                    <tr className="text-left">
                      {["Name", "User I'D", "Amount", "Transaction I'd", "Status", "Type", "Action"].map((h) => (
                        <th key={h} className="py-4 px-5 font-semibold text-white first:pl-6 last:pr-6">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((txn) => (
                      <tr key={txn.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="py-3 px-5 pl-6 font-medium text-white">{txn.name}</td>
                        <td className="px-5 text-gray-300">{txn.userId}</td>
                        <td className="px-5 text-gray-300">{txn.amount}</td>
                        <td className="px-5 text-gray-300">{txn.transactionId}</td>
                        <td className="px-5"><StatusBadge status={txn.status} /></td>
                        <td className="px-5 text-gray-300">{txn.type}</td>
                        <td className="px-5 pr-6">
                          <div className="flex items-center gap-3">
                            <button onClick={() => setSelectedTxn(txn)} className="text-white/50 hover:text-white transition">
                              <FaInfoCircle size={15} />
                            </button>
                            <ActionMenu
                              txn={txn}
                              onView={setSelectedTxn}
                              onEdit={setEditTxn}
                              activeMenu={activeMenu}
                              setActiveMenu={setActiveMenu}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                    {paginated.length === 0 && (
                      <tr><td colSpan={7} className="py-16 text-center text-gray-500 text-sm">No transactions found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="px-8 py-4 flex justify-end items-center gap-4 text-sm border-t border-white/10">
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
          </>
        )}

      </div>

      {/* Detail Modal */}
      <DetailModal txn={selectedTxn} onClose={() => setSelectedTxn(null)} />
    </div>
  );
}