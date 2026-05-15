const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// Student applies
router.post("/", async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    console.log("APPLICATION ERROR:", err);
    res.status(500).json({ message: "Error applying" });
  }
});

// Student sees own applications
router.get("/student/:email", async (req, res) => {
  try {
    const applications = await Application.find({
      userEmail: req.params.email,
    });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

// Company sees applicants for its internships
router.get("/company/:companyEmail", async (req, res) => {
  try {
    const applications = await Application.find({
      company: req.params.companyEmail,
    });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching company applications" });
  }
});

// Company shortlists candidate
router.put("/shortlist/:id", async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "Shortlisted" },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error shortlisting candidate" });
  }
});

// Company rejects candidate
router.put("/reject/:id", async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error rejecting candidate" });
  }
});

module.exports = router;