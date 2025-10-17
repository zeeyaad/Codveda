const { cloudinary } = require("../config/cloudinary");
const Notification = require("../models/notification.model");
const Car = require("../models/car.model");
const { Sequelize } = require("sequelize");

exports.createCar = async (req, res) => {
  try {
    const { brand, model, price, availabilityType } = req.body;
    const imageUrls = req.files ? req.files.map((f) => f.path) : [];
    const car = await Car.create({ brand, model, price, availabilityType, images: imageUrls });

    const io = req.app.get("io");
    io.emit("newCar", { brand, model });
    io.emit("updateDashboard", { type: "car" }); // 👈 notify dashboard

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const { search, type, minPrice, maxPrice, sort, page, limit } = req.query;

    const where = {};
    const order = [];
    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 6;
    const offset = (pageNum - 1) * pageSize;

    // 🔍 Search filter
    if (search) {
      where[Sequelize.Op.or] = [
        { brand: { [Sequelize.Op.iLike]: `%${search}%` } },
        { model: { [Sequelize.Op.iLike]: `%${search}%` } },
      ];
    }

    // 🚗 Type filter
    if (type) where.type = type;

    // 💰 Price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Sequelize.Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Sequelize.Op.lte] = parseFloat(maxPrice);
    }

    // ↕️ Sorting
    if (sort === "price_asc") order.push(["price", "ASC"]);
    else if (sort === "price_desc") order.push(["price", "DESC"]);
    else order.push(["createdAt", "DESC"]); // default: newest first

    // ⚡ Query with pagination
    const { count, rows: cars } = await Car.findAndCountAll({
      where,
      order,
      offset,
      limit: pageSize,
    });

    res.json({
      cars,
      totalPages: Math.ceil(count / pageSize),
      currentPage: pageNum,
      totalCars: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    await car.update(req.body);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // 🧹 delete image from Cloudinary if exists
    if (car.image) {
      // extract public ID from URL: e.g. ".../car_images/abc123.jpg"
      const publicId = car.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`car_images/${publicId}`);
    }

    await car.destroy();
    res.json({ message: "Car and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
