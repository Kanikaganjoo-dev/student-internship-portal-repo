const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalCompanies = await User.countDocuments({ role: "company" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalInternships = await Internship.countDocuments();
    const approvedInternships = await Internship.countDocuments({
      approved: true,
    });
    const pendingInternships = await Internship.countDocuments({
      approved: false,
    });

    const totalApplications = await Application.countDocuments();
    const applied = await Application.countDocuments({ status: "Applied" });
    const shortlisted = await Application.countDocuments({
      status: "Shortlisted",
    });
    const rejected = await Application.countDocuments({ status: "Rejected" });

    res.json({
      totalUsers,
      totalStudents,
      totalCompanies,
      totalAdmins,
      totalInternships,
      approvedInternships,
      pendingInternships,
      totalApplications,
      applied,
      shortlisted,
      rejected,
    });
  } catch (err) {
    console.log("ANALYTICS ERROR:", err);
    res.status(500).json({ message: "Error fetching analytics" });
  }
});

module.exports = router;