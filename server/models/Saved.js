const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  userEmail: String,
  title: String,
  company: String,
  location: String,
});

module.exports = mongoose.model("Saved", savedSchema);