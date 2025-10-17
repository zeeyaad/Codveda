const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in backend/uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

module.exports = upload;
