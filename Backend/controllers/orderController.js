const mongoose = require("mongoose");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, phone, paymentMethod, items } = req.body;

    if (!userId || !shippingAddress || !phone || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Thiếu dữ liệu tạo đơn hàng"
      });
    }

    const normalizedItems = items.map((item) => {
      const quantity = Number(item.quantity);
      const price = Number(item.price);
      const subtotal = quantity * price;

      return {
        productId: item.productId,
        productName: item.productName,
        quantity,
        price,
        subtotal
      };
    });

    const totalAmount = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await Order.create({
      userId,
      shippingAddress,
      phone,
      paymentMethod,
      items: normalizedItems,
      totalAmount
    });

    return res.status(201).json({
      message: "Tạo đơn hàng thành công",
      order
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi tạo đơn hàng",
      error: error.message
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        message: "Thiếu userId"
      });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi lấy danh sách đơn hàng",
      error: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Id đơn hàng không hợp lệ"
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng"
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi lấy chi tiết đơn hàng",
      error: error.message
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED", "CANCELLED"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Trạng thái đơn hàng không hợp lệ"
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng"
      });
    }

    return res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công",
      order: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi cập nhật trạng thái đơn hàng",
      error: error.message
    });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi lấy đơn hàng theo user",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUserId
};