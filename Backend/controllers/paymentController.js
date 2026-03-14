const Order = require("../models/Order");
const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    if (!orderId || !paymentMethod) {
      return res.status(400).json({
        message: "Thiếu dữ liệu thanh toán"
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng"
      });
    }

    let paymentStatus = "PENDING";
    let paymentUrl = null;

    if (paymentMethod === "COD") {
      paymentStatus = "UNPAID";
    } else if (paymentMethod === "VNPAY") {
      paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/mock-payment/${orderId}`;
    } else if (paymentMethod === "MOMO") {
      paymentUrl = `https://test-payment.momo.vn/mock-payment/${orderId}`;
    } else if (paymentMethod === "PAYPAL") {
      paymentUrl = `https://www.sandbox.paypal.com/mock-payment/${orderId}`;
    }

    const payment = await Payment.create({
      orderId,
      paymentMethod,
      amount: order.totalAmount,
      paymentStatus,
      paymentUrl
    });

    return res.status(201).json({
      message: "Tạo thanh toán thành công",
      payment
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi tạo thanh toán",
      error: error.message
    });
  }
};

module.exports = {
  createPayment
};