import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [resumeName, setResumeName] = useState(
    localStorage.getItem(`resume_${user?.email}`) || ""
  );

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem(`resume_${user.email}`, res.data.file);
      setResumeName(res.data.file);
      alert("Resume uploaded successfully!");
    } catch (err) {
      console.log(err);
      alert("Resume upload failed");
    }
  };

  if (user?.role !== "student") return <AccessDenied />;

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
            🎓
          </div>

          <h1 className="text-3xl font-extrabold mb-2">
            Student{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>

          <p className="text-gray-400 mb-8">{user?.email}</p>

          <label className="block mb-3 text-gray-300 font-medium">
            Upload Resume
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl mb-4 text-gray-300"
          />

          <p className="text-sm text-gray-400 mb-6">
            Accepted formats: PDF, DOC, DOCX
          </p>

          {resumeName ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
              <p className="text-green-300 font-medium mb-3">
                Resume uploaded successfully
              </p>

              <a
                href={`${API_URL}/uploads/${resumeName}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold"
              >
                View Resume →
              </a>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-yellow-300">
              No resume uploaded yet.
            </div>
          )}
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
        <p className="text-gray-400 mt-2">Only students can access profile.</p>
      </div>
    </div>
  );
}

export default Profile;