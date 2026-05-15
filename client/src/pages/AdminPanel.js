import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function AdminPanel() {
  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/internships/pending`);
      setJobs(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPending();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${API_URL}/api/internships/approve/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      alert("Internship approved!");
    } catch {
      alert("Approve failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/internships/reject/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      alert("Internship rejected!");
    } catch {
      alert("Reject failed");
    }
  };

  if (user?.role !== "admin") {
    return (
      <AccessDenied />
    );
  }

  return (
    <div className="min-h-screen bg-[#070b16] text-white p-8 relative overflow-hidden">
      <div className="absolute w-[520px] h-[520px] bg-blue-600/20 blur-[130px] top-[-150px] left-[-130px]"></div>
      <div className="absolute w-[520px] h-[520px] bg-purple-600/20 blur-[130px] bottom-[-150px] right-[-130px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mb-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-blue-400/40"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold mb-2">
            Admin{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Approval Panel
            </span>
          </h1>
          <p className="text-gray-400">
            Review, approve, or reject company internship postings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <div className="col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 text-center text-gray-400">
              No pending internships 🎉
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl hover:-translate-y-1 hover:border-blue-400/40 transition"
              >
                <span className="inline-block mb-4 text-xs px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
                  Pending Approval
                </span>

                <h2 className="text-xl font-bold mb-3">{job.title}</h2>

                <p className="text-gray-300 mb-1">
                  <strong className="text-gray-400">Company:</strong> {job.company}
                </p>

                <p className="text-gray-300 mb-5">
                  <strong className="text-gray-400">Location:</strong> {job.location}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(job._id)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 font-semibold hover:opacity-90 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(job._id)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 font-semibold hover:opacity-90 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="min-h-screen bg-[#070b16] text-white flex items-center justify-center p-8">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-red-400">Access Denied ❌</h1>
        <p className="text-gray-400 mt-2">Only admin can access this page.</p>
      </div>
    </div>
  );
}

export default AdminPanel;