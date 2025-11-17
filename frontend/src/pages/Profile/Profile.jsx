import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiHeart, FiShoppingBag, FiLogOut, FiAlertCircle } from 'react-icons/fi'
import { fetchWishlist, removeFromWishlist } from '../../redux/wishlistSlice'
import { fetchUserOrders } from '../../redux/orderSlice'
import { logout } from '../../redux/authSlice'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Profile.css'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { user } = useSelector(state => state.auth)
  const { items: wishlistItems = [] } = useSelector(state => state.wishlist)
  const { orders = [], loading: ordersLoading, error: ordersError } = useSelector(state => state.orders)
  
  const [activeTab, setActiveTab] = useState('profile')
  
  useEffect(() => {
    // Fetch data with error handling
    const fetchData = async () => {
      try {
        await dispatch(fetchWishlist()).unwrap()
        await dispatch(fetchUserOrders()).unwrap()
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    fetchData()
  }, [dispatch])
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  
  const formatDate = (date) => {
    if (!date) return 'N/A'
    try {
      return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Invalid Date'
    }
  }
  
  // Ensure orders is an array
  const ordersList = Array.isArray(orders) ? orders : []
  const wishlist = Array.isArray(wishlistItems) ? wishlistItems : []
  
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <FiUser size={50} />
            </div>
            <h2>{user?.name || 'User'}</h2>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
          
          <nav className="profile-nav">
            <button
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser /> Profile Info
            </button>
            
            <button
              className={activeTab === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveTab('wishlist')}
            >
              <FiHeart /> Wishlist ({wishlist.length})
            </button>
            
            <button
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <FiShoppingBag /> Orders ({ordersList.length})
            </button>
            
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </nav>
        </div>
        
        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h1>Profile Information</h1>
              
              <div className="profile-details">
                <div className="detail-group">
                  <label>Full Name</label>
                  <p>{user?.name || 'Not provided'}</p>
                </div>
                
                <div className="detail-group">
                  <label>Email Address</label>
                  <p>{user?.email || 'Not provided'}</p>
                </div>
                
                <div className="detail-group">
                  <label>Member Since</label>
                  <p>{formatDate(user?.createdAt)}</p>
                </div>
                
                <div className="detail-group">
                  <label>Total Orders</label>
                  <p>{ordersList.length}</p>
                </div>
                
                <div className="detail-group">
                  <label>Wishlist Items</label>
                  <p>{wishlist.length}</p>
                </div>
              </div>
              
              <div className="profile-actions">
                <button className="edit-profile-btn">Edit Profile</button>
                <button className="change-password-btn">Change Password</button>
              </div>
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div className="wishlist-section">
              <h1>My Wishlist</h1>
              
              {wishlist.length === 0 ? (
                <div className="empty-wishlist">
                  <FiHeart size={80} />
                  <p>Your wishlist is empty</p>
                  <button onClick={() => navigate('/products')}>
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="wishlist-grid">
                  {wishlist.map(item => (
                    <ProductCard key={item._id} product={item} />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-section">
              <h1>My Orders</h1>
              
              {ordersError && (
                <div className="error-message">
                  <FiAlertCircle /> 
                  <span>Unable to load orders. Please try again later.</span>
                </div>
              )}
              
              {ordersLoading ? (
                <div className="loading-orders">
                  <p>Loading your orders...</p>
                </div>
              ) : ordersList.length === 0 ? (
                <div className="empty-orders">
                  <FiShoppingBag size={80} />
                  <p>You haven't placed any orders yet</p>
                  <button onClick={() => navigate('/products')}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {ordersList.map(order => (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <div>
                          <h3>Order #{order._id?.slice(-8).toUpperCase() || 'N/A'}</h3>
                          <p>{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="order-status">
                          <span className={`status ${order.orderStatus || 'processing'}`}>
                            {order.orderStatus || 'Processing'}
                          </span>
                        </div>
                      </div>
                      
                      {order.items && order.items.length > 0 && (
                        <div className="order-items">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              {item.product && (
                                <>
                                  <img 
                                    src={item.product.image || item.image || '/placeholder.jpg'} 
                                    alt={item.product.title || item.title || 'Product'} 
                                  />
                                  <div className="item-info">
                                    <h4>{item.product.title || item.title || 'Product Name'}</h4>
                                    <p>Qty: {item.quantity || 1} × ₹{(item.price || 0).toLocaleString()}</p>
                                  </div>
                                </>
                              )}
                              <p className="item-total">
                                ₹{((item.quantity || 1) * (item.price || 0)).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="order-footer">
                        <p className="order-total">
                          Total: ₹{(order.totalAmount || 0).toLocaleString()}
                        </p>
                        <button className="track-order-btn">
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile