const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["member", "admin"], default: "member" },
  phone: { type: String },
  loyaltyRank: { type: String, default: "Thanh vien moi" },
  joinedAt: { type: Date, default: Date.now },
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);
