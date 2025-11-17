import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart, FiHeart, FiStar, FiPlus, FiMinus } from 'react-icons/fi'
import { fetchProductById } from '../../redux/productSlice'
import { addToCart } from '../../redux/cartSlice'
import { createOrder } from '../../redux/orderSlice'
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlice'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { currentProduct: product, loading } = useSelector(state => state.products)
  const { isAuthenticated } = useSelector(state => state.auth)
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  const isInWishlist = wishlistItems.some(item => item._id === product?._id)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    dispatch(addToCart({ productId: product._id, quantity }))
  }

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    const orderData = {
      items: [{
        product: product._id,
        quantity: 1,
        price: product.price
      }],
      totalAmount: product.price
    }
    
    await dispatch(createOrder(orderData))
    navigate('/checkout')
  }

  const handleWishlistToggle = () => {
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

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading || !product) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images?.[selectedImage] || product.image} alt={product.title} />
          </div>
          {product.images?.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-detail">
          <p className="product-category-detail">{product.category}</p>
          <h1 className="product-title-detail">{product.title}</h1>
          
          <div className="product-rating-detail">
            {[...Array(5)].map((_, index) => (
              <FiStar 
                key={index} 
                className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
            <span>({product.rating} rating)</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-price-detail">
            <span className="current-price">₹{product.price?.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice?.toLocaleString()}</span>
            )}
            {product.discount && (
              <span className="discount">{product.discount}% OFF</span>
            )}
          </div>

          <div className="stock-info">
            <p className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          <div className="quantity-selector">
            <span>Quantity:</span>
            <div className="quantity-controls">
              <button onClick={decrementQuantity} disabled={quantity <= 1}>
                <FiMinus />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button onClick={incrementQuantity} disabled={quantity >= product.stock}>
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-detail" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button 
              className={`wishlist-btn-detail ${isInWishlist ? 'active' : ''}`}
              onClick={handleWishlistToggle}
            >
              <FiHeart />
            </button>
          </div>

          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              )) || (
                <>
                  <li>Premium Quality Product</li>
                  <li>100% Authentic</li>
                  <li>Fast Delivery</li>
                  <li>Easy Returns</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail