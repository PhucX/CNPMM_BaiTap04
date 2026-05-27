const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Order = require("../models/Order");
const crypto = require("crypto");

const getDashboardStats = async (req, res) => {
  const [totalProducts, totalCategories, totalUsers, totalOrders, orders] = await Promise.all([
    Product.countDocuments({}),
    Category.countDocuments({}),
    User.countDocuments({}),
    Order.countDocuments({}),
    Order.find({})
  ]);

  return res.json({
    totalProducts,
    totalCategories,
    totalUsers,
    totalOrders,
    outOfStock: await Product.countDocuments({ stock: { $lte: 0 } }),
    lowStock: await Product.countDocuments({ stock: { $gt: 0, $lte: 5 } }),
    pendingCancellations: orders.filter(o => o.status === 7).length
  });
};

const getAllUsers = async (req, res) => {
  const { sanitizeUser } = require("../services/authService");
  const users = await User.find({});
  return res.json({
    items: users.map(u => sanitizeUser(u))
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

  const order = await Order.findOne({ id: orderId });
  if (!order) {
    return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
  }

  const newStatus = Number(status);
  if (!Number.isInteger(newStatus) || newStatus < 1 || newStatus > 7) {
    return res.status(400).json({ message: "Invalid order status." });
  }

  order.status = newStatus;
  order.history.push({
    status: newStatus,
    timestamp: new Date(),
    note: note || `Trạng thái đã được Admin cập nhật`
  });

  await order.save();
  return res.json({ message: "Cập nhật trạng thái thành công." });
};

const getAllProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  
  const total = await Product.countDocuments({});
  const items = await Product.find({})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 });

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
  if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
  return res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.params.id });
  if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
  return res.json({ message: "Đã xóa sản phẩm thành công.", product });
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
