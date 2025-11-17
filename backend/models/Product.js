const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide product title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['electronics', 'fashion', 'home', 'books', 'sports', 'toys', 'beauty', 'food']
  },
  image: {
    type: String,
    required: [true, 'Please provide product image']
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0
  },
  features: [{
    type: String
  }],
  brand: {
    type: String
  },
  sold: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Index for search functionality
productSchema.index({ title: 'text', description: 'text', category: 'text' })

module.exports = mongoose.model('Product', productSchema)