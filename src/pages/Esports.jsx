import React from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Esports() {
  const [games, setGames] = useState([
    {
      id: 1,
      title: "FREEFIRE",
      gameName: "FREEFIRE MAX",
      image: null,
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    gameName: "",
    image: null,
  });
  const [selectedGame, setSelectedGame] = useState(null);
const [openMenu, setOpenMenu] = useState(null);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  // 🔹 Add / Update Game
  const handleSubmit = () => {
    if (!formData.title || !formData.gameName) return;

    if (editData) {
      setGames(
        games.map((g) =>
          g.id === editData.id ? { ...editData, ...formData } : g
        )
      );
      setEditData(null);
    } else {
      const newGame = {
        id: games.length + 1,
        ...formData,
        status: "Active",
      };
      setGames([...games, newGame]);
    }

    setFormData({ title: "", gameName: "", image: null });
    setShowModal(false);
  };

  // 🔹 Delete Game
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      setGames(games.filter((g) => g.id !== id));
    }
  };

  // 🔹 Toggle Status
  const toggleStatus = (id) => {
    setGames(
      games.map((g) =>
        g.id === id
          ? { ...g, status: g.status === "Active" ? "Disabled" : "Active" }
          : g
      )
    );
  };

  // 🔹 Edit Game
  const handleEdit = (game) => {
    setEditData(game);
    setFormData(game);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-[#071028] to-[#020617] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-[#0c1630]">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">

        <Header
          title="E-sports"
          subtitle="Manage registered players and their accounts"
        />

        {/* Add Button */}
        <div className="px-8 pt-6 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2 rounded-full text-sm font-medium hover:opacity-90"
          >
            + E-sports Games
          </button>
        </div>

        {/* Table Section */}
        <div className="flex-1 px-8 py-6 overflow-hidden">
          <div className="h-full border border-white/20 rounded-2xl bg-[#0f1b3d] shadow-[0_0_35px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden">

            <div className="px-6 py-4 border-b border-white/20">
              <h2 className="text-lg font-semibold">All Games</h2>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm whitespace-nowrap">

                <thead className="sticky top-0 bg-[#0f1b3d] border-b border-white/20 text-slate-300">
                  <tr>
                    <th className="px-6 py-4 text-left">S no.</th>
                    <th className="py-4 text-left">Title</th>
                    <th className="py-4 text-left">Game Name</th>
                    <th className="py-4 text-left">Image Preview</th>
                    <th className="py-4 text-left">Status</th>
                    <th className="py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {games.map((game, index) => (
                    <tr
                      key={game.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td>{game.title}</td>
                      <td>{game.gameName}</td>

                      <td>
                        {game.image ? (
                          <img
                            src={game.image}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-white/20 rounded-md"></div>
                        )}
                      </td>

                      <td>
                        <span
                          onClick={() => toggleStatus(game.id)}
                          className={`cursor-pointer px-3 py-1 rounded-full text-xs ${
                            game.status === "Active"
                              ? "bg-green-600/20 text-green-400"
                              : "bg-red-600/20 text-red-400"
                          }`}
                        >
                          {game.status}
                        </span>
                      </td>

                     <td className="text-center relative">
  <div className="flex justify-center gap-4 items-center">

    {/* Details Icon */}
    <AiOutlineInfoCircle
      onClick={() => setSelectedGame(game)}
      className="cursor-pointer text-slate-300 hover:text-white"
    />

    {/* 3 Dot Menu */}
    <FiMoreVertical
      onClick={() =>
        setOpenMenu(openMenu === game.id ? null : game.id)
      }
      className="cursor-pointer text-slate-300 hover:text-white"
    />

  </div>

  {/* Dropdown */}
  {openMenu === game.id && (
    <div className="absolute right-6 mt-2 w-28 bg-[#071028] border border-white/20 rounded-lg shadow-lg z-50">

      <button
        onClick={() => {
          handleEdit(game);
          setOpenMenu(null);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
      >
        Edit
      </button>

      <button
        onClick={() => {
          handleDelete(game.id);
          setOpenMenu(null);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-red-400"
      >
        Delete
      </button>

    </div>
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

      {/* Modal */}
      {/* Details Modal */}
{selectedGame && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#0f1b3d] w-[450px] rounded-2xl border border-white/20 p-8">

      <h2 className="text-lg font-semibold mb-6">Game Details</h2>

      <div className="space-y-4 text-sm">

        <div>
          <span className="text-slate-400">Title:</span>
          <p>{selectedGame.title}</p>
        </div>

        <div>
          <span className="text-slate-400">Game Name:</span>
          <p>{selectedGame.gameName}</p>
        </div>

        <div>
          <span className="text-slate-400">Status:</span>
          <p>{selectedGame.status}</p>
        </div>

        {selectedGame.image && (
          <div>
            <span className="text-slate-400">Banner:</span>
            <img
              src={selectedGame.image}
              alt=""
              className="w-24 h-24 rounded-lg mt-2 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setSelectedGame(null)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}