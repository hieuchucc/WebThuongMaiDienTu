import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaHeart, FaBell } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar-modern ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <span className="logo-text">SHOP</span>
          <span className="logo-dot">.</span>
          <span className="logo-badge">VIP</span>
        </Link>

        <div className="nav-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Trang chủ
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>
            Sản phẩm
          </Link>
          <Link to="/categories" className="nav-link" onClick={() => setIsOpen(false)}>
            Danh mục
          </Link>
          <Link to="/orders" className="nav-link" onClick={() => setIsOpen(false)}>
            Đơn hàng
          </Link>
          <Link to="/flash-sale" className="nav-link flash-sale" onClick={() => setIsOpen(false)}>
            Flash Sale
            <span className="hot-badge">Hot</span>
          </Link>
        </div>

        <div className="nav-icons">
          <button className="nav-icon search-mobile" onClick={() => setIsOpen(!isOpen)}>
            <FaSearch />
          </button>
          <Link to="/wishlist" className="nav-icon">
            <FaHeart />
          </Link>
          <Link to="/notifications" className="nav-icon">
            <FaBell />
            <span className="badge">2</span>
          </Link>
          <Link to="/cart" className="nav-icon cart-icon">
            <FaShoppingCart />
            <span className="cart-badge">{cartCount}</span>
          </Link>
          <Link to="/account" className="nav-icon user-icon">
            <FaUser />
          </Link>
          <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;