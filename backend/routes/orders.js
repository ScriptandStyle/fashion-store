const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get all orders for a user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get single order
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.userId
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    console.log('=== Order Creation Request ===');
    console.log('User ID:', req.user.userId);
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Auth Token:', req.headers.authorization);

    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.user.userId;

    // Validate required fields
    if (!shippingAddress || !paymentMethod) {
      console.log('Missing required fields:', { shippingAddress, paymentMethod });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          shippingAddress: !shippingAddress ? 'Shipping address is required' : null,
          paymentMethod: !paymentMethod ? 'Payment method is required' : null
        }
      });
    }

    // Validate shipping address fields
    const requiredAddressFields = ['street', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredAddressFields.filter(field => !shippingAddress[field]);
    if (missingFields.length > 0) {
      console.log('Missing shipping address fields:', missingFields);
      return res.status(400).json({
        message: 'Invalid shipping address',
        details: `Missing fields: ${missingFields.join(', ')}`
      });
    }

    // Validate payment method
    const validPaymentMethods = ['credit_card', 'debit_card', 'upi', 'net_banking'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      console.log('Invalid payment method:', paymentMethod);
      return res.status(400).json({
        message: 'Invalid payment method',
        details: {
          paymentMethod: `Payment method must be one of: ${validPaymentMethods.join(', ')}`
        }
      });
    }

    // Get the user's cart
    console.log('Fetching cart for user:', userId);
    let cart;
    try {
      cart = await Cart.findOne({ userId });
      console.log('Cart query result:', cart ? {
        userId: cart.userId,
        itemCount: cart.items.length,
        total: cart.total,
        items: cart.items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size
        }))
      } : 'No cart found');
    } catch (error) {
      console.error('Error fetching cart:', error);
      console.error('Error stack:', error.stack);
      return res.status(500).json({ 
        message: 'Error fetching cart',
        error: error.message,
        stack: error.stack
      });
    }
    
    if (!cart) {
      console.log('Cart not found for user:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    if (!cart.items || cart.items.length === 0) {
      console.log('Cart is empty for user:', userId);
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate cart items
    const invalidItems = cart.items.filter(item => !item.productId || !item.name || !item.price || !item.quantity || !item.image || !item.size);
    if (invalidItems.length > 0) {
      console.error('Invalid cart items found:', invalidItems);
      return res.status(400).json({ 
        message: 'Invalid cart items',
        details: 'Some items in your cart are invalid'
      });
    }

    // Create the order with cart items
    const orderData = {
      userId,
      items: cart.items.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        size: item.size,
        quantity: item.quantity
      })),
      total: cart.total,
      shippingAddress,
      paymentMethod,
      status: 'pending'
    };

    console.log('Creating order with data:', JSON.stringify(orderData, null, 2));

    // Validate order data before creating
    if (!orderData.items || orderData.items.length === 0) {
      console.log('No items in order data');
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    if (!orderData.total || orderData.total <= 0) {
      console.log('Invalid total in order data:', orderData.total);
      return res.status(400).json({ message: 'Order total must be greater than 0' });
    }

    let order;
    try {
      order = new Order(orderData);
      console.log('Order instance created:', {
        userId: order.userId,
        itemCount: order.items.length,
        total: order.total
      });

      // Validate order before saving
      const validationError = order.validateSync();
      if (validationError) {
        console.error('Order validation error:', validationError);
        return res.status(400).json({
          message: 'Invalid order data',
          details: validationError.errors
        });
      }

      console.log('Saving order...');
      await order.save();
      console.log('Order saved successfully:', order._id);
    } catch (error) {
      console.error('Error creating/saving order:', error);
      console.error('Error stack:', error.stack);
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Validation error',
          details: error.errors
        });
      }
      throw error; // Re-throw to be caught by outer catch block
    }

    // Clear the cart after successful order creation
    try {
      console.log('Clearing cart...');
      cart.items = [];
      cart.total = 0;
      await cart.save();
      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
      console.error('Error stack:', error.stack);
      // Don't return error here, as order was already created
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('=== Order Creation Error ===');
    console.error('Error details:', error);
    console.error('Error stack:', error.stack);
    console.error('Request body:', req.body);
    console.error('User ID:', req.user.userId);
    console.error('Auth headers:', req.headers.authorization);
    
    // Check for specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        details: error.errors
      });
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate order detected'
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid data format',
        details: error.message
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating order',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Update order status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    console.log('=== Order Status Update Request ===');
    console.log('User ID:', req.user.userId);
    console.log('User Role:', req.user.role);
    console.log('Order ID:', req.params.id);
    console.log('Request Body:', req.body);

    // Check if user is admin
    if (req.user.role !== 'admin') {
      console.log('Unauthorized: User is not an admin');
      return res.status(403).json({ message: 'Not authorized to update order status' });
    }

    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      console.log('Invalid status:', status);
      return res.status(400).json({
        message: 'Invalid status',
        details: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Find and update the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      console.log('Order not found:', req.params.id);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Log the status change
    console.log('Updating order status:', {
      orderId: order._id,
      oldStatus: order.status,
      newStatus: status
    });

    // Update the status
    order.status = status;
    await order.save();

    console.log('Order status updated successfully');
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    console.error('Error stack:', error.stack);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        details: error.errors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid order ID format'
      });
    }

    res.status(500).json({ 
      message: 'Error updating order status',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router; 