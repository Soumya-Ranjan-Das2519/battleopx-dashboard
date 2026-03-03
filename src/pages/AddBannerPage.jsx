import React from "react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function AddBannerPage({ setShowAddBanner }) {
  const [title, setTitle] = useState("");

  return (
    <div className="p-6 text-white">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Banners</h1>
        <p className="text-gray-400 text-sm">
          Welcome back! Here's your gaming platform overview
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-[#0f1b3d] border border-[#1a2a4a] rounded-2xl p-10 min-h-[500px]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* LEFT SIDE */}
          <div>
            {/* Title */}
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title <span className="text-red-500">*</span>
            </label>

            {/* Dropdown Input */}
            <div className="relative mb-6">
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a2a4a] border border-[#2a3a5a] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00b0e0] appearance-none"
              >
                <option value="">Enter your Title here</option>
                <option value="Home Banner">Home Banner</option>
                <option value="Offer Banner">Offer Banner</option>
                <option value="Game Banner">Game Banner</option>
              </select>

              {/* Dropdown Arrow */}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            {/* Submit Button */}
            <button className="px-8 py-2 bg-[#00b0e0] hover:bg-[#0095c8] rounded-full text-white font-medium transition">
              Submit
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center">
            
            {/* Big Upload Box */}
            <div className="w-72 h-72 bg-[#1a2a4a] rounded-xl flex flex-col items-center justify-center text-gray-400">
              <FiUpload size={28} className="mb-3" />
              <p className="text-sm">Upload Image</p>
            </div>

            {/* Upload Button */}
            <button className="mt-6 w-72 py-2 border border-[#2a3a5a] rounded-lg text-gray-300 hover:bg-[#1a2a4a] transition">
              Upload Image
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowAddBanner(false)}
              className="mt-4 w-72 py-2 border border-[#2a3a5a] rounded-lg text-gray-300 hover:bg-[#1a2a4a] transition"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}