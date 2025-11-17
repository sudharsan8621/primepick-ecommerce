const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Get user cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product')
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalAmount: 0
      })
    }
    
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    
    const product = await Product.findById(productId)
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' })
    }
    
    let cart = await Cart.findOne({ user: req.user._id })
    
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      })
    }
    
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }
    
    await cart.save()
    await cart.populate('items.product')
    
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' })
    }
    
    const cart = await Cart.findOne({ user: req.user._id })
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }
    
    const product = await Product.findById(productId)
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' })
    }
    
    cart.items[itemIndex].quantity = quantity
    
    await cart.save()
    await cart.populate('items.product')
    
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params
    
    const cart = await Cart.findOne({ user: req.user._id })
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    )
    
    await cart.save()
    await cart.populate('items.product')
    
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    
    cart.items = []
    cart.totalAmount = 0
    
    await cart.save()
    
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
}