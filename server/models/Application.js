const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userEmail: String,
  jobTitle: String,
  company: String,
  location: String,
  resume: String,
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Rejected"],
    default: "Applied",
  },
});

module.exports = mongoose.model("Application", applicationSchema);