const express = require("express");
const router = express.Router();
const Saved = require("../models/Saved");

router.post("/", async (req, res) => {
  try {
    const saved = await Saved.create(req.body);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error saving internship" });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const saved = await Saved.find({ userEmail: req.params.email });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved internships" });
  }
});

module.exports = router;