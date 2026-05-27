const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const AUTO_CONFIRM_MS = 30 * 60 * 1000;

async function processAutoConfirm(orders) {
  const now = new Date();

  return Promise.all(orders.map(async order => {
    if (order.status === 1 && (now - new Date(order.createdAt)) >= AUTO_CONFIRM_MS) {
      order.status = 2;
      order.history.push({
        status: 2,
        timestamp: new Date(),
        note: "Auto confirmed after 30 minutes"
      });
      await order.save();
    }
    return order;
  }));
}

const getOrders = async (req, res) => {
  const userId = req.user.id;
  let orders = await Order.find({ userId }).sort({ createdAt: -1 });

  orders = await processAutoConfirm(orders);

  return res.json({
    items: orders
  });
};

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { shippingInfo, paymentMethod = "COD" } = req.body;

  if (!shippingInfo || !shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
    return res.status(400).json({ message: "Missing shipping information." });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty." });
  }

  const productsToUpdate = [];
  const orderItems = await Promise.all(cart.items.map(async item => {
    const product = await Product.findOne({ id: item.productId });
    if (!product) {
      const error = new Error(`Product ${item.productId} not found.`);
      error.statusCode = 400;
      throw error;
    }

    if (item.quantity <= 0 || item.quantity > product.stock) {
      const error = new Error(`Product ${product.name} does not have enough stock.`);
      error.statusCode = 400;
      throw error;
    }

    productsToUpdate.push({ product, quantity: item.quantity });

    return {
      productId: item.productId,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      price: product.price,
      name: product.name,
      image: product.images?.[0] || null
    };
  }));

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 1000000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const newOrder = await Order.create({
    id: `ORD-${Date.now()}`,
    userId,
    items: orderItems,
    subtotal,
    shippingFee,
    total,
    shippingInfo,
    paymentMethod,
    status: 1,
    history: [
      { status: 1, timestamp: new Date(), note: "Order created successfully" }
    ]
  });

  await Promise.all(productsToUpdate.map(({ product, quantity }) => {
    product.stock -= quantity;
    product.sold = (product.sold || 0) + quantity;
    return product.save();
  }));

  cart.items = [];
  await cart.save();

  return res.status(201).json({
    message: "Order created successfully.",
    order: newOrder
  });
};

const cancelOrder = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;
  const order = await Order.findOne({ id: orderId, userId });

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  const now = new Date();
  const diffMinutes = (now - new Date(order.createdAt)) / (1000 * 60);

  if (diffMinutes < 30 && (order.status === 1 || order.status === 2)) {
    order.status = 6;
    order.history.push({ status: 6, timestamp: now, note: "Customer cancelled within 30 minutes" });
    await order.save();
    return res.json({ message: "Order cancelled successfully.", order });
  }

  if (order.status === 3) {
    order.status = 7;
    order.history.push({ status: 7, timestamp: now, note: "Customer requested cancellation" });
    await order.save();
    return res.json({ message: "Cancellation request sent.", order });
  }

  return res.status(400).json({
    message: "This order cannot be cancelled."
  });
};

module.exports = {
  getOrders,
  createOrder,
  cancelOrder
};
