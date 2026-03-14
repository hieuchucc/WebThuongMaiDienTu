import React from "react";

function Benefits() {
  const benefits = [
    "Giao hàng nhanh",
    "Thanh toán an toàn",
    "Đổi trả dễ dàng",
    "Hỗ trợ 24/7",
  ];

  return (
    <section className="container py-4">
      <h2 className="mb-4 text-center">Lý do chọn chúng tôi</h2>
      <div className="row">
        {benefits.map((item, index) => (
          <div className="col-md-3 col-sm-6 mb-3" key={index}>
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body">
                <h5>{item}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;