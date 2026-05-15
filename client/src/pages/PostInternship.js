import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function PostInternship() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handlePost = async () => {
    try {
      if (!title || !location) {
        alert("Please fill all fields");
        return;
      }

      await axios.post(`${API_URL}/api/internships`, {
        title,
        company: user?.email,
        location,
      });

      alert("Internship posted successfully! Waiting for admin approval.");
      setTitle("");
      setLocation("");
    } catch (err) {
      console.log(err);
      alert("Error posting internship");
    }
  };

  if (user?.role !== "company") {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-[#070b16] text-white p-8 relative overflow-hidden flex items-center justify-center">
      <Glow />

      <div className="relative z-10 w-full max-w-xl">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mb-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-blue-400/40"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl mb-6">
            🏢
          </div>

          <h1 className="text-3xl font-extrabold mb-2">
            Post{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Internship
            </span>
          </h1>

          <p className="text-gray-400 mb-8">
            Create an internship opportunity for students. Admin approval is required before it becomes visible.
          </p>

          <label className="text-sm text-gray-300">Internship Title</label>
          <input
            className="w-full mt-2 mb-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 outline-none text-white"
            placeholder="e.g. Frontend Developer Intern"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="text-sm text-gray-300">Location</label>
          <input
            className="w-full mt-2 mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 outline-none text-white"
            placeholder="e.g. Pune / Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            onClick={handlePost}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:opacity-90 transition"
          >
            Submit for Approval →
          </button>
        </div>
      </div>
    </div>
  );
}

function Glow() {
  return (
    <>
      <div className="absolute w-[520px] h-[520px] bg-blue-600/20 blur-[130px] top-[-150px] left-[-130px]"></div>
      <div className="absolute w-[520px] h-[520px] bg-purple-600/20 blur-[130px] bottom-[-150px] right-[-130px]"></div>
    </>
  );
}

function AccessDenied() {
  return (
    <div className="min-h-screen bg-[#070b16] text-white flex items-center justify-center p-8">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-red-400">Access Denied ❌</h1>
        <p className="text-gray-400 mt-2">Only companies can post internships.</p>
      </div>
    </div>
  );
}

export default PostInternship;