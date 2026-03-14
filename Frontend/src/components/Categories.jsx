import React from "react";

function Categories() {
  const categories = [
    "Điện thoại",
    "Laptop",
    "Tai nghe",
    "Bàn phím",
    "Chuột",
    "Phụ kiện",
  ];

  return (
    <div className="mb-4">
      <h3 className="mb-3">Danh mục nổi bật</h3>
      <div className="row">
        {categories.map((item, index) => (
          <div className="col-md-2 col-6 mb-3" key={index}>
            <div className="card text-center p-3 shadow-sm">
              <h6 className="mb-0">{item}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;