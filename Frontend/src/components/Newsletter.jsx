import React from "react";

function Newsletter() {
  return (
    <section className="container py-5">
      <div className="p-4 bg-light rounded shadow-sm text-center">
        <h3>Đăng ký nhận tin</h3>
        <p>Nhận thông báo khuyến mãi và sản phẩm mới sớm nhất.</p>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email của bạn"
              />
              <button className="btn btn-primary">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;