const jwt = require("jsonwebtoken");
const SECRET = "my_jwt_secret";

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };
