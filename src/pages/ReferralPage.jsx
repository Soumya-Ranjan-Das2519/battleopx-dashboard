import React, { useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function ReferralPage() {
  const [search, setSearch] = useState("");

  const referralData = [
    { id: 1, name: "Rahul Das", userId: "FLA0PSKFLA", type: "Referral", number: "+91 98567 65487", status: "Completed" },
    { id: 2, name: "Ankit Roy", userId: "USER12345", type: "Referral", number: "+91 90000 12345", status: "Completed" },
    { id: 3, name: "Suman Dey", userId: "SUM987654", type: "Referral", number: "+91 88888 99999", status: "Completed" },
    { id: 4, name: "Rahul Das", userId: "TEST0001", type: "Referral", number: "+91 77777 66666", status: "Completed" },
  ];

  // 🔎 Filter Logic
  const filteredData = useMemo(() => {
    return referralData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.userId.toLowerCase().includes(search.toLowerCase()) ||
      item.number.includes(search)
    );
  }, [search]);

  return (
    <div className="flex bg-[#0B1437] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-6">
<Header
  title="Refer"
  subtitle="Manage your referral program and track user referrals"
  showSearch={true}
  searchValue={search}
  onSearchChange={(e) => setSearch(e.target.value)}
/>
        
        {/* Table */}
        <div className="mt-6 bg-[#111C44] rounded-xl border border-[#1F2A52] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0F1A3C] text-gray-300 uppercase text-xs">
              <tr>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">User ID</th>
                <th className="py-4 px-6 text-left">Type</th>
                <th className="py-4 px-6 text-left">Number</th>
                <th className="py-4 px-6 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#1F2A52] hover:bg-[#1A2554] transition"
                  >
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6 text-gray-300">{item.userId}</td>
                    <td className="py-4 px-6">{item.type}</td>
                    <td className="py-4 px-6 text-gray-300">{item.number}</td>
                    <td className="py-4 px-6">
                      <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-4 p-4 border-t border-[#1F2A52] text-sm text-gray-300">
            <button className="px-4 py-2 bg-[#0F1A3C] rounded-lg hover:bg-[#1A2554]">
              Previous
            </button>

            <span>Page 1 of 1</span>

            <button className="px-4 py-2 bg-[#0F1A3C] rounded-lg hover:bg-[#1A2554]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}