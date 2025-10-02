const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const router = express.Router();


// ✅ Get all users (Admin only)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] } // hide password hashes
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get one user (only self or admin)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id != id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Update user (self or admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id != id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { username, password, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role && req.user.role === "admin") user.role = role; // only admin can change role

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Delete user (self or admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id != id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
