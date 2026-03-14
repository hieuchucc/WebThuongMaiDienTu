const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    if (!userId || !productId || !rating || !comment) {
      return res.status(400).json({
        message: "Thiếu dữ liệu đánh giá"
      });
    }

    const review = await Review.create({
      userId,
      productId,
      rating,
      comment
    });

    return res.status(201).json({
      message: "Thêm đánh giá thành công",
      review
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi thêm đánh giá",
      error: error.message
    });
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi lấy danh sách đánh giá",
      error: error.message
    });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct
};