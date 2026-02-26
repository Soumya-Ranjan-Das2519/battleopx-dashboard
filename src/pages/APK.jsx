import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function APK() {
  const apkData = [
    {
      id: 1,
      file: "FLA0PSKFLA",
      name: "Battle Op X",
      version: "13.125",
      mandatory: "No",
      date: "26/02/2026",
    },
    {
      id: 2,
      file: "FLA0PSKFLA",
      name: "Battle Op X",
      version: "13.125",
      mandatory: "No",
      date: "26/02/2026",
    },
    {
      id: 3,
      file: "FLA0PSKFLA",
      name: "Battle Op X",
      version: "13.125",
      mandatory: "No",
      date: "26/02/2026",
    },
    {
      id: 4,
      file: "FLA0PSKFLA",
      name: "Battle Op X",
      version: "13.125",
      mandatory: "No",
      date: "26/02/2026",
    },
  ];

  return (
    <div className="flex bg-[#0B1437] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          title="APK"
          subtitle="Welcome back! Here’s your gaming platform overview"
        />

        <div className="p-6">
          {/* Table Container */}
          <div className="bg-[#111C44] rounded-xl border border-[#1F2A52] overflow-hidden min-h-[500px]">

            <table className="w-full text-sm">
              <thead className="border-b border-[#1F2A52] text-slate-300">
                <tr className="text-left">
                  <th className="py-4 px-6">S no.</th>
                  <th className="py-4 px-6">APK File</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">APK version</th>
                  <th className="py-4 px-6">Mandatory</th>
                  <th className="py-4 px-6">Created At</th>
                </tr>
              </thead>

              <tbody>
                {apkData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#1F2A52] hover:bg-[#1A2554] transition"
                  >
                    <td className="py-4 px-6 text-slate-300">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {item.file}
                    </td>
                    <td className="py-4 px-6">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {item.version}
                    </td>
                    <td className="py-4 px-6">
                      <span className=" px-3 py-1 text-xs">
                        {item.mandatory}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty Space (Matches UI bottom area) */}
            <div className="h-60"></div>

          </div>
        </div>
      </div>
    </div>
  );
}