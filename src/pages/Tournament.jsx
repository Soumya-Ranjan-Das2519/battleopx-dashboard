import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import { FaInfoCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import BannerSection from "./BannerSection";
import MatchRulesSection from "./MatchRulesSection";

const gamesData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: "FREEFIRE",
  gameName: "FREEFIRE MAX",
}));

export default function TournamentPage() {
  const [currentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showAddGame, setShowAddGame] = useState(false);
  const [activeTab, setActiveTab] = useState("games");

  const [title, setTitle] = useState("");
  const [gameName, setGameName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, gameName, image });
    setShowAddGame(false);
  };

const pageTitle = showAddGame ? "E-sports Games" : "E-sports";

const pageSubtitle = showAddGame
  ? "Add and manage your E-sports games"
  : "Welcome back! Here's your gaming platform overview";


  return (
    <div className="flex h-screen bg-[#0a1224] text-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
        />

        <main className="flex-1 overflow-auto px-8 py-6">
          {/* ================= ADD GAME PAGE ================= */}
          {showAddGame ? (
            <div className="bg-[#0c1630] rounded-2xl border border-[#0d2040] p-10 w-full mx-auto shadow-2xl">
              <h2 className="text-xl font-bold mb-8">Add New Game</h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* LEFT SIDE */}
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold">
                      Title <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full mt-2 bg-[#091525] border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white"
                      placeholder="Enter Game Title"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      className="w-full mt-2 bg-[#091525] border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white"
                      placeholder="Enter Game Name"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#00b0e0] hover:bg-[#0090c0] px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all"
                  >
                    Add Game
                  </button>
                </div>

                {/* RIGHT SIDE IMAGE UPLOAD */}
                <div className="flex flex-col items-center justify-center ">
                  <label className="flex w-50 ml-10 mr-30 flex-col items-center cursor-pointer border border-dashed border-[#1a3a5a] rounded-2xl p-8 bg-[#091525]">
                    <FiUpload size={28} className="mb-3" />
                    <span className="text-sm text-gray-300">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>

                  <p className="text-xs w-50 ml-10 mr-30 text-gray-400 mt-4 text-left">
                    Note : Image size should be between <br />
                    400 x 130 pixels.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowAddGame(false)}
                    className="mt-6 border border-[#0d2a4a] px-6 py-2 rounded-lg w-50 ml-10 mr-30 text-sm hover:border-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* ================= TABLE PAGE ================= */}
              <div className="flex justify-between items-center mb-5">

  {/* LEFT SIDE TABS */}
  <div className="flex gap-4">
    <button
      onClick={() => {
        setActiveTab("banner");
        setShowAddGame(false);
      }}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
        activeTab === "banner"
          ? "bg-[#00b0e0] text-white"
          : "bg-[#0c1630] border border-[#0d2040]"
      }`}
    >
      Add Banner
    </button>

    <button
      onClick={() => {
        setActiveTab("rules");
        setShowAddGame(false);
      }}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
        activeTab === "rules"
          ? "bg-[#00b0e0] text-white"
          : "bg-[#0c1630] border border-[#0d2040]"
      }`}
    >
      Match Rules
    </button>

    <button
      onClick={() => {
        setActiveTab("events");
        setShowAddGame(false);
      }}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
        activeTab === "events"
          ? "bg-[#00b0e0] text-white"
          : "bg-[#0c1630] border border-[#0d2040]"
      }`}
    >
      Add New Game
    </button>

  </div>

  {/* RIGHT SIDE EXISTING BUTTON (UNCHANGED) */}
  <button
    onClick={() => {
      setShowAddGame(true);
      setActiveTab("games");
    }}
    className="flex items-center gap-2 bg-[#00b0e0] px-5 py-2.5 rounded-lg text-sm font-bold tracking-wider"
  >
    <span className="text-lg leading-none">+</span>
    E-sports Games
  </button>

</div>

              <div className="bg-[#0c1630] rounded-2xl border border-[#0d2040] overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-[#0d2040]">
                  <h2 className="text-xl font-black tracking-widest">
                    All Games
                  </h2>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#0d2040]">
                      {[
                        "S no.",
                        "Title",
                        "Game Name",
                        "Image Preview",
                        "Action",
                      ].map((col) => (
                        <th
                          key={col}
                          className="py-4 px-6 text-xs font-bold tracking-widest uppercase text-center"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {gamesData.map((game) => (
                      <tr
                        key={game.id}
                        onMouseEnter={() => setHoveredRow(game.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`border-b border-[#0a1828] ${
                          hoveredRow === game.id ? "bg-[#091525]" : ""
                        }`}
                      >
                        <td className="py-3 px-6 text-center text-sm">
                          {game.id}
                        </td>
                        <td className="py-3 px-6 text-center text-xs">
                          {game.title}
                        </td>
                        <td className="py-3 px-6 text-center text-xs">
                          {game.gameName}
                        </td>
                        <td className="py-3 px-6 flex justify-center">
                          <div className="w-10 h-10 rounded-md border border-[#1a3a5a] bg-white/80"></div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center gap-3">                       
                       <FaInfoCircle size={15} />
                        <button className="flex items-center gap-1 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
                        </button>
                      </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-[#0d2040]">
                  <button className="px-4 py-1.5 rounded-md text-xs bg-[#0a1828] border border-[#0d2a4a]">
                    Previous
                  </button>
                  <span className="text-xs text-[#3a5a7a]">
                    Page {currentPage} of 1
                  </span>
                  <button className="px-4 py-1.5 rounded-md text-xs bg-[#0a1828] border border-[#0d2a4a]">
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      {activeTab === "rules" && <MatchRulesSection />}
      {activeTab === "banner" && <BannerSection />}
      {activeTab === "events" && (
        
  <div className="bg-[#0c1630] rounded-2xl border border-[#0d2040] w-full shadow-2xl h-full overflow-y-auto">
    
           <Header
          title="Add New Game"
          subtitle="Add a new game to the tournament"
        />
    <form className="grid grid-cols-1 md:grid-cols-2 p-10 gap-8">
      
      {/* Title */}
      <div>
        <label className="text-sm font-semibold">
          Title <span className="text-white">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Pool Prize */}
      <div>
        <label className="text-sm font-semibold">
          Pool Prize <span className="text-white">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Prize Pool Description */}
      <div className="md:col-span-2">
        <label className="text-sm font-semibold">
          Prize Pool description <span className="text-white">*</span>
        </label>
        <textarea
          rows="3"
          placeholder="Enter maximum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Match Date */}
      <div>
        <label className="text-sm font-semibold">
          Match Date <span className="text-white">*</span>
        </label>
        <input
          type="date"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Match Time */}
      <div>
        <label className="text-sm font-semibold">
          Match Time <span className="text-white">*</span>
        </label>
        <input
          type="time"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Version */}
      <div>
        <label className="text-sm font-semibold">
          Version <span className="text-white">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Map */}
      <div>
        <label className="text-sm font-semibold">
          Map <span className="text-white">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Match Rules */}
      <div className="md:col-span-2">
        <label className="text-sm font-semibold">
          Match Rules <span className="text-white">*</span>
        </label>
        <textarea
          rows="3"
          placeholder="Enter maximum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Fee Type */}
      <div>
        <label className="text-sm font-semibold">
          Fee Type <span className="text-white">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Points / kills */}
      <div>
        <label className="text-sm font-semibold">
          Points/kills <span className="text-white">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Sponsored by */}
      <div>
        <label className="text-sm font-semibold">
          Sponsored by
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Spectate URL */}
      <div>
        <label className="text-sm font-semibold">
          Spectate URL
        </label>
        <input
          type="text"
          placeholder="Enter Minimum Amount"
          className="w-full mt-2 bg-slate-800 border border-[#0d2a4a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00b0e0]"
        />
      </div>

      {/* Button */}
      <div className="md:col-span-2 flex justify-end mt-6">
        <button
          type="submit"
          className="bg-[#00b0e0] hover:bg-[#0095c5] px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition"
        >
          Add Event
        </button>
      </div>

    </form>
  </div>
)}
    </div>
  );
}