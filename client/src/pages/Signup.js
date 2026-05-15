import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Signup successful!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute w-[520px] h-[520px] bg-purple-600/25 blur-[130px] top-[-120px] right-[-120px]"></div>
      <div className="absolute w-[480px] h-[480px] bg-blue-600/25 blur-[130px] bottom-[-120px] left-[-120px]"></div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-10">
            Intern<span className="text-purple-400">Bridge</span>
          </h2>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Create your profile. <br />
            Start applying. <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Grow faster.
            </span>
          </h1>

          <p className="text-gray-400 max-w-lg">
            Join as a student, company or admin and manage the complete
            internship lifecycle from one place.
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Choose your role and get started
          </p>

          <input
            type="text"
            placeholder="Full name"
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 outline-none"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-[#111827] border border-white/10 focus:border-purple-400 outline-none"
          >
            <option value="student">Student</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 font-semibold hover:opacity-90 transition"
          >
            Sign Up →
          </button>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <span
              className="text-purple-400 cursor-pointer font-semibold"
              onClick={() => (window.location.href = "/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;