const Wishlist = require('../models/Wishlist')
const Product = require('../models/Product')

// Get user wishlist
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products')
    
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: []
      })
    }
    
    res.json(wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body
    
    const product = await Product.findById(productId)
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    let wishlist = await Wishlist.findOne({ user: req.user._id })
    
    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: []
      })
    }
    
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId)
      await wishlist.save()
    }
    
    await wishlist.populate('products')
    
    res.json(wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params
    
    const wishlist = await Wishlist.findOne({ user: req.user._id })
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' })
    }
    
    wishlist.products = wishlist.products.filter(
      product => product.toString() !== productId
    )
    
    await wishlist.save()
    await wishlist.populate('products')
    
    res.json(wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
}