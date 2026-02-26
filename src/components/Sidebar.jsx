import { NavLink } from "react-router-dom";
import React from "react";
import {
  FaThLarge,
  FaUsers,
  FaTrophy,
  FaGift,
  FaExchangeAlt,
  FaShareAlt,
  FaHeadset,
  FaQuestionCircle,
} from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdSportsEsports } from "react-icons/md";


export default function Sidebar() {

  const menuItems = [
    { name: "Dashboard", icon: <FaThLarge />, path: "/" },
    { name: "Users", icon: <FaUsers />, path: "/users" },
    // { name: "E-sports", icon: <MdSportsEsports />, path: "/e-sports" },
    { name: "Tournament", icon: <FaTrophy />, path: "/tournament" },
    { name: "Rewards", icon: <FaGift />, path: "/rewards" },
    { name: "Transaction", icon: <FaExchangeAlt />, path: "/transaction" },
    { name: "Notification", icon: <IoIosNotifications />, path: "/notification" },
    { name: "Referral", icon: <FaShareAlt />, path: "/referral" },
    { name: "Help & Support", icon: <FaHeadset />, path: "/support" },
    { name: "FAQ", icon: <FaQuestionCircle />, path: "/faq" },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0b1736] p-6">
      
      {/* Logo */}
      <h1 className="text-white text-xl font-bold mb-8 tracking-wide">
        BATTLE OP X
      </h1>

      {/* Menu */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
               transition-all duration-300 text-sm font-medium
               ${
                 isActive
                   ? "bg-cyan-400 text-white"
                   : "text-slate-300 hover:bg-slate-800 hover:text-white"
               }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
