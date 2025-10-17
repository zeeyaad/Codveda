const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Car = require('./car.model');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
});

User.hasMany(Booking);
Booking.belongsTo(User);
Car.hasMany(Booking);
Booking.belongsTo(Car);

module.exports = Booking;
