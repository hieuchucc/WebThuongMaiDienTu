import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const OrderHistoryPage = () => {
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/orders?userId=${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
      alert("Lỗi lấy danh sách đơn hàng");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lịch sử đơn hàng</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchOrders}>
          Xem đơn hàng
        </button>
      </div>

      <div className="row">
        {orders.map((order) => (
          <div className="col-md-6 mb-3" key={order._id}>
            <div className="card p-3 shadow-sm">
              <p><strong>Mã đơn:</strong> {order._id}</p>
              <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
              <p><strong>Tổng tiền:</strong> {order.totalAmount}</p>
              <p><strong>Trạng thái:</strong> {order.status}</p>
              <Link to={`/orders/${order._id}`} className="btn btn-outline-primary btn-sm">
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;