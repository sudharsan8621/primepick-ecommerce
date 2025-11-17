// const mongoose = require('mongoose')
// const dotenv = require('dotenv')
// const Product = require('../models/Product')

// dotenv.config()

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// const products = [
//   {
//     title: "Premium Wireless Headphones",
//     description: "High-quality wireless headphones with noise cancellation and superior sound quality",
//     price: 4999,
//     originalPrice: 7999,
//     discount: 38,
//     category: "electronics",
//     image: "/src/assets/images/products/headphones.jpg",
//     images: ["/src/assets/images/products/headphones.jpg"],
//     rating: 4.5,
//     stock: 50,
//     brand: "AudioTech",
//     features: [
//       "Active Noise Cancellation",
//       "30-hour battery life",
//       "Premium sound quality",
//       "Comfortable fit"
//     ]
//   },
//   {
//     title: "Smartphone Pro Max",
//     description: "Latest flagship smartphone with advanced camera system and powerful processor",
//     price: 89999,
//     originalPrice: 99999,
//     discount: 10,
//     category: "electronics",
//     image: "/src/assets/images/products/smartphone.jpg",
//     images: ["/src/assets/images/products/smartphone.jpg"],
//     rating: 4.8,
//     stock: 30,
//     brand: "TechGiant",
//     features: [
//       "6.7-inch OLED display",
//       "Triple camera system",
//       "5G connectivity",
//       "All-day battery life"
//     ]
//   },
//   {
//     title: "Designer Leather Jacket",
//     description: "Premium leather jacket with modern design and superior craftsmanship",
//     price: 12999,
//     originalPrice: 18999,
//     discount: 32,
//     category: "fashion",
//     image: "/src/assets/images/products/jacket.jpg",
//     images: ["/src/assets/images/products/jacket.jpg"],
//     rating: 4.6,
//     stock: 20,
//     brand: "FashionElite",
//     features: [
//       "Genuine leather",
//       "Multiple pockets",
//       "Water-resistant",
//       "Classic fit"
//     ]
//   },
//   {
//     title: "Smart Watch Ultra",
//     description: "Advanced smartwatch with health monitoring and fitness tracking features",
//     price: 24999,
//     originalPrice: 29999,
//     discount: 17,
//     category: "electronics",
//     image: "/src/assets/images/products/smartwatch.jpg",
//     images: ["/src/assets/images/products/smartwatch.jpg"],
//     rating: 4.7,
//     stock: 40,
//     brand: "WearTech",
//     features: [
//       "Heart rate monitoring",
//       "GPS tracking",
//       "Water-proof design",
//       "7-day battery life"
//     ]
//   },
//   {
//     title: "Luxury Sofa Set",
//     description: "Comfortable and stylish 3-seater sofa set for modern homes",
//     price: 45999,
//     originalPrice: 59999,
//     discount: 23,
//     category: "home",
//     image: "/src/assets/images/products/sofa.jpg",
//     images: ["/src/assets/images/products/sofa.jpg"],
//     rating: 4.4,
//     stock: 10,
//     brand: "HomeLux",
//     features: [
//       "Premium fabric",
//       "Ergonomic design",
//       "Easy maintenance",
//       "5-year warranty"
//     ]
//   },
//   {
//     title: "Professional Camera",
//     description: "DSLR camera with 4K video recording and advanced photography features",
//     price: 67999,
//     originalPrice: 79999,
//     discount: 15,
//     category: "electronics",
//     image: "/src/assets/images/products/camera.jpg",
//     images: ["/src/assets/images/products/camera.jpg"],
//     rating: 4.9,
//     stock: 15,
//     brand: "PhotoPro",
//     features: [
//       "45MP sensor",
//       "4K video recording",
//       "Image stabilization",
//       "Wi-Fi connectivity"
//     ]
//   },
//   {
//     title: "Running Shoes Pro",
//     description: "High-performance running shoes with advanced cushioning technology",
//     price: 8999,
//     originalPrice: 11999,
//     discount: 25,
//     category: "sports",
//     image: "/src/assets/images/products/shoes.jpg",
//     images: ["/src/assets/images/products/shoes.jpg"],
//     rating: 4.5,
//     stock: 60,
//     brand: "SportMax",
//     features: [
//       "Advanced cushioning",
//       "Breathable mesh",
//       "Durable sole",
//       "Lightweight design"
//     ]
//   },
//   {
//     title: "Gaming Laptop Beast",
//     description: "High-end gaming laptop with RTX graphics and latest processor",
//     price: 124999,
//     originalPrice: 149999,
//     discount: 17,
//     category: "electronics",
//     image: "/src/assets/images/products/laptop.jpg",
//     images: ["/src/assets/images/products/laptop.jpg"],
//     rating: 4.7,
//     stock: 25,
//     brand: "GameTech",
//     features: [
//       "RTX 4080 graphics",
//       "32GB RAM",
//       "1TB SSD",
//       "144Hz display"
//     ]
//   },
//   {
//     title: "Bestseller Novel Collection",
//     description: "Collection of top 10 bestselling novels of the year",
//     price: 2999,
//     originalPrice: 3999,
//     discount: 25,
//     category: "books",
//     image: "/src/assets/images/products/books.jpg",
//     images: ["/src/assets/images/products/books.jpg"],
//     rating: 4.6,
//     stock: 100,
//     brand: "BookWorld",
//     features: [
//       "10 bestselling titles",
//       "Hardcover editions",
//       "Author signatures",
//       "Collector's edition"
//     ]
//   },
//   {
//     title: "Yoga Mat Premium",
//     description: "Non-slip yoga mat with extra cushioning for comfortable practice",
//     price: 1999,
//     originalPrice: 2499,
//     discount: 20,
//     category: "sports",
//     image: "/src/assets/images/products/yogamat.jpg",
//     images: ["/src/assets/images/products/yogamat.jpg"],
//     rating: 4.4,
//     stock: 80,
//     brand: "YogaLife",
//     features: [
//       "6mm thickness",
//       "Non-slip surface",
//       "Eco-friendly material",
//       "Carrying strap included"
//     ]
//   },
//   {
//     title: "Wireless Earbuds Pro",
//     description: "Premium wireless earbuds with superior sound and long battery life",
//     price: 9999,
//     originalPrice: 14999,
//     discount: 33,
//     category: "electronics",
//     image: "/src/assets/images/products/earbuds.jpg",
//     images: ["/src/assets/images/products/earbuds.jpg"],
//     rating: 4.5,
//     stock: 70,
//     brand: "SoundMax",
//     features: [
//       "Active noise cancellation",
//       "24-hour battery with case",
//       "IPX4 water resistance",
//       "Touch controls"
//     ]
//   },
//   {
//     title: "Designer Handbag",
//     description: "Luxury leather handbag with elegant design and spacious compartments",
//     price: 7999,
//     originalPrice: 10999,
//     discount: 27,
//     category: "fashion",
//     image: "/src/assets/images/products/handbag.jpg",
//     images: ["/src/assets/images/products/handbag.jpg"],
//     rating: 4.3,
//     stock: 35,
//     brand: "LuxuryStyle",
//     features: [
//       "Genuine leather",
//       "Multiple compartments",
//       "Adjustable strap",
//       "Designer finish"
//     ]
//   }
// ]

