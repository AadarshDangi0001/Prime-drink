const User = require('../models/User');

exports.addToCart = async (req, res, next) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) return res.status(400).json({ message: 'userId and itemId required' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.cartItems.push(itemId);
    await user.save();
    res.json({ message: 'Item added to cart', cartItems: user.cartItems });
  } catch (err) { next(err); }
};

exports.showCart = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'userId required' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ cartItems: user.cartItems });
  } catch (err) { next(err); }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) return res.status(400).json({ message: 'userId and itemId required' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.cartItems = user.cartItems.filter(id => id !== itemId);
    await user.save();
    res.json({ message: 'Item removed', cartItems: user.cartItems });
  } catch (err) { next(err); }
};
