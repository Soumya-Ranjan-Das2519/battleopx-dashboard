import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function ContactUsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [tableData, setTableData] = useState([
    { sno: 1, type: "About Us", content: "About Us Content" },
    { sno: 2, type: "Terms & conditions", content: "Terms Content" },
    { sno: 3, type: "Privacy Policy", content: "Privacy Content" },
  ]);

  // Submit / Update
  const handleSubmit = () => {
    if (!title || !content) return alert("Please fill all fields");

    if (editIndex !== null) {
      const updated = [...tableData];
      updated[editIndex] = {
        ...updated[editIndex],
        type: title,
        content: content,
      };
      setTableData(updated);
      setEditIndex(null);
    } else {
      const newData = {
        sno: tableData.length + 1,
        type: title,
        content: content,
      };
      setTableData([...tableData, newData]);
    }

    setTitle("");
    setContent("");
  };

  // Edit
  const handleEdit = (index) => {
    setTitle(tableData[index].type);
    setContent(tableData[index].content);
    setEditIndex(index);
  };

  // Delete
  const handleDelete = (index) => {
    const updated = tableData.filter((_, i) => i !== index);
    setTableData(
      updated.map((item, i) => ({
        ...item,
        sno: i + 1,
      }))
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0d1117]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title="Contact Us"
          subtitle="Manage About, Terms and Privacy content"
        />

        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#10182a]">
          
          {/* Form Card */}
          <div className="bg-[#0F1A3C] border border-[#1a2535] rounded-xl p-6 mb-6">
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-[#c8d8e8]">
                Title *
              </label>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0F1A3C] border border-[#1e3047] rounded-lg px-4 py-2.5 text-sm text-white outline-none"
              >
                <option value="">Select Title</option>
                <option>About Us</option>
                <option>Terms & conditions</option>
                <option>Privacy Policy</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-[#c8d8e8]">
                Content *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full bg-[#0F1A3C] border border-[#1e3047] rounded-lg px-4 py-3 text-sm text-white outline-none resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#00bfff] to-[#0096cc] shadow-md"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-[#0F1A3C] border border-[#1a2535] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1a2535] text-[#c8d8e8]">
                  <th className="px-6 py-3 text-left">S no.</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Content</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#1a2535] text-[#7a8fa6]"
                  >
                    <td className="px-6 py-3">{row.sno}</td>
                    <td className="px-6 py-3">{row.type}</td>
                    <td className="px-6 py-3">{row.content}</td>
                    <td className="px-6 py-3 flex gap-4">
                      <button
                        onClick={() => handleEdit(index)}
                        className="hover:text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="hover:text-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}