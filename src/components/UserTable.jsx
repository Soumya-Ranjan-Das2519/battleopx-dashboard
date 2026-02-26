import React from "react";
export default function UserTable() {
  return (
    <div className="bg-[#0f1b3d] p-6 rounded-2xl border border-slate-300 text-white">
      <h3 className="text-lg font-semibold mb-4">New Registered Users</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3">S.No</th>
              <th>Name</th>
              <th>User ID</th>
              <th>Total Earning</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map((item) => (
              <tr key={item} className="border-b border-slate-800 hover:bg-slate-800">
                <td className="p-3">{item}</td>
                <td>Rahul Das</td>
                <td>FLA0PSKFLA</td>
                <td>15,000</td>
                <td>rahul@gmail.com</td>
                <td>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
