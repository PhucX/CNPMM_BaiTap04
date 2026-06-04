const crypto = require("crypto");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Order = require("../models/Order");
const { sanitizeUser } = require("../services/authService");

const getDashboardStats = async (req, res) => {
  const [totalProducts, totalCategories, totalUsers, totalOrders, orders, outOfStock, lowStock] = await Promise.all([
    Product.countDocuments({}),
    Category.countDocuments({}),
    User.countDocuments({}),
    Order.countDocuments({}),
    Order.find({}),
    Product.countDocuments({ stock: { $lte: 0 } }),
    Product.countDocuments({ stock: { $gt: 0, $lte: 5 } })
  ]);

  return res.json({
    totalProducts,
    totalCategories,
    totalUsers,
    totalOrders,
    outOfStock,
    lowStock,
    pendingCancellations: orders.filter(order => order.status === 7).length
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.json({
    items: users.map(user => sanitizeUser(user))
  });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  return res.json({
    items: orders
  });
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, note } = req.body;
  const newStatus = Number(status);

  if (!Number.isInteger(newStatus) || newStatus < 1 || newStatus > 7) {
    return res.status(400).json({ message: "Invalid order status." });
  }

  const order = await Order.findOne({ id: orderId });
  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  order.status = newStatus;
  order.history.push({
    status: newStatus,
    timestamp: new Date(),
    note: note || "Status updated by admin"
  });

  await order.save();
  return res.json({ message: "Order status updated." });
};

const getAllProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const total = await Product.countDocuments({});
  const items = await Product.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.json({
    items,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    hasMore: page * pageSize < total
  });
};

const createProduct = async (req, res) => {
  const { slug, name, categoryId, price } = req.body;

  if (!slug || !name || !categoryId || Number(price) <= 0) {
    return res.status(400).json({ message: "Missing required product information." });
  }

  const newProduct = await Product.create({
    id: `p-${crypto.randomUUID()}`,
    brand: "UrbanStep",
    stock: 0,
    sold: 0,
    rating: 5,
    reviewCount: 0,
    discountPercent: 0,
    createdAt: new Date(),
    ...req.body
  });

  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  if (req.body.price !== undefined && Number(req.body.price) <= 0) {
    return res.status(400).json({ message: "Invalid product price." });
  }

  const product = await Product.findOneAndUpdate(
    { id: req.params.id },
    { ...req.body },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.params.id });
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json({ message: "Product deleted.", product });
};

module.exports = {
  getDashboardStats,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllUsers
};
