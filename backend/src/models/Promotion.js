const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  badge: { type: String },
  tone: { type: String }
});

module.exports = mongoose.model('Promotion', promotionSchema);
