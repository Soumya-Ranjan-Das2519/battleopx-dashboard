import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { MdOutlineFileUpload } from "react-icons/md";

export default function ProfileInformation() {
  const fileInputRef = useRef(null);

  const [activePage, setActivePage] = useState("profile"); // profile | password

  const [firstName, setFirstName] = useState("Admin");
  const [lastName, setLastName] = useState("User");
  const [email, setEmail] = useState("Admin@gmail.com");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profileData"));
    if (saved) {
      setFirstName(saved.firstName);
      setLastName(saved.lastName);
      setEmail(saved.email);
      setPhoto(saved.photo);
    }
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const data = { firstName, lastName, email, photo };
    localStorage.setItem("profileData", JSON.stringify(data));
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSavePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Password Updated Successfully!");
    setPassword("");
    setConfirmPassword("");
    setActivePage("profile");
  };

  return (
    <div className="flex h-screen bg-[#0b132b] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Settings"
          subtitle="Manage your account and profile preferences"
        />

        <div className="flex-1 overflow-y-auto bg-[#0f1c3f] px-10 py-8">

          {/* ============ PROFILE PAGE ============ */}
          {activePage === "profile" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold">Profile Information</h1>
                <p className="text-sm text-[#5a7090]">
                  Update your personal details and profile picture
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-xl bg-[#111c44] p-8 rounded-2xl shadow-xl border border-[#1d2a5a]">

                  {message && (
                    <div className="mb-4 text-center text-green-400 text-sm">
                      {message}
                    </div>
                  )}

                  {/* Profile Image */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-40 h-40 rounded-full overflow-hidden bg-[#1a2b5a]">
                      <img
                        src={
                          photo
                            ? photo
                            : "https://i.pravatar.cc/300"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />

                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="mt-3 px-4 py-2 text-xs bg-[#1c2c5a] rounded-md 
                                 hover:bg-[#24346a] transition 
                                 flex items-center gap-2 justify-center"
                    >
                      <MdOutlineFileUpload className="text-sm" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">

                    <div>
                      <label className="block text-sm mb-1 text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent border border-[#2a3c6e] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent border border-[#2a3c6e] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border border-[#2a3c6e] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
                      />

                      <p className="text-xs mt-1 text-right text-[#5a7090]">
                        Want to change your password?{" "}
                        <span
                          onClick={() => setActivePage("password")}
                          className="underline cursor-pointer text-white"
                        >
                          Click here.
                        </span>
                      </p>
                    </div>

                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:opacity-90 transition"
                    >
                      💾 Save Changes
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}

          {/* ============ CHANGE PASSWORD PAGE ============ */}
          {activePage === "password" && (
            <>
              <div className="mb-8">
                <button
                  onClick={() => setActivePage("profile")}
                  className="text-sm text-gray-400 hover:text-white mb-4"
                >
                  ← Back
                </button>

                <h1 className="text-2xl font-bold">Change Password</h1>
                <p className="text-sm text-[#5a7090]">
                  Update your password
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-xl bg-[#111c44] p-8 rounded-2xl shadow-xl border border-[#1d2a5a] space-y-6">

                  <div>
                    <label className="block text-sm mb-2 text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent border border-[#2a3c6e] rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <span
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                      >
                        👁
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-transparent border border-[#2a3c6e] rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <span
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                      >
                        👁
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSavePassword}
                    className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-sm font-medium transition"
                  >
                    💾 Save Changes
                  </button>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}