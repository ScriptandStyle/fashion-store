const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Product ID is required']
  },
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  size: {
    type: String,
    required: [true, 'Size is required']
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  items: {
    type: [cartItemSchema],
    default: []
  },
  total: {
    type: Number,
    default: 0,
    min: [0, 'Total cannot be negative']
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update total before saving
cartSchema.pre('save', function(next) {
  try {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Validate items before saving
cartSchema.pre('save', function(next) {
  if (!Array.isArray(this.items)) {
    return next(new Error('Items must be an array'));
  }
  next();
});

module.exports = mongoose.model('Cart', cartSchema); 