// const seedProducts = async () => {
//   try {
//     await Product.deleteMany({})
//     console.log('Products deleted')
    
//     await Product.insertMany(products)
//     console.log('Products added successfully')
    
//     process.exit()
//   } catch (error) {
//     console.error(`Error: ${error}`)
//     process.exit(1)
//   }
// }

// seedProducts()

























const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('../models/Product')

dotenv.config()

// Connect with options for Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('Connected to MongoDB Atlas')
}).catch(err => {
  console.error('MongoDB connection error:', err)
  process.exit(1)
})

const products = [
  {
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and superior sound quality",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.5,
    stock: 50,
    brand: "AudioTech",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium sound quality",
      "Comfortable fit"
    ]
  },
  {
    title: "Smartphone Pro Max",
    description: "Latest flagship smartphone with advanced camera system and powerful processor",
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    rating: 4.8,
    stock: 30,
    brand: "TechGiant"
  },
  {
    title: "Designer Leather Jacket",
    description: "Premium leather jacket with modern design and superior craftsmanship",
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    rating: 4.6,
    stock: 20,
    brand: "FashionElite"
  },
  {
    title: "Smart Watch Ultra",
    description: "Advanced smartwatch with health monitoring and fitness tracking features",
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.7,
    stock: 40,
    brand: "WearTech"
  },
  {
    title: "Running Shoes Pro",
    description: "High-performance running shoes with advanced cushioning technology",
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    category: "sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating: 4.5,
    stock: 60,
    brand: "SportMax"
  },
  {
    title: "Wireless Earbuds",
    description: "Premium wireless earbuds with superior sound and long battery life",
    price: 9999,
    originalPrice: 14999,
    discount: 33,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
    rating: 4.5,
    stock: 70,
    brand: "SoundMax"
  },
  {
    title: "Laptop Backpack",
    description: "Durable laptop backpack with multiple compartments",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.4,
    stock: 45,
    brand: "TravelPro"
  },
  {
    title: "Coffee Maker",
    description: "Automatic coffee maker with programmable features",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    category: "home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    rating: 4.6,
    stock: 25,
    brand: "BrewMaster"
  },
  {
    title: "Yoga Mat Premium",
    description: "Non-slip yoga mat with extra cushioning",
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    rating: 4.4,
    stock: 80,
    brand: "YogaLife"
  },
  {
    title: "Digital Camera",
    description: "Professional digital camera with 4K recording",
    price: 67999,
    originalPrice: 79999,
    discount: 15,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    rating: 4.9,
    stock: 15,
    brand: "PhotoPro"
  },
  {
    title: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    price: 12999,
    originalPrice: 16999,
    discount: 24,
    category: "home",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500",
    rating: 4.5,
    stock: 35,
    brand: "ComfortSeating"
  },
  {
    title: "Sunglasses Premium",
    description: "UV protection sunglasses with polarized lenses",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    rating: 4.3,
    stock: 55,
    brand: "SunStyle"
  }
]

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({})
    console.log('Existing products deleted')
    
    // Insert new products
    const createdProducts = await Product.insertMany(products)
    console.log(`${createdProducts.length} products added successfully`)
    
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

seedProducts()