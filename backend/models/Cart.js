const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  totalAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update totalAmount before saving
cartSchema.pre('save', async function(next) {
  await this.populate('items.product')
  
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
  
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('Cart', cartSchema)