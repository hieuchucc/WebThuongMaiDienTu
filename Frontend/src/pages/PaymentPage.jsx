import React, { useState } from "react";
import api from "../services/api";

const PaymentPage = () => {
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentResult, setPaymentResult] = useState(null);

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/payment/create", {
        orderId,
        paymentMethod,
      });
      setPaymentResult(res.data.payment);
    } catch (error) {
      console.error(error);
      alert("Lỗi tạo thanh toán");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tạo thanh toán</h2>

      <form onSubmit={handleCreatePayment} className="card p-4 shadow-sm">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nhập Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">COD</option>
          <option value="VNPAY">VNPAY</option>
          <option value="MOMO">MOMO</option>
        </select>

        <button className="btn btn-success">Tạo thanh toán</button>
      </form>

      {paymentResult && (
        <div className="card mt-3 p-3">
          <p><strong>Payment ID:</strong> {paymentResult._id}</p>
          <p><strong>Phương thức:</strong> {paymentResult.paymentMethod}</p>
          <p><strong>Số tiền:</strong> {paymentResult.amount}</p>
          <p><strong>Trạng thái:</strong> {paymentResult.paymentStatus}</p>
          {paymentResult.paymentUrl && (
            <p>
              <strong>Link thanh toán:</strong>{" "}
              <a href={paymentResult.paymentUrl} target="_blank" rel="noreferrer">
                Mở thanh toán
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;