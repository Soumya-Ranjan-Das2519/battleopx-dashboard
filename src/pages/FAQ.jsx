import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function FAQSection() {
  // Load from localStorage
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem("faqs");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, sno: 1, iid: "FAQ001", question: "15,000", answer: "4954854894" },
          { id: 2, sno: 2, iid: "FAQ002", question: "15,000", answer: "549814904523" },
        ];
  });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("faqs", JSON.stringify(faqs));
  }, [faqs]);

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add FAQ
  const handleSubmit = () => {
    if (!question.trim() || !answer.trim()) {
      showNotification("Please fill in both fields.", "error");
      return;
    }

    const newFaq = {
      id: Date.now(),
      sno: faqs.length + 1,
      iid: `FAQ${String(faqs.length + 1).padStart(3, "0")}`,
      question: question.trim(),
      answer: answer.trim(),
    };

    setFaqs([...faqs, newFaq]);
    setQuestion("");
    setAnswer("");
    showNotification("FAQ added successfully!");
  };

  // Delete FAQ
  const handleDelete = (id) => {
    const updated = faqs
      .filter((f) => f.id !== id)
      .map((item, index) => ({
        ...item,
        sno: index + 1,
        iid: `FAQ${String(index + 1).padStart(3, "0")}`,
      }));

    setFaqs(updated);
    setDeleteConfirm(null);
    showNotification("FAQ deleted.");
  };

  // Start Edit
  const handleEditStart = (faq) => {
    setEditId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  // Save Edit
  const handleEditSave = (id) => {
    if (!editQuestion.trim() || !editAnswer.trim()) {
      showNotification("Fields cannot be empty.", "error");
      return;
    }

    const updated = faqs.map((f) =>
      f.id === id
        ? { ...f, question: editQuestion.trim(), answer: editAnswer.trim() }
        : f
    );

    setFaqs(updated);
    setEditId(null);
    showNotification("FAQ updated successfully!");
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  return (
    <div
      style={{ fontFamily: "'Rajdhani', 'Segoe UI', sans-serif" }}
      className="flex h-screen bg-[#071028] text-white overflow-hidden"
    >
      {/* Sidebar */}
      <div className="w-64 bg-[#071028] border-r border-white/10">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="FAQ Section"
          subtitle="Welcome back! Here's your gaming platform overview"
        />

        {/* Notification */}
        {notification && (
          <div
            className="mx-6 mt-4 px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              background:
                notification.type === "error" ? "#7f1d1d" : "#065f46",
              color:
                notification.type === "error" ? "#fca5a5" : "#6ee7b7",
              border: `1px solid ${
                notification.type === "error" ? "#b91c1c" : "#059669"
              }`,
            }}
          >
            {notification.msg}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Form */}
          <div
            className="rounded-xl p-6 mb-6"
            style={{
              background: "#071028",
              border: "1px solid #1f2937",
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Questions
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  background: "#071028",
                  border: "1px solid #374151",
                  color: "#e5e7eb",
                }}
                placeholder="Enter Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">
                Answers
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  background: "#071028",
                  border: "1px solid #374151",
                  color: "#e5e7eb",
                }}
                placeholder="Enter Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSubmit()
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full font-bold text-sm"
              style={{
                background:
                  "linear-gradient(90deg, #00b4d8, #00d4ff)",
                color: "#0d1117",
              }}
            >
              Submit
            </button>
          </div>

          {/* Table (Design untouched) */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #1f2937" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#071028" }}>
                  {["S no.", "I'D", "Question", "Answer", "Action"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-bold"
                        style={{ color: "#e5e7eb" }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {faqs.map((faq, idx) => (
                  <tr
                    key={faq.id}
                    style={{
                      background:
                        idx % 2 === 0 ? "#071028" : "#0d1117",
                      borderBottom: "1px solid #1f2937",
                    }}
                  >
                    <td className="px-4 py-3">{faq.sno}</td>
                    <td className="px-4 py-3">{faq.iid}</td>

                    <td className="px-4 py-3">
                      {editId === faq.id ? (
                        <input
                          className="px-2 py-1 rounded text-xs w-full"
                          style={{
                            background: "#071028",
                            border: "1px solid #00d4ff",
                          }}
                          value={editQuestion}
                          onChange={(e) =>
                            setEditQuestion(e.target.value)
                          }
                        />
                      ) : (
                        faq.question
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {editId === faq.id ? (
                        <input
                          className="px-2 py-1 rounded text-xs w-full"
                          style={{
                            background: "#071028",
                            border: "1px solid #00d4ff",
                          }}
                          value={editAnswer}
                          onChange={(e) =>
                            setEditAnswer(e.target.value)
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleEditSave(faq.id)
                          }
                        />
                      ) : (
                        faq.answer
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {editId === faq.id ? (
                        <>
                          <button
                            onClick={() =>
                              handleEditSave(faq.id)
                            }
                            className="mr-2 text-green-400"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="text-gray-400"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleEditStart(faq)
                            }
                            className="mr-2 text-cyan-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirm(faq.id)
                            }
                            className="text-red-400"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}