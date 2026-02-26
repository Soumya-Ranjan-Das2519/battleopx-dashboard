import React from "react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login Successful 🚀");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#071028] to-[#020617] relative overflow-hidden">

        {/* Background Circles */}
        <div className="absolute w-96 h-96 bg-blue-900/30 rounded-full -top-20 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-indigo-900/30 rounded-full -bottom-40 -right-20"></div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 bg-[#1e293b] items-center justify-center relative overflow-hidden">

        {/* Decorative Circles */}
        <div className="absolute w-96 h-96 bg-blue-900/20 rounded-full -bottom-32 -right-32"></div>

        <div className="relative w-full max-w-md px-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://battleop.odoo.com/favicon.ico"
              alt="Logo"
              className="w-20 mb-4"
            />
            <h1 className="text-3xl font-bold text-white tracking-widest">
              BATTLE OP
            </h1>
            <p className="text-gray-400 mt-1">Login</p>
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 pr-10 text-white focus:outline-none focus:border-cyan-400"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <div className="text-right mt-1">
                <button className="text-xs text-gray-400 hover:text-white">
                  Forgot Password ?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-white font-semibold transition"
            >
              Login
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}