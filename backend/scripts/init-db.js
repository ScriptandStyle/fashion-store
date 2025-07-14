require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

const initDB = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fashion-store';
    console.log('Connecting to MongoDB:', MONGODB_URI);
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected Successfully');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    await testUser.save();
    console.log('Test user created:', {
      id: testUser._id,
      name: testUser.name,
      email: testUser.email
    });

    // Create test product
    const testProduct = new Product({
      title: 'Test Product',
      price: 999,
      description: 'This is a test product',
      category: 'men',
      subcategory: 'shirts',
      brand: 'Test Brand',
      image: 'https://example.com/test.jpg',
      sizes: ['S', 'M', 'L'],
      availableSizes: ['S', 'M', 'L'],
      material: 'Cotton',
      care: 'Machine wash cold',
      stock: 100
    });
    await testProduct.save();
    console.log('Test product created:', {
      id: testProduct._id,
      title: testProduct.title,
      price: testProduct.price
    });

    // Verify data
    const users = await User.find({});
    const products = await Product.find({});
    
    console.log('\nDatabase Status:');
    console.log('Users:', users.length);
    console.log('Products:', products.length);
    
    // List all collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('\nAvailable Collections:', collections.map(c => c.name));

    // Close connection
    await mongoose.connection.close();
    console.log('\nDatabase initialization completed successfully');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDB(); 