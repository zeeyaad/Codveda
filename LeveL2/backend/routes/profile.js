const express = require("express");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");
const bcrypt = require("bcrypt");

const router = express.Router();

// ✅ Get current user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update current user profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
