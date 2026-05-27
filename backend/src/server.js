const app = require("./app");
const config = require("./config");
const connectDB = require("./config/db");

// Kết nối Database trước khi chạy Server
connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`${config.appName} đang chạy tại http://localhost:${config.port} [${config.env}]`);
  });
});
