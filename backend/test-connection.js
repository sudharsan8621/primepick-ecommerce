const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Collections in database:', collections.map(c => c.name));
    
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    console.log(`📊 Products in database: ${productCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();