const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Internship", internshipSchema);