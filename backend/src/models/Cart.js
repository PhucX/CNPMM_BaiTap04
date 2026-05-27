const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  productId: { type: String, required: true },
  color: { type: String },
  size: { type: Number },
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now }
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
