const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), (req, res) => {
  res.json({
    message: "Resume uploaded successfully",
    file: req.file.filename,
  });
});

module.exports = router;