import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About PrimePick</h3>
          <p>Your trusted online shopping destination for quality products at the best prices.</p>
          <div className="social-links">
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <Link to="/products?category=electronics">Electronics</Link>
          <Link to="/products?category=fashion">Fashion</Link>
          <Link to="/products?category=home">Home & Living</Link>
          <Link to="/products?category=books">Books</Link>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FiMail /> support@primepick.com</p>
          <p><FiPhone /> +91 1234567890</p>
          <p><FiMapPin /> Mumbai, India</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 PrimePick. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
