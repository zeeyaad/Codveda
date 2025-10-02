const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/Products");
const { authMiddleware, adminMiddleware } = require("./middleware/auth");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", authRoutes);        // /signup, /login
app.use("/", profileRoutes);
app.use("/users", userRoutes);   // Users CRUD
app.use("/products", productRoutes); // Products CRUD

// Example protected route
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});

// Example admin-only route
app.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "This is admin-only data" });
});

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => console.error("❌ DB connection error:", err));
