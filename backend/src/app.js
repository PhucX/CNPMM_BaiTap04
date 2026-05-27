const path = require("path");
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const config = require("./config");
const authRoutes = require("./routes/auth.routes");
const catalogRoutes = require("./routes/catalog.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(config.publicDir));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: config.appName,
    env: config.env
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", catalogRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      message: "API không tồn tại."
    });
  }

  return res.sendFile(path.join(config.publicDir, "index.html"), next);
});

app.use((error, req, res, next) => {
  console.error(error);
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(error.statusCode || 500).json({
    message: "Có lỗi xảy ra trên máy chủ."
  });
});

module.exports = app;
