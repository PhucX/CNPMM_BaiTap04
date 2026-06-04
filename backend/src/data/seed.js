const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Promotion = require("../models/Promotion");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { hashPassword } = require("../services/authService");
const { users, products, categories, promotions } = require("./catalog");

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/urbanstep";

async function seedData() {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB: ${mongoose.connection.host}/${mongoose.connection.name}`);

    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Promotion.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({})
    ]);

    await User.insertMany(users.map(user => ({
      ...user,
      password: hashPassword(user.password)
    })));
    await Category.insertMany(categories);
    await Promotion.insertMany(promotions);
    await Product.insertMany(products);

    console.log("MongoDB seed completed.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedData();
