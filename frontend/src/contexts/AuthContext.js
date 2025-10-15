// --- File: frontend/src/contexts/AuthContext.js ---

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const API_URL = `${config.API_BASE_URL}/api/auth`;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          // Use your existing '/api/auth/profile' endpoint
          const response = await axios.get(`${API_URL}/profile`); 
          setUser(response.data.user); // The user object is in response.data.user
          setIsAuthenticated(true);
        } catch (error) {
          // If the token is invalid or expired, log the user out
          console.error('Failed to load user:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {/* Render children only when not loading to prevent race conditions */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };