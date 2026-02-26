import React from "react";
import { useState, useMemo } from "react";
import { FiSearch,FiFilter } from "react-icons/fi";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";

export default function Participants() {
  const [search, setSearch] = useState("");

  const data = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: "Rahul Ds",
    userId: "FLAOPSKFILA",
    mobile: "9311895435",
    email: "jhnd@gmail.com",
    dob: "19/02/2000",
    createdAt: "19/02/2000",
    balance: "150",
  }));

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-b from-[#071028] to-[#020617] text-white">

      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-[#0c1630]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header
          title="Participants"
          subtitle="Manage registered players and their accounts"
        />

        {/* Search Section */}
        <div className="flex justify-end px-8 py-6 ">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search data, users, or reports"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-200 text-black rounded-full pl-10 pr-4 py-2 text-sm w-60 focus:outline-none"
            />
          </div>
          <FiFilter className="text-slate-400 text-xl ml-2 cursor-pointer hover:text-white" />
        </div>

        {/* Table Container */}
        <div className="flex-1 px-8 pb-6 overflow-hidden">
          <div className="h-full rounded-2xl border border-white/20 bg-[#0f1b3d] flex flex-col overflow-hidden">

            {/* Scrollable Table */}
            <div className="flex-1 overflow-auto">
              <table className="min-w-full text-sm text-left whitespace-nowrap">

                {/* Table Head */}
                <thead className="sticky top-0 bg-[#0f1b3d] border-b border-white/20 text-slate-300 z-10">
                  <tr>
                    <th className="px-8 py-5">S no.</th>
                    <th className="px-8 py-5">Name</th>
                    <th className="px-8 py-5">User I’D</th>
                    <th className="px-8 py-5">Mobile</th>
                    <th className="px-8 py-5">Email</th>
                    <th className="px-8 py-5">D-O-B</th>
                    <th className="px-8 py-5">Created at</th>
                    <th className="px-8 py-5">Total Balance</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="px-8 py-5">{item.id}</td>
                      <td className="px-8 py-5">{item.name}</td>
                      <td className="px-8 py-5">{item.userId}</td>
                      <td className="px-8 py-5">{item.mobile}</td>
                      <td className="px-8 py-5">{item.email}</td>
                      <td className="px-8 py-5">{item.dob}</td>
                      <td className="px-8 py-5">{item.createdAt}</td>
                      <td className="px-8 py-5">{item.balance}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Pagination */}
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