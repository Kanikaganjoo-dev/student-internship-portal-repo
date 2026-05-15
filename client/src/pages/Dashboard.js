import React from "react";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-white p-8 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[130px] top-[-130px] left-[-100px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[130px] bottom-[-130px] right-[-100px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              Intern<span className="text-blue-400">Bridge</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Welcome, {user?.name || user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-2">
            {user?.role?.toUpperCase()} Dashboard
          </h2>
          <p className="text-gray-400">
            Manage your internship journey from one clean workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {user?.role === "student" && (
            <>
              <Card title="Browse Internships" desc="Verified and external opportunities" link="/internships" />
              <Card title="My Applications" desc="Track applied, shortlisted or rejected status" link="/applications" />
              <Card title="My Profile" desc="Upload and manage your resume" link="/profile" />
            </>
          )}

          {user?.role === "company" && (
            <>
              <Card title="Post Internship" desc="Create a new internship post" link="/post" />
              <Card title="My Posted Internships" desc="View approval status of your posts" link="/company-posts" />
              <Card title="View Applicants" desc="Review resumes and shortlist candidates" link="/company-applications" />
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Card title="Admin Panel" desc="Approve or reject internship postings" link="/admin" />
              <Card title="Analytics" desc="View users, applications and internship statistics" link="/analytics" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, desc, link }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:-translate-y-1 hover:border-blue-400/40 transition">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 mb-5 flex items-center justify-center">
        ✨
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{desc}</p>

      <button
        onClick={() => (window.location.href = link)}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:opacity-90 transition"
      >
        Open →
      </button>
    </div>
  );
}

export default Dashboard;