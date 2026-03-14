import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (!order) return <div className="container mt-4">Đang tải...</div>;

  return (
    <div className="container mt-4">
      <h2>Chi tiết đơn hàng</h2>

      <div className="card p-4 shadow-sm">
        <p><strong>Mã đơn:</strong> {order._id}</p>
        <p><strong>User ID:</strong> {order.userId}</p>
        <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
        <p><strong>SĐT:</strong> {order.phone}</p>
        <p><strong>Thanh toán:</strong> {order.paymentMethod}</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
        <p><strong>Tổng tiền:</strong> {order.totalAmount}</p>

        <h5 className="mt-3">Sản phẩm</h5>
        {order.items.map((item, index) => (
          <div key={index} className="border rounded p-2 mb-2">
            <p><strong>Tên:</strong> {item.productName}</p>
            <p><strong>Số lượng:</strong> {item.quantity}</p>
            <p><strong>Giá:</strong> {item.price}</p>
            <p><strong>Tạm tính:</strong> {item.subtotal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailPage;