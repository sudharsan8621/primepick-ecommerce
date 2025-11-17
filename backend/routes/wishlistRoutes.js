const express = require('express')
const router = express.Router()
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect) // All wishlist routes require authentication

router.route('/')
  .get(getWishlist)

router.post('/add', addToWishlist)
router.delete('/remove/:productId', removeFromWishlist)

module.exports = router