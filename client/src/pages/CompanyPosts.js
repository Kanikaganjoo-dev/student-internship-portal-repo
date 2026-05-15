import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CompanyPosts() {
  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${API_URL}/api/internships/company/${user.email}`)
        .then((res) => setJobs(res.data))
        .catch((err) => console.log(err));
    }
  }, [user?.email, API_URL]);

  if (user?.role !== "company") {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-[#070b16] text-white p-8 relative overflow-hidden">
      <Glow />

      <div className="relative z-10 max-w-7xl mx-auto">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mb-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-blue-400/40"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold mb-2">
            My Posted{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Internships
            </span>
          </h1>
          <p className="text-gray-400">
            View all internship posts submitted by your company and track their approval status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <div className="col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 text-center text-gray-400">
              You have not posted any internships yet.
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl hover:-translate-y-1 hover:border-blue-400/40 transition"
              >
                <span
                  className={`inline-block mb-4 text-xs px-3 py-1 rounded-full border ${
                    job.approved
                      ? "bg-green-500/15 text-green-300 border-green-500/30"
                      : "bg-yellow-500/15 text-yellow-300 border-yellow-500/30"
                  }`}
                >
                  {job.approved ? "Approved" : "Pending Approval"}
                </span>

                <h2 className="text-xl font-bold mb-3">{job.title}</h2>

                <p className="text-gray-300 mb-1">
                  <strong className="text-gray-400">Company:</strong>{" "}
                  {job.company}
                </p>

                <p className="text-gray-300">
                  <strong className="text-gray-400">Location:</strong>{" "}
                  {job.location}
                </p>
              </div>
            ))
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
        <p className="text-gray-400 mt-2">Only companies can view posted internships.</p>
      </div>
    </div>
  );
}

export default CompanyPosts;