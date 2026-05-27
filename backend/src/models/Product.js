const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, default: 'UrbanStep' },
  categoryId: { type: String, required: true }, // reference by string ID
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  stock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 },
  reviewCount: { type: Number, default: 0 },
  isNewItem: { type: Boolean, default: false },
  discountPercent: { type: Number, default: 0 },
  colors: [String],
  sizes: [Number],
  images: [String],
  summary: { type: String },
  description: { type: String },
  specs: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
