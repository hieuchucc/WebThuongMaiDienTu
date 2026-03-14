const express = require("express");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

const router = express.Router();

// POST /api/payment/create
router.post("/create", async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    if (!orderId || !paymentMethod) {
      return res.status(400).json({ message: "Thiếu dữ liệu thanh toán" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    let paymentStatus = "PENDING";
    let paymentUrl = null;

    if (paymentMethod === "COD") {
      paymentStatus = "UNPAID";
    } else if (paymentMethod === "VNPAY") {
      paymentUrl = `https://sandbox.vnpayment.vn/mock-payment/${orderId}`;
    } else if (paymentMethod === "MOMO") {
      paymentUrl = `https://test-payment.momo.vn/mock-payment/${orderId}`;
    }

    const payment = await Payment.create({
      orderId,
      paymentMethod,
      amount: order.totalAmount,
      paymentStatus,
      paymentUrl
    });

    res.status(201).json({
      message: "Tạo thanh toán thành công",
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;