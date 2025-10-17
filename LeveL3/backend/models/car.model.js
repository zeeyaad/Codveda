const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Car = sequelize.define("Car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
  type: { type: DataTypes.STRING }, // keep this for backward compatibility
  description: { type: DataTypes.TEXT },
  images: { type: DataTypes.ARRAY(DataTypes.STRING) },
  availabilityType: { // 👈 new field
    type: DataTypes.ENUM("rent", "buy", "both"),
    allowNull: false,
    defaultValue: "both",
  },
});


module.exports = Car;
