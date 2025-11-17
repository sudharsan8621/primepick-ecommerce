import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi'
import { addToCart } from '../../redux/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlice'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  
  const isInWishlist = wishlistItems.some(item => item._id === product._id)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id))
    } else {
      dispatch(addToWishlist(product._id))
    }
  }

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
        >
          <FiHeart />
        </button>
      </div>
      
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <FiStar 
              key={index} 
              className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
            />
          ))}
          <span>({product.rating})</span>
        </div>
        
        <div className="product-footer">
          <p className="product-price">₹{product.price.toLocaleString()}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard














