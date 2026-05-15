const express = require("express");
const router = express.Router();
const axios = require("axios");
const Internship = require("../models/Internship");

// Company posts internship
router.post("/", async (req, res) => {
  try {
    const { title, company, location } = req.body;

    const internship = await Internship.create({
      title,
      company,
      location,
      approved: false,
    });

    res.status(201).json(internship);
  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ message: "Error posting internship" });
  }
});

// Students see approved internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find({ approved: true });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: "Error fetching internships" });
  }
});

// Admin sees pending internships
router.get("/pending", async (req, res) => {
  try {
    const internships = await Internship.find({ approved: false });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending internships" });
  }
});

// Company sees own posts
router.get("/company/:email", async (req, res) => {
  try {
    const jobs = await Internship.find({ company: req.params.email });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching company posts" });
  }
});

// Admin approves internship
router.put("/approve/:id", async (req, res) => {
  try {
    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error approving internship" });
  }
});

// Admin rejects internship
router.delete("/reject/:id", async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship rejected and deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting internship" });
  }
});

// External API internships
router.get("/external", async (req, res) => {
  try {
    const search = req.query.search || "internship";
    const location = req.query.location || "India";

    const response = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/in/search/1",
      {
        params: {
          app_id: process.env.JOBS_APP_ID,
          app_key: process.env.JOBS_API_KEY,
          what: search,
          where: location,
          results_per_page: 10,
        },
      }
    );

    const jobs = response.data.results.map((job) => ({
      title: job.title,
      company: job.company?.display_name || "Unknown",
      location: job.location?.display_name || "Unknown",
      redirect_url: job.redirect_url,
    }));

    res.json(jobs);
  } catch (err) {
    console.log("EXTERNAL API ERROR:", err.response?.status || err.message);

    if (err.response?.status === 429) {
      return res.status(429).json({
        message: "Too many API requests. Please try again later.",
      });
    }

    res.status(500).json({ message: "External API failed" });
  }
});

module.exports = router;