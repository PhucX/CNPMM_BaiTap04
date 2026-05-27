const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Promotion = require('../models/Promotion');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { hashPassword } = require('../services/authService');

const { users, products, categories, promotions } = require('./catalog');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Promotion.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});

    // Insert Catalog Data
    await User.insertMany(users.map(user => ({
      ...user,
      password: hashPassword(user.password)
    })));
    await Category.insertMany(categories);
    await Promotion.insertMany(promotions);
    await Product.insertMany(products);

    console.log('Catalog data seeded.');

    // Migrate Carts if exists
    const cartsPath = path.join(__dirname, 'carts.json');
    if (fs.existsSync(cartsPath)) {
      const cartsData = JSON.parse(fs.readFileSync(cartsPath, 'utf8'));
      const cartDocs = Object.keys(cartsData).map(userId => ({
        userId,
        items: cartsData[userId]
      }));
      if (cartDocs.length > 0) {
        await Cart.insertMany(cartDocs);
        console.log(`Migrated ${cartDocs.length} carts.`);
      }
    }

    // Migrate Orders if exists
    const ordersPath = path.join(__dirname, 'orders.json');
    if (fs.existsSync(ordersPath)) {
      const ordersData = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
      const orderDocs = Object.values(ordersData).flat();
      if (orderDocs.length > 0) {
        await Order.insertMany(orderDocs);
        console.log(`Migrated ${orderDocs.length} orders.`);
      }
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
