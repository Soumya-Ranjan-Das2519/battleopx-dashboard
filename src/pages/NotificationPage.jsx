import React from "react";
import { useState } from "react";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "User Joined Games", body: "Your return balance of 34 has been successfully credited to your account." },
    { id: 2, title: "User Joined Games", body: "Your return balance of 50 has been successfully credited to your account." },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const navigate = useNavigate();

  const handleAddNotification = () => {
    const newNotification = {
      id: Date.now(),
      title,
      body,
    };

    setNotifications([...notifications, newNotification]);
    setTitle("");
    setBody("");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

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
                    title="Notifications"
                    subtitle="Welcome back! Here's your gaming platform overview"
                  />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-hidden">

        <div className="h-full rounded-2xl 
                        border border-white/20
                        bg-[#0f1b3d]
                        shadow-[0_0_40px_rgba(255,255,255,0.08)]
                        flex flex-col">

          {/* Card Header */}
          <div className="flex justify-between items-center px-6 py-5">
            <h2 className="text-lg font-semibold">Notification List</h2>

            <div className="flex gap-3">
<button
  onClick={() => navigate("/notification/announcement", {
      state: { mode: "single" },
    })}
  className="bg-cyan-500 hover:bg-cyan-600 
             text-sm px-5 py-2 rounded-full transition"
>
  Send Notification
</button>

              <button onClick={() => navigate("/notification/announcement",{
      state: { mode: "all" },
    })}
                className="bg-cyan-500 hover:bg-cyan-600 
                           text-sm px-5 py-2 rounded-full 
                           transition"
              >
                Send Notification To All
              </button>
            </div>
          </div>

          {/* Table Wrapper */}
          <div className="flex-1 px-6 pb-6 overflow-hidden">

            <div className="h-full rounded-xl border border-white/20 overflow-hidden">

              <table className="w-full text-sm">

                {/* Table Head */}
                <thead className="bg-[#0c1630] border-b border-white/20">
                  <tr className="text-left">
                    <th className="py-4 px-6 font-medium">S no.</th>
                    <th className="px-6 font-medium">Title</th>
                    <th className="px-6 font-medium">Body</th>
                    <th className="px-6 font-medium text-center">Action</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {notifications.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="px-6">User Joined Games</td>
                      <td className="px-6 text-gray-300">
                        Your return balance of 34 has been successfully
                        credited to your account.
                      </td>
<td className="px-6 text-center">
  <FaInfoCircle
    onClick={() => setPreviewData(item)}
    className="mx-auto text-white/70 hover:text-white cursor-pointer"
  />
</td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>

          {/* Pagination */}
          <div className="px-6 pb-6 flex justify-end items-center gap-4 text-sm">

            <button className="px-4 py-1 rounded bg-[#0c1630] hover:bg-white/10 transition">
              Previous
            </button>

            <span className="text-gray-400">
              Page 1 of 4
            </span>

            <button className="px-4 py-1 rounded bg-[#0c1630] hover:bg-white/10 transition">
              Next
            </button>

          </div>

        </div>

      </div>
    </div>


    {previewData && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-[#0f1b3d] 
                    w-[420px] 
                    rounded-2xl 
                    border border-white/20
                    shadow-[0_0_40px_rgba(255,255,255,0.08)]
                    p-6 relative">

      {/* Close Button */}
      <button
        onClick={() => setPreviewData(null)}
        className="absolute top-3 right-4 text-white/60 hover:text-white text-lg"
      >
        ✕
      </button>

      {/* Small Heading */}
      <p className="text-center underline decoration-white-700 text-sm text-gray-400 mb-3">
        Preview Notification
      </p>

      {/* Title */}
      <h2 className="text-center text-lg font-semibold mb-4">
        {previewData.title}
      </h2>

      {/* Divider */}
      <div className="border-t border-white/20 mb-4"></div>

      {/* Body */}
      <p className="text-center text-gray-300 text-sm leading-relaxed">
        {previewData.body}
      </p>

    </div>
  </div>
)}

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
        <div className="bg-[#1a2f55] p-6 rounded-xl w-96 shadow-xl">
          <h3 className="text-lg font-semibold mb-4">
            Add Notification
          </h3>

          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 rounded bg-[#0e1f3d] outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Body"
            className="w-full mb-4 p-2 rounded bg-[#0e1f3d] outline-none"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleAddNotification}
              className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )}

  </div>
);
}