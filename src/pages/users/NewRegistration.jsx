import React, { useState, useMemo } from "react";
import { FiSearch,FiFilter, FiMoreVertical } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";

export default function NewRegistration() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const [roomId, setRoomId] = useState("");
const [password, setPassword] = useState("");

  const [data, setData] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      gameName: "Rahul Ds",
      title: "FLAOPSKFILA",
      entryFee: "9311895435",
      roomId: "Mdseraj@gmail.com",
      password: "10",
      eventType: "Upcoming",
      date: "2024-02-19",
      matchTime: "150",
      description: "Check Participants",
    }))
  );

  // 🔎 Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.gameName.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase());

      const matchesStart = startDate
        ? new Date(item.date) >= new Date(startDate)
        : true;

      const matchesEnd = endDate
        ? new Date(item.date) <= new Date(endDate)
        : true;

      return matchesSearch && matchesStart && matchesEnd;
    });
  }, [search, startDate, endDate, data]);

  // 🎯 Event Type Change
  const handleEventChange = (index, value) => {
    const updated = [...data];
    updated[index].eventType = value;
    setData(updated);
  };

  // 📅 Date Change
  const handleDateChange = (index, value) => {
    const updated = [...data];
    updated[index].date = value;
    setData(updated);
  };

  // ✅ Checkbox Select
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
 <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-b from-[#071028] to-[#020617] text-white">


     {/* Sidebar */}
    <div className="w-64 flex-shrink-0 bg-[#0c1630]">
      <Sidebar />
    </div>
    <div className="flex-1 flex flex-col overflow-hidden">
    {/* Header */}
          <Header
                  title="New Registration"
                  subtitle="Manage new player registrations and their accounts"
                />
     {/* Filters Section */}
      <div className="flex p-6 pb-0 justify-between items-center mb-6">

        <div className="flex gap-6">
          <div>
            <label className="block ml-2 text-sm text-slate-400 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#0f1b3d] border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div>
            <label className="block ml-2 text-sm text-slate-400 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#0f1b3d] border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        {/* Search */}
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

      {/* Table Box */}
      <div className="flex-1 ml-6 mr-6 mb-6 rounded-2xl border border-white/20 bg-[#0f1b3d] shadow-[0_0_35px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden">

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto">

          <table className="min-w-max w-full text-sm text-left whitespace-nowrap">

            {/* Table Head */}
            <thead className="sticky top-0 bg-[#0f1b3d] border-b border-white/20 text-slate-300 z-10">
              <tr>
                <th className="px-8 py-5">S no.</th>
                <th className="px-8 py-5">Game Name</th>
                <th className="px-8 py-5">Title</th>
                <th className="px-8 py-5">Entry Fee</th>
                <th className="px-8 py-5">Room ID</th>
                <th className="px-8 py-5">Event Type</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Match Time</th>
                <th className="px-8 py-5">Description</th>
                <th className="px-8 py-5 text-center">Select Event</th>
                <th className="px-8 py-5 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-all"
                >
                  <td className="px-8 py-5">{item.id}</td>
                  <td className="px-8 py-5">{item.gameName}</td>
                  <td className="px-8 py-5">{item.title}</td>
                  <td className="px-8 py-5">{item.entryFee}</td>
                  <td
  className="px-8 py-5 text-blue-400 underline cursor-pointer"
  onClick={() => {
    setSelectedRow(item);
    setRoomId(item.roomId);
    setPassword(item.password);
    setIsModalOpen(true);
  }}
>
  {item.roomId}
</td>

                  {/* Event Type */}
                  <td className="px-8 py-5">
                    <select
                      value={item.eventType}
                      onChange={(e) =>
                        handleEventChange(index, e.target.value)
                      }
                      className="bg-[#0f1b3d] border border-white/20 rounded-md px-3 py-1 text-white"
                    >
                      <option>Upcoming</option>
                      <option>Ongoing</option>
                      <option>Completed</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td className="px-8 py-5">
                    <input
                      type="date"
                      value={item.date}
                      onChange={(e) =>
                        handleDateChange(index, e.target.value)
                      }
                      className="bg-[#0f1b3d] border border-white/20 rounded-md px-3 py-1 text-white"
                    />
                  </td>

                  <td className="px-8 py-5">{item.matchTime}</td>

                  {/* Description */}
                  <td className="px-8 py-5">
                    <span className="underline cursor-pointer hover:text-blue-400">
                      {item.description}
                    </span>
                  </td>

                  {/* Checkbox */}
                  <td className="px-8 py-5 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 accent-blue-500"
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <AiOutlineInfoCircle className="text-lg cursor-pointer text-slate-300 hover:text-white" />
                      <FiMoreVertical className="text-lg cursor-pointer text-slate-300 hover:text-white" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        {isModalOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-[#0f1b3d] w-[500px] rounded-2xl p-8 relative border border-white/20 shadow-xl">

      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ×
      </button>

      <h2 className="text-center text-xl font-semibold underline mb-8">
        Update Room ID
      </h2>

      {/* Room ID */}
      <div className="mb-6">
        <label className="block text-sm mb-2">Room ID</label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full bg-[#1a254b] rounded-lg px-4 py-3 outline-none"
        />
      </div>

      {/* Password */}
      <div className="mb-8">
        <label className="block text-sm mb-2">Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#1a254b] rounded-lg px-4 py-3 outline-none"
        />
      </div>

     <button
  onClick={() => {
    if (!roomId.trim() || !password.trim()) {
      alert("Room ID and Password are required");
      return;
    }

    const updatedData = data.map((item) =>
      item.id === selectedRow.id
        ? { ...item, roomId: roomId, password: password } // ✅ update both
        : item
    );

    setData(updatedData);
    setIsModalOpen(false);
  }}
  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-lg font-medium"
>
  Submit
</button>

    </div>
  </div>)}

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
  );
}