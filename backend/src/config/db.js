const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/urbanstep";
  const conn = await mongoose.connect(mongoUri);
  console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
}

module.exports = connectDB;
