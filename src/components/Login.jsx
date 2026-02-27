import React, { useState, useRef } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Login fields
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot password fields
  const [forgotEmail, setForgotEmail] = useState("");

  // OTP fields
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  // Reset password fields
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Screen mode: "login", "forgot", "otp", "reset"
  const [mode, setMode] = useState("login");

  const navigate = useNavigate();

  // ---------- Handlers ----------
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    alert("Login Successful 🚀");
    // localStorage.setItem("authUser", JSON.stringify({ email }));
    // navigate("/dashboard");
  };

  const handleSendOTP = () => {
    if (!forgotEmail) {
      alert("Please enter your email address");
      return;
    }
    alert(`OTP sent to ${forgotEmail} (demo)`);
    setMode("otp");
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter the full 6-digit OTP");
      return;
    }
    alert(`OTP ${otpString} verified (demo)`);
    setMode("reset"); // Move to reset password screen
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill both password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password reset successfully. You can now login with your new password.");
    // Reset all fields and go back to login
    setMode("login");
    setNewPassword("");
    setConfirmPassword("");
    setForgotEmail("");
    setOtp(["", "", "", "", "", ""]);
  };

  // OTP input handling
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* LEFT SIDE - decorative */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#071028] to-[#020617] relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-900/30 rounded-full -top-20 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-indigo-900/30 rounded-full -bottom-40 -right-20"></div>
      </div>

      {/* RIGHT SIDE - forms */}
      <div className="flex w-full md:w-1/2 bg-[#1e293b] items-center justify-center relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-900/20 rounded-full -bottom-32 -right-32"></div>

        <div className="relative w-full max-w-md px-8">
          {/* Logo and title */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://battleop.odoo.com/favicon.ico"
              alt="Logo"
              className="w-20 mb-4"
            />
            <h1 className="text-3xl font-bold text-white tracking-widest">
              BATTLE OP
            </h1>
            <p className="text-gray-400 mt-1">
              {mode === "login" && "Login"}
              {mode === "forgot" && "Reset Password"}
              {mode === "otp" && "Reset Password"}
              {mode === "reset" && "Reset Password"}
            </p>
          </div>

          {/* LOGIN FORM */}
          {mode === "login" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Password</label>
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
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-white font-semibold transition"
              >
                Login
              </button>
            </div>
          )}

          {/* FORGOT PASSWORD (EMAIL) FORM */}
          {mode === "forgot" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Enter the Email address
                </label>
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                onClick={handleSendOTP}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-white font-semibold transition"
              >
                Send OTP
              </button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  ← Back to Login
                </button>
              </div>
            </div>
          )}

          {/* OTP FORM */}
          {mode === "otp" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Enter the 6 digit password sent on your email
                </label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      ref={(el) => (otpRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center bg-transparent border border-gray-500 rounded-md text-white text-xl focus:outline-none focus:border-cyan-400"
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={handleVerifyOTP}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-white font-semibold transition"
              >
                Send OTP
              </button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  ← Back to Email
                </button>
              </div>
            </div>
          )}

          {/* RESET PASSWORD FORM - exact match with latest image */}
          {mode === "reset" && (
            <div className="space-y-5">
              {/* New password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Enter a new password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 pr-10 text-white focus:outline-none focus:border-cyan-400"
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Re-enter the password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 pr-10 text-white focus:outline-none focus:border-cyan-400"
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              {/* Static "Battle op" text */}
              <p className="text-center text-gray-400 text-sm">Battle op</p>

              {/* Reset Password button */}
              <button
                onClick={handleResetPassword}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md text-white font-semibold transition"
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}