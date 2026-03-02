import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import Header from "../components/Header";

export default function BannerSection() {
  const banners = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    title: "FREEFIRE",
  }));

  return (
    <div className="w-full h-screen flex flex-col bg-[#081028] text-white">

      {/* 🔹 Top Header Section */}
      <div className="flex-shrink-0">
        <Header
          title="E-sports games"
          subtitle="Manage your E-sports game banners"
        />
      </div>

      {/* 🔹 Content Section */}
      <div className="flex-1 p-10 overflow-hidden flex flex-col">

        {/* Top Button */}
        <div className="flex justify-end mb-6">
          <button className="bg-[#00b0e0] hover:bg-[#0095c8] text-white px-6 py-2 rounded-full font-semibold transition">
            + Add Banner
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-[#0c1630] border border-[#1a2a4a] rounded-xl flex-1 flex flex-col overflow-hidden">

          {/* Table Header */}
          <div className="grid grid-cols-4 px-6 py-4 border-b border-[#1a2a4a] text-gray-300 font-semibold text-sm">
            <div>S no.</div>
            <div>Title</div>
            <div>Image Preview</div>
            <div className="text-center">Action</div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto flex-1">

            {banners.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-4 px-6 py-4 border-b border-[#1a2a4a] text-gray-300 text-sm items-center hover:bg-[#0f1d3d] transition"
              >
                <div>{index + 1}</div>

                <div>{item.title}</div>

                <div>
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>

                <div className="flex justify-center">
                  <button className="text-gray-400 hover:text-white">
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}