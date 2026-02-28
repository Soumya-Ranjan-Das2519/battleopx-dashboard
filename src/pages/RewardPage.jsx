import React from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";


export default function RewardsLayout() {
  const location = useLocation();

  const tabs = [
    { label: "Coupons", path: "/rewards/coupons" },
    { label: "Scratch Cards", path: "/rewards/scratchcards" },
    { label: "Withdrawal Converter", path: "/rewards/withdrawal-converter" },
    { label: "Daily Rewards", path: "/rewards/daily-rewards" },
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
                  title="Rewards"
                  subtitle="Welcome back! Here's your gaming platform overview"
                />
  

        {/* Tabs */}
        <div className="px-8 pt-4 flex gap-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "bg-[#0c1630] text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </NavLink>
            );
          })}
        </div>

        {/* Nested Route Content */}
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}