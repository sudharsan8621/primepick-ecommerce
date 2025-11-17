import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FiHome, FiShoppingBag, FiShoppingCart, FiUser, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { logout } from '../../redux/authSlice'
import { toggleTheme } from '../../redux/themeSlice'
import logo from '../../assets/images/logo.svg'
import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { totalItems } = useSelector(state => state.cart)
  const { isDarkMode } = useSelector(state => state.theme)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setMobileMenuOpen(false)
  }

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="PrimePick" />
        </Link>

        <div className="navbar-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
            <FiHome /> Home
          </Link>
          
          <Link to="/products" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
            <FiShoppingBag /> Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="navbar-link cart-link" onClick={() => setMobileMenuOpen(false)}>
                <FiShoppingCart /> Cart
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>

              <Link to="/profile" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                <FiUser /> Profile
              </Link>

              <button className="navbar-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}

          <button className="theme-toggle" onClick={handleThemeToggle}>
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar