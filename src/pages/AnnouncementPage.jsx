import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AnnouncementPage() {
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [mode, setMode] = useState("single");
  const [userId, setUserId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const users = [
    { id: 1, name: "Rahul Ds", code: "FLAOPSFKFLA", phone: "+91 98561 86456", email: "shsjwei@gmail.com" },
    { id: 2, name: "Rahul Ds", code: "FLAOPSFKFLA", phone: "+91 98560 86456", email: "shsjwei@gmail.com" },
    { id: 3, name: "Rahul Ds", code: "FLAOPSFKFLA", phone: "+91 98561 86456", email: "shsjwei@gmail.com" },
    { id: 4, name: "Rahul Ds", code: "FLAOPSFKFLA", phone: "+91 98561 86456", email: "shsjwei@gmail.com" },
  ];

  // 🔥 Detect which button was clicked
  useEffect(() => {
    if (location.state?.mode === "all") {
      setMode("multiple");
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setMode("single");
      setSelectedUsers([]);
    }
  }, [location.state]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckbox = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((uid) => uid !== id)
        : [...prev, id]
    );
  };

  const handleSend = () => {
    if (!title || !message) {
      alert("Title and Message are required!");
      return;
    }

    if (mode === "single") {
      if (!userId) {
        alert("Please select a user.");
        return;
      }
      alert(`Notification sent to user ${userId}`);
    }

    if (mode === "multiple") {
      if (selectedUsers.length === 0) {
        alert("Please select at least one user.");
        return;
      }
      alert(`Notification sent to ${selectedUsers.length} users`);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#071028] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#0c1630] border-r border-white/10">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-8 pt-6 pb-4 border-b border-white/10">
          <h1 className="text-2xl font-semibold">Announcement</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back! Here's your gaming platform overview
          </p>
        </div>

        {/* Form Card */}
        <div className="flex-1 p-8">
          <div className="h-full rounded-2xl border border-white/20 bg-[#0f1b3d] p-8">

            {/* User Section */}
            <div className="mb-6 w-[800px]">
              <label className="block mb-2 text-sm font-medium">
                User Id *
              </label>

              {mode === "single" ? (
                // 🔵 Single Dropdown
                <select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-[#1a274d] border border-white/10 
                             rounded-lg px-4 py-3 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} – {user.phone}
                    </option>
                  ))}
                </select>
              ) : (
                // 🔵 Multiple Dropdown With Checkbox
                <div className="relative w-full" ref={dropdownRef}>
                  {/* Select Field */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-[#1a274d] border border-white/10 
                               rounded-lg px-4 py-3 text-gray-300 
                               cursor-pointer flex justify-between items-center"
                  >
                    <span>
                      {selectedUsers.length > 0
                        ? `${selectedUsers.length} User Selected`
                        : "Select Users"}
                    </span>
                    <span className="text-gray-400">▼</span>
                  </div>

                  {/* Dropdown */}
                  {isOpen && (
                    <div className="absolute mt-2 w-full bg-[#1a274d] 
                                    border border-white/10 rounded-lg 
                                    shadow-lg max-h-60 overflow-y-auto z-50">

                      {users.map((user, index) => (
                        <div
                          key={user.id}
                          className={`flex items-center gap-6 px-4 py-3 
                                      border-b border-white/5 
                                      hover:bg-[#25335f] transition
                                      ${index === users.length - 1 ? "border-none" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleCheckbox(user.id)}
                            className="accent-cyan-500 w-4 h-4 cursor-pointer"
                          />

                          <div className="flex justify-between w-full text-sm text-gray-300">
                            <span className="w-[120px]">{user.name}</span>
                            <span className="w-[120px] text-gray-400">
                              {user.code}
                            </span>
                            <span className="w-[150px] text-gray-400">
                              {user.phone}
                            </span>
                            <span className="w-[200px] text-gray-400 truncate">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      ))}

                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="mb-6 w-[800px]">
              <label className="block mb-2 text-sm font-medium">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1a274d] border border-white/10 
                           rounded-lg px-4 py-3 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Message */}
            <div className="mb-6 w-[800px]">
              <label className="block mb-2 text-sm font-medium">Message *</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#1a274d] border border-white/10 
                           rounded-lg px-4 py-3 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="bg-cyan-500 hover:bg-cyan-600 
                         px-6 py-2 rounded-full text-sm transition"
            >
              Send Notification
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}