import React, { createContext, useContext, useState } from 'react';
import { loginUser, registerUser, logoutUser } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      setToken(data.token);
      // Save token to localStorage for Navbar and other components
      localStorage.setItem("token", data.token);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return { success: false };
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(username, email, password);
      setUser(data.user || { username, email });
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      return { success: false };
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
