import React, { useState } from "react";
import api from "../services/api";

const UpdateOrderStatusPage = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("CONFIRMED");
  const [message, setMessage] = useState("");

  const handleUpdateStatus = async () => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { status });
      setMessage(res.data.message || "Cập nhật trạng thái thành công");
    } catch (error) {
      setMessage(error.response?.data?.message || "Lỗi cập nhật trạng thái");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cập nhật trạng thái đơn hàng</h2>

      <div className="card p-4 shadow-sm">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nhập Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="SHIPPING">SHIPPING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button className="btn btn-warning" onClick={handleUpdateStatus}>
          Cập nhật
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default UpdateOrderStatusPage;