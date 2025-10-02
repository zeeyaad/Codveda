// db.js
const { Sequelize } = require("sequelize");

// Use SQLite for local development to avoid external DB setup
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite",
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Error:", err));

module.exports = sequelize;
