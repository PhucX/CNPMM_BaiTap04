const crypto = require("crypto");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  const userId = req.user.id;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const populatedItems = await Promise.all(cart.items.map(async item => {
    const product = await Product.findOne({ id: item.productId });
    return {
      id: item.id,
      productId: item.productId,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      addedAt: item.addedAt,
      product: product ? {
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
        slug: product.slug,
        category: product.categoryId
      } : null
    };
  }));

  const subtotal = populatedItems.reduce((acc, item) => {
    return acc + (item.product ? item.product.price * item.quantity : 0);
  }, 0);

  return res.json({
    items: populatedItems,
    totalItems: populatedItems.reduce((acc, item) => acc + item.quantity, 0),
    subtotal
  });
};

const addItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, color, size, quantity } = req.body;
  const qty = Number(quantity);
  const selectedSize = Number(size);

  if (!productId || !color || !size || !Number.isInteger(qty) || qty <= 0) {
    return res.status(400).json({ message: "Invalid product selection or quantity." });
  }

  const product = await Product.findOne({ id: productId });
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  if (!product.colors.includes(color) || !product.sizes.includes(selectedSize)) {
    return res.status(400).json({ message: "Invalid color or size." });
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    item => item.productId === productId && item.color === color && item.size === selectedSize
  );

  const currentQuantity = existingItemIndex > -1 ? cart.items[existingItemIndex].quantity : 0;
  if (currentQuantity + qty > product.stock) {
    return res.status(400).json({ message: "Quantity exceeds available stock." });
  }

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += qty;
  } else {
    cart.items.push({
      id: `ci-${crypto.randomUUID()}`,
      productId,
      color,
      size: selectedSize,
      quantity: qty,
      addedAt: new Date()
    });
  }

  await cart.save();
  return res.status(201).json({ message: "Added to cart.", items: cart.items });
};

const updateItem = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  const qty = Number(req.body.quantity);

  if (!Number.isInteger(qty)) {
    return res.status(400).json({ message: "Invalid quantity." });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found." });

  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Cart item not found." });
  }

  if (qty <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    const product = await Product.findOne({ id: cart.items[itemIndex].productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (qty > product.stock) {
      return res.status(400).json({ message: "Quantity exceeds available stock." });
    }
    cart.items[itemIndex].quantity = qty;
  }

  await cart.save();
  return res.json({ message: "Cart updated.", items: cart.items });
};

const removeItem = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found." });

  cart.items = cart.items.filter(item => item.id !== itemId);
  await cart.save();
  return res.json({ message: "Cart item removed.", items: cart.items });
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem
};
