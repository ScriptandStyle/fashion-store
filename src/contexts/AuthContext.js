import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create auth context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:5001';
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    // Check for stored token
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  // Verify stored token
  const verifyToken = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });

      const { success, token, user, message } = response.data;
      
      if (success && token && user) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        return { success: true, message };
      }
      
      throw new Error(message || 'Registration failed');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError({ message: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      const { success, token, user, message } = response.data;
      
      if (success && token && user) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        return { success: true, message };
      }
      
      throw new Error(message || 'Login failed');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError({ message: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };


  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    token: localStorage.getItem('token'),
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 