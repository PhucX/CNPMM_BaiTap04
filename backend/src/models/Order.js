const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  color: { type: String },
  size: { type: Number },
  quantity: { type: Number }
});

const historySchema = new mongoose.Schema({
  status: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String }
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  shippingInfo: {
    name: String,
    phone: String,
    address: String,
    note: String
  },
  paymentMethod: { type: String, default: 'COD' },
  status: { type: Number, default: 1 },
  history: [historySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
