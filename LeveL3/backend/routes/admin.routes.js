const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const AdminController = require("../controllers/admin.controller");

router.get("/dashboard", verifyToken, isAdmin, AdminController.getDashboardStats);

module.exports = router;
