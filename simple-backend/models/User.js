const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems: [{ type: String }] // Array of item IDs from frontend
});

module.exports = mongoose.model('User', userSchema);
