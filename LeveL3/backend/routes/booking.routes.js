const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings
} = require('../controllers/booking.controller');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// User Routes
router.post('/', verifyToken, createBooking);
router.get('/my', verifyToken, getUserBookings);

// Admin Route
router.get('/', verifyToken, isAdmin, getAllBookings);

module.exports = router;
