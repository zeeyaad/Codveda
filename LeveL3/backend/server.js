const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const carRoutes = require("./routes/car.routes");
const bookingRoutes = require("./routes/booking.routes");
const notificationRoutes = require("./routes/notification.routes");
const adminRoutes = require("./routes/admin.routes");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ---- Socket authentication + role joining ----
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // frontend sends its JWT token right after connecting
  socket.on("registerRole", (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const role = decoded.role || "user";

      socket.join(role); // join "admin" or "user" room
      console.log(`✅ ${role} joined the ${role} room`);
    } catch (err) {
      console.error("❌ Invalid token for socket registration");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});

// Make io accessible in routes
app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));


sequelize.sync({ alter: true }).then(() => console.log("✅ Database Synced"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚗 Server running on port ${PORT}`));
