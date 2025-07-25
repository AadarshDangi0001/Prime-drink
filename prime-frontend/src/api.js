
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

export const registerUser = async (username, email, password) => {
  const res = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${API_URL}/auth/logout`);
  return res.data;
};

export const addToCart = async (userId, itemId) => {
  const res = await axios.post(`${API_URL}/cart/add`, { userId, itemId });
  return res.data;
};

export const showCart = async (userId) => {
  const res = await axios.get(`${API_URL}/cart/show`, { params: { userId } });
  return res.data;
};

export const removeCartItem = async (userId, itemId) => {
  const res = await axios.post(`${API_URL}/cart/remove`, { userId, itemId });
  return res.data;
};
export const getMe = async (token) => {
  const res = await axios.get(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
