// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { createOrder } from '../../redux/orderSlice'
// import { clearCart } from '../../redux/cartSlice'
// import { FiCreditCard, FiTruck, FiCheckCircle } from 'react-icons/fi'
// import './Checkout.css'

// const Checkout = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { items, totalAmount } = useSelector(state => state.cart)
//   const { user } = useSelector(state => state.auth)
//   const { currentOrder, loading } = useSelector(state => state.orders)
  
//   const [formData, setFormData] = useState({
//     fullName: user?.name || '',
//     email: user?.email || '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     paymentMethod: 'card'
//   })
  
//   const [orderPlaced, setOrderPlaced] = useState(false)

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     const orderData = {
//       items: items.map(item => ({
//         product: item.product._id,
//         quantity: item.quantity,
//         price: item.product.price
//       })),
//       shippingAddress: {
//         fullName: formData.fullName,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode
//       },
//       paymentMethod: formData.paymentMethod,
//       totalAmount: Math.floor(totalAmount * 1.18)
//     }
    
//     await dispatch(createOrder(orderData))
//     dispatch(clearCart())
//     setOrderPlaced(true)
//   }

//   if (orderPlaced) {
//     return (
//       <div className="order-success">
//         <FiCheckCircle size={100} />
//         <h1>Order Placed Successfully!</h1>
//         <p>Your order has been placed and will be delivered soon.</p>
//         <p>Order ID: {currentOrder?._id}</p>
//         <button onClick={() => navigate('/profile')}>View Orders</button>
//         <button onClick={() => navigate('/products')}>Continue Shopping</button>
//       </div>
//     )
//   }

//   if (items.length === 0) {
//     return (
//       <div className="empty-checkout">
//         <h2>No items to checkout</h2>
//         <button onClick={() => navigate('/products')}>Continue Shopping</button>
//       </div>
//     )
//   }

//   return (
//     <div className="checkout-page">
//       <div className="checkout-container">
//         <h1>Checkout</h1>
        
//         <div className="checkout-content">
//           <div className="checkout-form">
//             <div className="form-section">
//               <h2><FiTruck /> Shipping Information</h2>
              
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Full Name</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Phone</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-group">
//                   <label>Address</label>
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     rows="3"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>City</label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>State</label>
//                     <input
//                       type="text"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Pincode</label>
//                     <input
//                       type="text"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-section">
//                   <h2><FiCreditCard /> Payment Method</h2>
                  
//                   <div className="payment-methods">
//                     <label className="payment-option">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="card"
//                         checked={formData.paymentMethod === 'card'}
//                         onChange={handleInputChange}
//                       />
//                       <span>Credit/Debit Card</span>
//                     </label>
                    
//                     <label className="payment-option">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="upi"
//                         checked={formData.paymentMethod === 'upi'}
//                         onChange={handleInputChange}
//                       />
//                       <span>UPI</span>
//                     </label>
                    
//                     <label className="payment-option">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="cod"
//                         checked={formData.paymentMethod === 'cod'}
//                         onChange={handleInputChange}
//                       />
//                       <span>Cash on Delivery</span>
//                     </label>
//                   </div>
//                 </div>
                
//                 <button type="submit" className="place-order-btn" disabled={loading}>
//                   {loading ? 'Processing...' : 'Place Order'}
//                 </button>
//               </form>
//             </div>
//           </div>
          
//           <div className="order-summary">
//             <h2>Order Summary</h2>
            
//             <div className="order-items">
//               {items.map(item => (
//                 <div key={item.product._id} className="order-item">
//                   <img src={item.product.image} alt={item.product.title} />
//                   <div className="item-info">
//                     <h4>{item.product.title}</h4>
//                     <p>Qty: {item.quantity}</p>
//                   </div>
//                   <p className="item-price">₹{(item.product.price * item.quantity).toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
            
//             <div className="summary-details">
//               <div className="summary-row">
//                 <span>Subtotal</span>
//                 <span>₹{totalAmount.toLocaleString()}</span>
//               </div>
              
//               <div className="summary-row">
//                 <span>Shipping</span>
//                 <span>FREE</span>
//               </div>
              
//               <div className="summary-row">
//                 <span>Tax (18%)</span>
//                 <span>₹{Math.floor(totalAmount * 0.18).toLocaleString()}</span>
//               </div>
              
//               <div className="summary-total">
//                 <span>Total</span>
//                 <span>₹{Math.floor(totalAmount * 1.18).toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Checkout
































import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../redux/orderSlice'
import { clearCart } from '../../redux/cartSlice'
import { FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalAmount } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.orders)
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const orderData = {
      items: items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress: {
        fullName: user?.name || 'Customer',
        phone: '9999999999',
        address: 'Default Address',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      paymentMethod: paymentMethod,
      totalAmount: Math.floor(totalAmount * 1.18)
    }
    
    await dispatch(createOrder(orderData))
    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="order-success">
        <FiCheckCircle size={100} />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase!</p>
        <p>Your order will be delivered within 5-7 business days.</p>
        <div className="success-buttons">
          <button onClick={() => navigate('/profile')} className="view-orders-btn">
            View Orders
          </button>
          <button onClick={() => navigate('/products')} className="continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>No items to checkout</h2>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
      </div>
    )
  }

  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  const tax = Math.floor(subtotal * 0.18)
  const total = subtotal + tax

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Quick Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h2><FiCreditCard /> Payment Method</h2>
                
                <div className="payment-methods">
                  <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>💳 Credit/Debit Card</span>
                  </label>
                  
                  <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>📱 UPI Payment</span>
                  </label>
                  
                  <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>💵 Cash on Delivery</span>
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="card-info">
                    <p className="demo-note">Demo Mode: No actual payment will be processed</p>
                  </div>
                )}
              </div>
              
              <button type="submit" className="place-order-btn" disabled={loading}>
                {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {items.map(item => (
                <div key={item.product._id} className="order-item">
                  <img src={item.product.image} alt={item.product.title} />
                  <div className="item-info">
                    <h4>{item.product.title}</h4>
                    <p>Qty: {item.quantity} × ₹{item.product.price.toLocaleString()}</p>
                  </div>
                  <p className="item-price">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free">FREE</span>
              </div>
              
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              
              <div className="summary-total">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <p>📦 Standard Delivery (5-7 days)</p>
              <p>📍 Delivered to your registered address</p>
              <p>📞 Contact support for any queries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout