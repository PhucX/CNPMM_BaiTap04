const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const config = require("./config");
const authRoutes = require("./routes/auth.routes");
const catalogRoutes = require("./routes/catalog.routes");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "images.unsplash.com"],
        "script-src": ["'self'", "'unsafe-inline'", "cdn.tailwindcss.com", "cdn.jsdelivr.net"],
        "style-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      },
    },
  })
);
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
  return res.status(500).json({
    message: "Có lỗi xảy ra trên máy chủ."
  });
});

module.exports = app;
