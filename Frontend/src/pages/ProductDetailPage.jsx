import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaEye, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  const [isWishlist, setIsWishlist] = useState(false);

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      {product.badge && (
        <span className="product-badge" style={{ background: product.badgeColor }}>
          {product.badge}
        </span>
      )}
      <div className="product-wishlist" onClick={() => setIsWishlist(!isWishlist)}>
        <FaHeart color={isWishlist ? "#f72585" : "#333"} />
      </div>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="btn-overlay">
            <FaEye />
          </button>
          <button className="btn-overlay">
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category || "Thời trang"}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="current-price">
            {product.price.toLocaleString()}đ
          </span>
          {product.oldPrice && (
            <span className="old-price">
              {product.oldPrice.toLocaleString()}đ
            </span>
          )}
        </div>
        <div className="product-rating">
          <div className="stars">
            {renderRating(product.rating)}
          </div>
          <span className="rating-count">({product.ratingCount})</span>
        </div>
        <div className="product-footer">
          <div className="product-sold">
            Đã bán: <span>{product.sold?.toLocaleString() || 0}</span>
          </div>
          <Link to={`/product/${product.id}`} className="btn-add-to-cart">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;