import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/admin/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, [API_URL]);

  if (user?.role !== "admin") {
    return <AccessDenied />;
  }

  const userPieData = [
    { name: "Students", value: stats.totalStudents || 0 },
    { name: "Companies", value: stats.totalCompanies || 0 },
    { name: "Admins", value: stats.totalAdmins || 0 },
  ];

  const applicationPieData = [
    { name: "Applied", value: stats.applied || 0 },
    { name: "Shortlisted", value: stats.shortlisted || 0 },
    { name: "Rejected", value: stats.rejected || 0 },
  ];

  const internshipPieData = [
    { name: "Approved", value: stats.approvedInternships || 0 },
    { name: "Pending", value: stats.pendingInternships || 0 },
  ];

  const colors = ["#3B82F6", "#8B5CF6", "#22C55E", "#EF4444", "#F59E0B"];

  const cards = [
    ["Total Users", stats.totalUsers, "👥"],
    ["Students", stats.totalStudents, "🎓"],
    ["Companies", stats.totalCompanies, "🏢"],
    ["Internships", stats.totalInternships, "💼"],
    ["Applications", stats.totalApplications, "📄"],
    ["Shortlisted", stats.shortlisted, "✅"],
  ];

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
            Analytics{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-400">
            Monitor users, internships, applications, and platform performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map(([title, value, icon], index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:-translate-y-1 hover:border-blue-400/40 transition"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl mb-5">
                {icon}
              </div>

              <h2 className="text-gray-400 mb-2">{title}</h2>
              <p className="text-4xl font-extrabold">{value ?? 0}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard title="User Distribution" data={userPieData} colors={colors} />
          <ChartCard title="Application Status" data={applicationPieData} colors={colors} />
          <ChartCard title="Internship Approval" data={internshipPieData} colors={colors} />
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, data, colors }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
      <h2 className="text-xl font-bold text-center mb-5">{title}</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={85}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="min-h-screen bg-[#070b16] text-white flex items-center justify-center p-8">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-red-400">Access Denied ❌</h1>
        <p className="text-gray-400 mt-2">Only admin can view analytics.</p>
      </div>
    </div>
  );
}

export default Analytics;