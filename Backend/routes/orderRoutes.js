const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");

const router = express.Router();

// POST /api/orders - tạo đơn hàng
router.post("/", async (req, res) => {
  try {
    const { userId, shippingAddress, phone, paymentMethod, items } = req.body;

    if (!userId || !shippingAddress || !phone || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Thiếu dữ liệu tạo đơn hàng" });
    }

    const formattedItems = items.map((item) => {
      const quantity = Number(item.quantity);
      const price = Number(item.price);

      return {
        productId: item.productId,
        productName: item.productName,
        quantity,
        price,
        subtotal: quantity * price
      };
    });

    const totalAmount = formattedItems.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await Order.create({
      userId,
      shippingAddress,
      phone,
      paymentMethod,
      items: formattedItems,
      totalAmount
    });

    res.status(201).json({
      message: "Tạo đơn hàng thành công",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders?userId=...
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/user/:userId
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id đơn hàng không hợp lệ" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/orders/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatus = ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED", "CANCELLED"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.status(200).json({
      message: "Cập nhật trạng thái thành công",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



