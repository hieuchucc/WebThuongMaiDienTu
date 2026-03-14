import React, { useState } from "react";
import api from "../services/api";

const OrderPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    shippingAddress: "",
    phone: "",
    paymentMethod: "COD",
    items: [
      {
        productId: "",
        productName: "",
        quantity: 1,
        price: 0,
      },
    ],
  });

  const [message, setMessage] = useState("");
  const [createdOrder, setCreatedOrder] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...formData.items];
    updatedItems[index][e.target.name] =
      e.target.name === "quantity" || e.target.name === "price"
        ? Number(e.target.value)
        : e.target.value;

    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { productId: "", productName: "", quantity: 1, price: 0 },
      ],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/orders", formData);
      setMessage("Tạo đơn hàng thành công");
      setCreatedOrder(res.data.order);
    } catch (error) {
      setMessage(error.response?.data?.message || "Lỗi tạo đơn hàng");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tạo đơn hàng</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          className="form-control mb-3"
          value={formData.userId}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="shippingAddress"
          placeholder="Địa chỉ giao hàng"
          className="form-control mb-3"
          value={formData.shippingAddress}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          className="form-control mb-3"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <select
          name="paymentMethod"
          className="form-select mb-3"
          value={formData.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="COD">COD</option>
          <option value="VNPAY">VNPAY</option>
          <option value="MOMO">MOMO</option>
        </select>

        <h5>Sản phẩm</h5>

        {formData.items.map((item, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <input
              type="text"
              name="productId"
              placeholder="Product ID"
              className="form-control mb-2"
              value={item.productId}
              onChange={(e) => handleItemChange(index, e)}
            />

            <input
              type="text"
              name="productName"
              placeholder="Tên sản phẩm"
              className="form-control mb-2"
              value={item.productName}
              onChange={(e) => handleItemChange(index, e)}
            />

            <input
              type="number"
              name="quantity"
              placeholder="Số lượng"
              className="form-control mb-2"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
            />

            <input
              type="number"
              name="price"
              placeholder="Giá"
              className="form-control mb-2"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
            />

            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeItem(index)}
            >
              Xóa sản phẩm
            </button>
          </div>
        ))}

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-secondary" onClick={addItem}>
            + Thêm sản phẩm
          </button>
          <button type="submit" className="btn btn-success">
            Đặt hàng
          </button>
        </div>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      {createdOrder && (
        <div className="card mt-3 p-3">
          <h5>Đơn hàng vừa tạo</h5>
          <p><strong>Mã đơn:</strong> {createdOrder._id}</p>
          <p><strong>Tổng tiền:</strong> {createdOrder.totalAmount}</p>
          <p><strong>Trạng thái:</strong> {createdOrder.status}</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;