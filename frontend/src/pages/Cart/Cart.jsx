// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
// import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../../redux/cartSlice'
// import './Cart.css'

// const Cart = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { items, totalAmount, loading } = useSelector(state => state.cart)

//   useEffect(() => {
//     dispatch(fetchCart())
//   }, [dispatch])

//   const handleQuantityChange = (productId, newQuantity) => {
//     if (newQuantity > 0) {
//       dispatch(updateCartItem({ productId, quantity: newQuantity }))
//     }
//   }

//   const handleRemoveItem = (productId) => {
//     dispatch(removeFromCart(productId))
//   }

//   const handleClearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart?')) {
//       dispatch(clearCart())
//     }
//   }

//   const handleCheckout = () => {
//     navigate('/checkout')
//   }

//   if (loading) {
//     return <div className="loading">Loading cart...</div>
//   }

//   if (items.length === 0) {
//     return (
//       <div className="empty-cart">
//         <FiShoppingBag size={100} />
//         <h2>Your cart is empty</h2>
//         <p>Add some products to your cart to see them here</p>
//         <button onClick={() => navigate('/products')}>Continue Shopping</button>
//       </div>
//     )
//   }

//   return (
//     <div className="cart-page">
//       <div className="cart-container">
//         <h1>Shopping Cart</h1>
        
//         <div className="cart-content">
//           <div className="cart-items">
//             {items.map(item => (
//               <div key={item.product._id} className="cart-item">
//                 <img src={item.product.image} alt={item.product.title} />
                
//                 <div className="item-details">
//                   <h3>{item.product.title}</h3>
//                   <p className="item-category">{item.product.category}</p>
//                   <p className="item-price">₹{item.product.price.toLocaleString()}</p>
//                 </div>
                
//                 <div className="quantity-controls">
//                   <button 
//                     onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
//                     disabled={item.quantity <= 1}
//                   >
//                     <FiMinus />
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button 
//                     onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
//                     disabled={item.quantity >= item.product.stock}
//                   >
//                     <FiPlus />
//                   </button>
//                 </div>
                
//                 <div className="item-total">
//                   <p>₹{(item.product.price * item.quantity).toLocaleString()}</p>
//                 </div>
                
//                 <button 
//                   className="remove-btn"
//                   onClick={() => handleRemoveItem(item.product._id)}
//                 >
//                   <FiTrash2 />
//                 </button>
//               </div>
//             ))}
            
//             <button className="clear-cart-btn" onClick={handleClearCart}>
//               Clear Cart
//             </button>
//           </div>
          
//           <div className="cart-summary">
//             <h2>Order Summary</h2>
            
//             <div className="summary-row">
//               <span>Subtotal</span>
//               <span>₹{totalAmount.toLocaleString()}</span>
//             </div>
            
//             <div className="summary-row">
//               <span>Shipping</span>
//               <span>FREE</span>
//             </div>
            
//             <div className="summary-row">
//               <span>Tax</span>
//               <span>₹{Math.floor(totalAmount * 0.18).toLocaleString()}</span>
//             </div>
            
//             <div className="summary-total">
//               <span>Total</span>
//               <span>₹{Math.floor(totalAmount * 1.18).toLocaleString()}</span>
//             </div>
            
//             <button className="checkout-btn" onClick={handleCheckout}>
//               Proceed to Checkout
//             </button>
            
//             <button className="continue-shopping" onClick={() => navigate('/products')}>
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart





























import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../../redux/cartSlice'
import './Cart.css'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalAmount, loading } = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleQuantityChange = (productId, newQuantity, maxStock) => {
    if (newQuantity > 0 && newQuantity <= maxStock) {
      dispatch(updateCartItem({ productId, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart())
    }
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (loading) {
    return <div className="loading">Loading cart...</div>
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={100} />
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here</p>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
      </div>
    )
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const subtotal = calculateTotal()
  const tax = Math.floor(subtotal * 0.18)
  const total = subtotal + tax

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.product._id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.product.image} alt={item.product.title} />
                </div>
                
                <div className="item-details">
                  <h3>{item.product.title}</h3>
                  <p className="item-category">{item.product.category}</p>
                  <p className="item-price">₹{item.product.price.toLocaleString()}</p>
                  {item.product.stock < 10 && (
                    <p className="stock-warning">Only {item.product.stock} left in stock</p>
                  )}
                </div>
                
                <div className="quantity-section">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn minus"
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1, item.product.stock)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="quantity-btn plus"
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1, item.product.stock)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  <p className="total-label">Total</p>
                  <p className="total-price">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.product._id)}
                  title="Remove from cart"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
            
            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
              <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
            </div>
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              
              <div className="summary-total">
                <span>Order Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            
            <div className="payment-methods">
              <p>We Accept</p>
              <div className="payment-icons">
                <span>💳</span>
                <span>📱</span>
                <span>💵</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart