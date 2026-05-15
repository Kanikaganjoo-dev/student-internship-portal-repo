const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, college } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      college,
    });

    res.json(user);
  } catch {
    res.status(500).json({ message: "Error registering" });
  }
};

// LOGIN (JWT)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ email: user.email }, "secretkey", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch {
    res.status(500).json({ message: "Error logging in" });
  }
};