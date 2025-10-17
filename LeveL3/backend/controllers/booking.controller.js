const Booking = require('../models/booking.model');
const Car = require('../models/car.model');
const Notification = require('../models/notification.model');

exports.createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const booking = await Booking.create({
      UserId: req.user.id,
      CarId: carId,
      startDate,
      endDate,
    });

    const io = req.app.get("io");

    // Save notification in DB
    const notif = await Notification.create({
      message: `📦 Car ID ${carId} booked by User ID ${req.user.id}`,
      type: "newBooking",
      recipientRole: "admin",
    });

    // Emit only to admins
    io.to("admin").emit("newBooking", notif);
    io.emit("updateDashboard", { type: "booking" });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { UserId: req.user.id },
      include: Car,
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ include: Car });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
