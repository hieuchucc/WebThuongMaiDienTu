import React from "react";

function PromoBanner() {
  return (
    <section className="container py-4">
      <div className="p-4 rounded bg-warning text-dark text-center shadow-sm">
        <h3 className="fw-bold">Khuyến mãi cuối tuần</h3>
        <p className="mb-0">Giảm đến 30% cho nhiều sản phẩm công nghệ hot.</p>
      </div>
    </section>
  );
}

export default PromoBanner;