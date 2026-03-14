import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaypal,
  FaCcVisa, FaCcMastercard, FaCcAmex, FaGooglePay
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-modern">
      <div className="footer-newsletter">
        <div className="footer-container">
          <div className="newsletter-content">
            <h3>Đăng ký nhận tin</h3>
            <p>Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Nhập email của bạn..." />
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-title">Về chúng tôi</h3>
              <p className="footer-description">
                SHOP tự hào là nền tảng thương mại điện tử hàng đầu, 
                cung cấp sản phẩm chất lượng với giá cả cạnh tranh và 
                dịch vụ khách hàng xuất sắc.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link"><FaFacebook /></a>
                <a href="#" className="social-link"><FaTwitter /></a>
                <a href="#" className="social-link"><FaInstagram /></a>
                <a href="#" className="social-link"><FaYoutube /></a>
              </div>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Liên kết nhanh</h3>
              <ul className="footer-links">
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/products">Sản phẩm</Link></li>
                <li><Link to="/about">Giới thiệu</Link></li>
                <li><Link to="/contact">Liên hệ</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Hỗ trợ khách hàng</h3>
              <ul className="footer-links">
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">Chính sách vận chuyển</Link></li>
                <li><Link to="/returns">Chính sách đổi trả</Link></li>
                <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                <li><Link to="/terms">Điều khoản sử dụng</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Liên hệ</h3>
              <ul className="footer-contact">
                <li><FaMapMarkerAlt /> 123 Đường ABC, Quận XYZ, TP.HCM</li>
                <li><FaPhone /> 0123 456 789</li>
                <li><FaEnvelope /> support@shop.com</li>
              </ul>
              <div className="payment-methods">
                <h4>Chấp nhận thanh toán</h4>
                <div className="payment-icons">
                  <FaCcVisa />
                  <FaCcMastercard />
                  <FaCcAmex />
                  <FaPaypal />
                  <FaGooglePay />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; {currentYear} SHOP. Tất cả quyền được bảo lưu.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Chính sách bảo mật</Link>
            <Link to="/terms">Điều khoản</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;