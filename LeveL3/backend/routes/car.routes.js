const express = require("express");
const router = express.Router();
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} = require("../controllers/car.controller");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Public
router.get("/", getCars);
router.get("/:id", getCarById);

// Admin only
router.post("/", verifyToken, isAdmin, upload.array("images", 11), createCar);
router.put("/:id", verifyToken, isAdmin, upload.single("image"), updateCar);
router.delete("/:id", verifyToken, isAdmin, deleteCar);

module.exports = router;
