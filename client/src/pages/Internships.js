import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Internships() {
  const [verifiedJobs, setVerifiedJobs] = useState([]);
  const [externalJobs, setExternalJobs] = useState([]);
  const [search, setSearch] = useState("internship");
  const [location, setLocation] = useState("India");
  const [activeTab, setActiveTab] = useState("verified");
  const [savedJobs, setSavedJobs] = useState([]);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchVerifiedJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/internships`);
      setVerifiedJobs(res.data);
    } catch (err) {
      console.log("Verified internships error:", err);
    }
  };

  const fetchExternalJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/internships/external`, {
        params: { search, location },
      });
      setExternalJobs(res.data);
    } catch (err) {
      console.log("External internships error:", err);
    }
  };

  useEffect(() => {
    fetchVerifiedJobs();
    fetchExternalJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchExternalJobs();
    setActiveTab("external");
  };

  const handleApply = async (job) => {
    try {
      const resume = localStorage.getItem(`resume_${user.email}`);

      if (!resume) {
        alert("Please upload your resume from My Profile before applying.");
        window.location.href = "/profile";
        return;
      }

      await axios.post(`${API_URL}/api/applications`, {
        userEmail: user.email,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        resume,
      });

      alert("Applied successfully!");
    } catch (err) {
      console.log(err);
      alert("Application failed");
    }
  };

  const handleSave = async (job) => {
    try {
      await axios.post(`${API_URL}/api/saved`, {
        userEmail: user.email,
        title: job.title,
        company: job.company,
        location: job.location,
      });

      const exists = savedJobs.some(
        (saved) =>
          saved.title === job.title &&
          saved.company === job.company &&
          saved.location === job.location
      );

      if (!exists) {
        setSavedJobs([...savedJobs, job]);
      }

      alert("Internship saved!");
    } catch (err) {
      console.log(err);
      alert("Save failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-white p-8 relative overflow-hidden">
      <div className="absolute w-[520px] h-[520px] bg-blue-600/20 blur-[130px] top-[-150px] left-[-130px]"></div>
      <div className="absolute w-[520px] h-[520px] bg-purple-600/20 blur-[130px] bottom-[-150px] right-[-130px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="mb-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-blue-400/40"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-4xl font-extrabold mb-2">
            Internship{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>

          <p className="text-gray-400">
            Explore verified college internships and external real-time opportunities.
          </p>
        </div>

        {/* Search */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 shadow-2xl">
          <h2 className="text-xl font-bold mb-4">Search External Opportunities</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 outline-none text-white"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search internship"
            />

            <input
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 outline-none text-white"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />

            <button
              onClick={handleSearch}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:opacity-90 transition"
            >
              Search →
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <TabButton
            active={activeTab === "verified"}
            onClick={() => setActiveTab("verified")}
            text="Verified College Internships"
          />
          <TabButton
            active={activeTab === "external"}
            onClick={() => setActiveTab("external")}
            text="External Opportunities"
          />
          <TabButton
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
            text="Saved Internships"
          />
        </div>

        {activeTab === "verified" && (
          <JobSection
            title="Verified College Internships"
            empty="No verified college internships available right now."
            jobs={verifiedJobs}
            type="verified"
            onApply={handleApply}
            onSave={handleSave}
          />
        )}

        {activeTab === "external" && (
          <JobSection
            title="External Opportunities"
            empty="No external opportunities found."
            jobs={externalJobs}
            type="external"
            onSave={handleSave}
          />
        )}

        {activeTab === "saved" && (
          <JobSection
            title="Saved Internships"
            empty="No saved internships yet."
            jobs={savedJobs}
            type="saved"
          />
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, text }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl font-semibold border transition ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white"
          : "bg-white/5 border-white/10 text-gray-300 hover:border-blue-400/40"
      }`}
    >
      {text}
    </button>
  );
}

function JobSection({ title, empty, jobs, type, onApply, onSave }) {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  return (
    <section>
      <h2 className="text-2xl font-bold mb-5">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 text-center text-gray-400">
            {empty}
          </div>
        ) : (
          jobs.map((job, index) => (
            <div
              key={job._id || index}
              className="group bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl hover:-translate-y-1 hover:border-blue-400/40 transition"
            >
              <span
                className={`inline-block mb-4 text-xs px-3 py-1 rounded-full ${
                  type === "verified"
                    ? "bg-green-500/15 text-green-300 border border-green-500/30"
                    : type === "external"
                    ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                    : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                }`}
              >
                {type === "verified"
                  ? "Verified by Admin"
                  : type === "external"
                  ? "External Opportunity"
                  : "Saved"}
              </span>

              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition">
                {job.title}
              </h3>

              <p className="text-gray-300 mb-1">
                <strong className="text-gray-400">Company:</strong> {job.company}
              </p>

              <p className="text-gray-300 mb-5">
                <strong className="text-gray-400">Location:</strong>{" "}
                {job.location}
              </p>

              <div className="flex gap-3 flex-wrap">
                {type === "verified" && (
                  <button
                    onClick={() => onApply(job)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:opacity-90 transition"
                  >
                    Apply
                  </button>
                )}

                {type === "external" && job.redirect_url && (
                  <a
                    href={job.redirect_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 font-semibold hover:opacity-90 transition"
                  >
                    Apply
                  </a>
                )}

                {(type === "verified" || type === "external") && (
                  <button
                    onClick={() => onSave(job)}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:border-purple-400/40 transition"
                  >
                    Save
                  </button>
                )}

                {type === "saved" && job.resume && (
                  <a
                    href={`${API_URL}/uploads/${job.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                  >
                    View Resume
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Internships;