import { FaBars, FaBell } from "react-icons/fa";
import React from "react";

export default function Header({ 
  setSidebarOpen, 
  title, 
  subtitle 
}) {
  return (
    <header className="bg-[#0f1b3d] border-b border-slate-800 px-6 py-4 flex items-center justify-between text-white">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="lg:hidden text-slate-400 hover:text-white text-xl"
        >
          <FaBars />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">
            {title}
          </h1>
          <p className="text-sm text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        
        {/* Notification */}
        <div className="relative cursor-pointer">
          <FaBell className="text-slate-400 text-xl hover:text-white" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border border-slate-700"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}