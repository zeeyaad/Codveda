const express = require("express");
const Product = require("../models/Product");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

// ✅ Public: Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Public: Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create product (Admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await Product.create({ name, description, price, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update product (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock ?? product.stock;

    await product.save();
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete product (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
