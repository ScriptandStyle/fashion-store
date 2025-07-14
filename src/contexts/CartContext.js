import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch cart when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    } else {
      setCart(null);
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCart(response.data);
      setError(null);
    } catch (error) {
      console.error('Fetch cart error:', error);
      if (error.response?.status === 401) {
        setError('Please log in to view your cart');
      } else {
        setError('Error fetching cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    if (!isAuthenticated || !token) {
      return {
        success: false,
        message: 'Please log in to add items to cart'
      };
    }

    try {
      const response = await axios.post('/api/cart', item);
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (error) {
      console.error('Add to cart error:', error);
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Please log in to add items to cart'
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Error adding item to cart'
      };
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated || !token) {
      return {
        success: false,
        message: 'Please log in to remove items from cart'
      };
    }

    try {
      const response = await axios.delete(`/api/cart/${itemId}`);
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (error) {
      console.error('Remove from cart error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error removing item from cart'
      };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!isAuthenticated || !token) {
      return {
        success: false,
        message: 'Please log in to update cart'
      };
    }

    try {
      const response = await axios.put(`/api/cart/${itemId}`, { quantity });
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (error) {
      console.error('Update quantity error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error updating quantity'
      };
    }
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount: cart?.items?.length || 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 