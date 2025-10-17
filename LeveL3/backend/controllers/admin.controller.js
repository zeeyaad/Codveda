const { User, Car, Booking } = require("../models");
const { Sequelize } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalCars = await Car.count();
    const rentCars = await Car.count({ where: { availabilityType: "rent" } });
    const buyCars = await Car.count({ where: { availabilityType: "buy" } });
    const bothCars = await Car.count({ where: { availabilityType: "both" } });
    const totalBookings = await Booking.count();

    // Cars added per month (last 6 months)
    const carsPerMonth = await Car.findAll({
      attributes: [
        [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["month"],
      order: [[Sequelize.literal("month"), "ASC"]],
      limit: 6,
    });

    res.json({
      totalUsers,
      totalCars,
      rentCars,
      buyCars,
      bothCars,
      totalBookings,
      carsPerMonth,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
