import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({
  setSidebarOpen,
  title,
  subtitle,
  showSearch = false,
  searchValue = "",
  onSearchChange,
}) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <header className="bg-[#0f1b3d] border-b border-slate-800 px-6 py-4 flex items-center justify-between text-white">

      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        {setSidebarOpen && (
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden text-slate-400 hover:text-white text-xl"
          >
            <FaBars />
          </button>
        )}

        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 flex-shrink-0">

        {/* 🔍 Search */}
        {showSearch && (
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={onSearchChange}
              className="w-full bg-white text-black border border-gray-300 rounded-full pl-9 pr-4 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         shadow-sm"
            />
          </div>
        )}

        {/* Notification */}
        {isLoggedIn && (
          <div className="relative cursor-pointer">
            <FaBell className="text-slate-400 text-xl hover:text-white" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </div>
        )}

        {/* Profile */}
        {isLoggedIn && (
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
        )}

        {/* Login / Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 rounded-md transition font-medium"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 rounded-md transition font-medium"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}