require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const testDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fashion-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected:', conn.connection.host);

    // Create a test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    // Save the user
    await testUser.save();
    console.log('Test user created:', testUser);

    // Retrieve all users
    const users = await User.find({});
    console.log('All users in database:', users);

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testDB(); 