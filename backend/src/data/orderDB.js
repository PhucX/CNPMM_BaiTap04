const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'orders.json');

// Đảm bảo file tồn tại
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify({}));
}

function getOrdersDB() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function saveOrdersDB(orders) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));
}

function getUserOrders(userId) {
  const orders = getOrdersDB();
  return orders[userId] || [];
}

function saveUserOrders(userId, userOrders) {
  const orders = getOrdersDB();
  orders[userId] = userOrders;
  saveOrdersDB(orders);
}

function getAllOrdersForAdmin() {
    const orders = getOrdersDB();
    return Object.values(orders).flat();
}

module.exports = {
  getUserOrders,
  saveUserOrders,
  getAllOrdersForAdmin
};
