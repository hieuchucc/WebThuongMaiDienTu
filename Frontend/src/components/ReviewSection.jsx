import React, { useEffect, useState } from "react";
import api from "../services/api";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    rating: 5,
    comment: "",
  });

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/product/${productId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Lỗi lấy review:", error);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reviews", {
        ...formData,
        productId,
      });
      setFormData({
        userId: "",
        rating: 5,
        comment: "",
      });
      fetchReviews();
    } catch (error) {
      console.error(error);
      alert("Lỗi gửi đánh giá");
    }
  };

  return (
    <div className="card p-4 shadow-sm mt-4">
      <h4>Đánh giá sản phẩm</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="User ID"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        />

        <select
          className="form-select mb-2"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
        >
          <option value={1}>1 sao</option>
          <option value={2}>2 sao</option>
          <option value={3}>3 sao</option>
          <option value={4}>4 sao</option>
          <option value={5}>5 sao</option>
        </select>

        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Nhập bình luận"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        />

        <button className="btn btn-primary">Gửi đánh giá</button>
      </form>

      <hr />

      {reviews.length === 0 ? (
        <p>Chưa có đánh giá nào.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border rounded p-2 mb-2">
            <p className="mb-1"><strong>User:</strong> {review.userId}</p>
            <p className="mb-1"><strong>Rating:</strong> {review.rating} ⭐</p>
            <p className="mb-0"><strong>Comment:</strong> {review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;