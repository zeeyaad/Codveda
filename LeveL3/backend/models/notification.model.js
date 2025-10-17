const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  message: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, // "newCar" or "newBooking"
  recipientRole: { type: DataTypes.STRING, allowNull: false }, // "user" or "admin"
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Notification;
