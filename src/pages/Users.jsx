import { useState } from "react";
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NewRegistration from "../pages/users/NewRegistration";
import Participants from "../pages/users/Participants";
import { FiSearch, FiFilter, FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
// const [activeTab] = useState("registration");
  const users = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: "Rahul Ds",
    userId: "FLAOPSKFILA",
    mobile: "931895435",
    email: "mdseraj@gmail.com",
    dob: "19/02/2000",
    created: "19/02/2000",
    balance: 150,
    scratch: 150,
    winning: 150,
    matches: 150,
    status: "Active",
  }));

return (
  <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-b from-[#071028] to-[#020617] text-white">
    
    {/* Sidebar */}
    <div className="w-64 flex-shrink-0 bg-[#0c1630]">
      <Sidebar />
    </div>

    {/* Right Section */}
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <Header
              title="User List"
              subtitle="Manage registered players and their accounts"
            />
      <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
        <div>
          <div className="h-full flex flex-col bg-[#071028] text-white">

      {/* Tabs */}
      <div className="flex gap-4">
  <button
    onClick={() => navigate("/users/registration")}
    className="px-4 py-2 rounded-t-lg text-slate-400 hover:text-white transition-all"
  >
    New Registration
  </button>

  <button
    onClick={() => navigate("/users/participants")}
    className="px-4 py-2 rounded-t-lg text-slate-400 hover:text-white transition-all"
  >
    Participants
  </button>
</div>


    </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search data, users, or reports"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-200 text-black rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <FiFilter className="text-slate-400 text-xl cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 p-6 overflow-hidden">

        <div className="h-full rounded-2xl border border-white/20 
                        bg-[#0f1b3d] 
                        shadow-[0_0_35px_rgba(255,255,255,0.15)]
                        flex flex-col overflow-hidden">

          {/* Scrollable Table Only */}
          <div className="flex-1 overflow-auto">

            <table className="min-w-max w-full text-sm text-left whitespace-nowrap">

              <thead className="sticky top-0 bg-[#0f1b3d] border-b border-white/20 text-slate-300 z-10">
                <tr>
                  <th className="px-8 py-5">S no.</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">User ID</th>
                  <th className="px-8 py-5">Mobile</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5">D-O-B</th>
                  <th className="px-8 py-5">Created at</th>
                  <th className="px-8 py-5">Total Balance</th>
                  <th className="px-8 py-5">Scratchcards Earning</th>
                  <th className="px-8 py-5">Winning Amount</th>
                  <th className="px-8 py-5">Total Matches Played</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-all"
                  >
                    <td className="px-8 py-5">{user.id}</td>
                    <td className="px-8 py-5">{user.name}</td>
                    <td className="px-8 py-5">{user.userId}</td>
                    <td className="px-8 py-5">{user.mobile}</td>
                    <td className="px-8 py-5">{user.email}</td>
                    <td className="px-8 py-5">{user.dob}</td>
                    <td className="px-8 py-5">{user.created}</td>
                    <td className="px-8 py-5">{user.balance}</td>
                    <td className="px-8 py-5">{user.scratch}</td>
                    <td className="px-8 py-5">{user.winning}</td>
                    <td className="px-8 py-5">{user.matches}</td>
                    <td className="px-8 py-5">
                      <span className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full">
                        {user.status}
                      </span>
                    </td>
                    <td className="pr-6">
                      <FiMoreVertical className="cursor-pointer text-slate-400 hover:text-white" />
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          {/* Pagination (Fixed inside box) */}
          <div className="p-4 border-t border-white/10 bg-[#0c1630] flex justify-end gap-4">
            <button className="px-4 py-1 bg-slate-700 rounded text-sm hover:bg-slate-600">
              Previous
            </button>
            <span className="text-slate-400 text-sm">
              Page 1 of 10
            </span>
            <button className="px-4 py-1 bg-slate-700 rounded text-sm hover:bg-slate-600">
              Next
            </button>
          </div>

        </div>
      </div>

    </div>
  </div>
);
}