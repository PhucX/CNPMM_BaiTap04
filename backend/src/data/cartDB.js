const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'carts.json');

// Đảm bảo file tồn tại
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify({}));
}

function getCarts() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function saveCarts(carts) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(carts, null, 2));
}

function getUserCart(userId) {
  const carts = getCarts();
  return carts[userId] || [];
}

function saveUserCart(userId, cart) {
  const carts = getCarts();
  carts[userId] = cart;
  saveCarts(carts);
}

module.exports = {
  getUserCart,
  saveUserCart
};
