import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute w-[520px] h-[520px] bg-blue-600/25 blur-[130px] top-[-120px] left-[-120px]"></div>
      <div className="absolute w-[480px] h-[480px] bg-purple-600/25 blur-[130px] bottom-[-120px] right-[-120px]"></div>

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold">
              Intern<span className="text-blue-400">Bridge</span>
            </h2>
            <p className="text-gray-400 mt-2">College Internship Portal</p>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Discover Opportunities. <br />
            Build Skills. <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Shape Your Future.
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-lg mb-10">
            A smart internship platform connecting students, companies and
            admins through verified opportunities.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-lg">
            <Feature title="Verified" text="Admin approved internships" />
            <Feature title="Secure" text="JWT protected access" />
            <Feature title="Smart" text="Analytics and tracking" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
          <div className="h-20 w-20 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center mx-auto mb-6 text-3xl">
            🎓
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8">
            Login to continue to your account
          </p>

          <label className="text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 mb-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 outline-none text-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-2 mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 outline-none text-white"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:opacity-90 transition"
          >
            Sign In →
          </button>

          <p className="text-center text-gray-400 mt-6">
            Don’t have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer font-semibold"
              onClick={() => (window.location.href = "/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{text}</p>
    </div>
  );
}

export default Login;

