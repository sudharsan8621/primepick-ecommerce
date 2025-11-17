const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Create order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body
    
    // Populate product details for order items
    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.product)
      
      if (!product) {
        throw new Error(`Product not found: ${item.product}`)
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.title}`)
      }
      
      // Update product stock
      product.stock -= item.quantity
      product.sold += item.quantity
      await product.save()
      
      return {
        product: product._id,
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
        quantity: item.quantity
      }
    }))
    
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      orderStatus: 'processing',
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    })
    
    // Clear user's cart after order
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalAmount: 0 }
    )
    
    res.status(201).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message || 'Server error' })
  }
}

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort('-orderDate')
    
    res.json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product')
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    res.json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body
    
    const order = await Order.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    if (orderStatus) order.orderStatus = orderStatus
    if (paymentStatus) order.paymentStatus = paymentStatus
    
    await order.save()
    
    res.json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
}