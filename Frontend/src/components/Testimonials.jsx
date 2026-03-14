import React from "react";

function Testimonials() {
  const reviews = [
    { name: "Nguyễn Văn A", comment: "Sản phẩm tốt, giao hàng nhanh." },
    { name: "Trần Thị B", comment: "Giao diện dễ dùng, đặt hàng tiện." },
    { name: "Lê Văn C", comment: "Hỗ trợ khách hàng rất nhiệt tình." },
  ];

  return (
    <section className="container py-4">
      <h2 className="mb-4 text-center">Khách hàng nói gì</h2>
      <div className="row">
        {reviews.map((review, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <p>"{review.comment}"</p>
                <h6 className="mt-3 mb-0 text-primary">{review.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;