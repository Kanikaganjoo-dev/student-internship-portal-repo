import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CompanyApplications() {
  const [applications, setApplications] = useState([]);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/applications/company/${user.email}`
      );
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.email) fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shortlistCandidate = async (id) => {
    try {
      await axios.put(`${API_URL}/api/applications/shortlist/${id}`);
      fetchApplications();
      alert("Candidate shortlisted");
    } catch {
      alert("Shortlist failed");
    }
  };

  const rejectCandidate = async (id) => {
    try {
      await axios.put(`${API_URL}/api/applications/reject/${id}`);
      fetchApplications();
      alert("Candidate rejected");
    } catch {
      alert("Reject failed");
    }
  };

  if (user?.role !== "company") return <AccessDenied />;

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
            Company{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Applications
            </span>
          </h1>
          <p className="text-gray-400">
            Review resumes, shortlist candidates, or reject applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applications.length === 0 ? (
            <div className="col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 text-center text-gray-400">
              No applications received yet.
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl hover:-translate-y-1 hover:border-blue-400/40 transition"
              >
                <span
                  className={`inline-block mb-4 text-xs px-3 py-1 rounded-full border ${
                    app.status === "Shortlisted"
                      ? "bg-green-500/15 text-green-300 border-green-500/30"
                      : app.status === "Rejected"
                      ? "bg-red-500/15 text-red-300 border-red-500/30"
                      : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                  }`}
                >
                  {app.status}
                </span>

                <h2 className="text-xl font-bold mb-3">{app.jobTitle}</h2>

                <p className="text-gray-300 mb-1">
                  <strong className="text-gray-400">Student:</strong>{" "}
                  {app.userEmail}
                </p>

                <p className="text-gray-300 mb-5">
                  <strong className="text-gray-400">Location:</strong>{" "}
                  {app.location}
                </p>

                {app.resume ? (
                  <a
                    href={`${API_URL}/uploads/${app.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold mb-4"
                  >
                    View Resume →
                  </a>
                ) : (
                  <p className="text-red-300 mb-4">No resume uploaded</p>
                )}

                {app.status === "Applied" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => shortlistCandidate(app._id)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 font-semibold"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() => rejectCandidate(app._id)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {app.status === "Shortlisted" && (
                  <p className="text-green-300 font-semibold">
                    ✅ Candidate Shortlisted
                  </p>
                )}

                {app.status === "Rejected" && (
                  <p className="text-red-300 font-semibold">
                    ❌ Candidate Rejected
                  </p>
                )}
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
        <p className="text-gray-400 mt-2">Only companies can view this page.</p>
      </div>
    </div>
  );
}

export default CompanyApplications;