import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import { FaEllipsisV, FaTrash, FaEdit, FaEye } from "react-icons/fa";

const initialCoupons = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  type: i === 1 ? "Amazon" : i === 2 ? "Nykaa" : "Google Play",
  minAmount: 50,
  maxAmount: 200,
}));

const ITEMS_PER_PAGE = 10;

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const [couponType, setCouponType] = useState("");
  const [couponAmount, setCouponAmount] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const totalPages = Math.ceil(coupons.length / ITEMS_PER_PAGE);

  const paginated = coupons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAdd = () => {
    if (!couponType || !couponAmount || !couponCode) return;

    setCoupons([
      ...coupons,
      {
        id: Date.now(),
        type: couponType,
        minAmount: Number(couponAmount),
        maxAmount: Number(coinAmount) || 200,
      },
    ]);

    setCouponType("");
    setCouponAmount("");
    setCoinAmount("");
    setCouponCode("");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    setActiveMenu(null);
  };

  return (
    <div className="flex min-h-screen bg-[#0a1224] text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0c1630] border-r border-white/10">
        <Sidebar />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header
          title="Coupons"
          subtitle="Manage your gaming platform coupons"
        />

        {/* Card Container */}
        <div className="m-6 rounded-2xl border border-white/20 bg-[#0f1b3d] shadow-[0_0_40px_rgba(255,255,255,0.08)] flex flex-col">

          {/* Top Section */}
          <div className="flex justify-between items-center px-6 py-5">
            <h2 className="text-lg font-semibold">Coupons</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-sm px-5 py-2 rounded-full transition"
            >
              + Add Coupon
            </button>
          </div>

          {/* Table */}
          <div className="px-6 pb-4">
            <div className="rounded-xl border border-white/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#0c1630] border-b border-white/20">
                  <tr>
                    <th className="py-4 px-6 text-left">S No.</th>
                    <th className="px-6 text-left">Coupon Type</th>
                    <th className="px-6 text-left">Min Amount</th>
                    <th className="px-6 text-left">Max Amount</th>
                    <th className="px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((coupon, index) => (
                    <tr
                      key={coupon.id}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="py-4 px-6">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="px-6 text-gray-300">{coupon.type}</td>
                      <td className="px-6 text-gray-300">{coupon.minAmount}</td>
                      <td className="px-6 text-gray-300">{coupon.maxAmount}</td>
                      <td className="px-6 text-center relative">
                        <button
                          onClick={() =>
                            setActiveMenu(
                              activeMenu === coupon.id ? null : coupon.id
                            )
                          }
                          className="text-white/70 hover:text-white"
                        >
                          <FaEllipsisV />
                        </button>

                        {activeMenu === coupon.id && (
                          <>
                            <div
                              className="fixed inset-0"
                              onClick={() => setActiveMenu(null)}
                            />
                            <div className="absolute right-6 top-8 bg-[#0c1630] border border-white/10 rounded-xl shadow-xl z-20 min-w-[140px]">
                              <button
                                onClick={() => {
                                  setPreviewData(coupon);
                                  setActiveMenu(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10 text-sm"
                              >
                                <FaEye /> View
                              </button>
                              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10 text-sm">
                                <FaEdit /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(coupon.id)}
                                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10 text-red-400 text-sm"
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex justify-end items-center gap-4 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 rounded bg-[#0c1630] hover:bg-white/10 disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-1 rounded bg-[#0c1630] hover:bg-white/10 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f1b3d] w-[420px] rounded-2xl border border-white/20 p-6">
            <button
              onClick={() => setPreviewData(null)}
              className="absolute top-3 right-4"
            >
              ✕
            </button>
            <h2 className="text-center text-lg font-semibold mb-4">
              {previewData.type}
            </h2>
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="text-gray-400">Min Amount</p>
                <p>{previewData.minAmount}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Max Amount</p>
                <p>{previewData.maxAmount}</p>
              </div>
            </div>
          </div>
        </div>
      )}
       {/* Add Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div
            className="relative rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)] p-8 w-[420px]"
            style={{ background: "#0f1b3d" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 text-white/50 hover:text-white text-xl leading-none"
            >
              ✕
            </button>

            {/* Title */}
            <h3 className="text-center text-lg font-semibold underline underline-offset-4 mb-6">
              Add Coupons
            </h3>

            {/* Coupons Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Coupons Type
              </label>
              <input
                type="text"
                placeholder="Enter Coupon type"
                className="w-full px-4 py-3 rounded-lg bg-[#0a1628] border border-white/10 outline-none text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 transition"
                value={couponType}
                onChange={(e) => setCouponType(e.target.value)}
              />
            </div>

            {/* Coupons Amount */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Coupons Amount
              </label>
              <input
                type="number"
                placeholder="Enter Coupon Amount"
                className="w-full px-4 py-3 rounded-lg bg-[#0a1628] border border-white/10 outline-none text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 transition"
                value={couponAmount}
                onChange={(e) => setCouponAmount(e.target.value)}
              />
            </div>

            {/* Coin Amount */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Coin Amount
              </label>
              <input
                type="number"
                placeholder="Enter Coupon Amount"
                className="w-full px-4 py-3 rounded-lg bg-[#0a1628] border border-white/10 outline-none text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 transition"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
              />
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Coupon Code
              </label>
              <input
                type="text"
                placeholder="Enter Coupon code"
                className="w-full px-4 py-3 rounded-lg bg-[#0a1628] border border-white/10 outline-none text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 transition"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>

            {/* Add Rewards Button */}
            <button
              onClick={handleAdd}
              className="w-full py-3 rounded-lg text-sm font-semibold transition hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(90deg, #00d4ff 0%, #0099cc 100%)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(0,212,255,0.3)",
              }}
            >
              + Add Rewards
            </button>
          </div>
        </div>
      )}

    </div>
  );
}