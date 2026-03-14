const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    if (!userId || !productId || !rating || !comment) {
      return res.status(400).json({ message: "Thiếu dữ liệu đánh giá" });
    }

    const review = await Review.create({
      userId,
      productId,
      rating,
      comment
    });

    res.status(201).json({
      message: "Thêm đánh giá thành công",
      review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reviews/product/:productId
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
