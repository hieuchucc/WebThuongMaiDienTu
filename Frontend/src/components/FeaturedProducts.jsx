import React from "react";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const products = [
    { id: 1, name: "iPhone 15", price: "22.990.000đ", image: "https://via.placeholder.com/300x220" },
    { id: 2, name: "Laptop Gaming", price: "25.500.000đ", image: "https://via.placeholder.com/300x220" },
    { id: 3, name: "Tai nghe Bluetooth", price: "1.290.000đ", image: "https://via.placeholder.com/300x220" },
    { id: 4, name: "Bàn phím cơ", price: "990.000đ", image: "https://via.placeholder.com/300x220" },
  ];

  return (
    <section className="container py-4">
      <h2 className="mb-4 text-center">Sản phẩm nổi bật</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 col-sm-6 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-danger fw-bold">{product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;