const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // slug-based id
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);
