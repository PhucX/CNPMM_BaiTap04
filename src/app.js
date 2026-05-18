const path = require("path");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const catalogRoutes = require("./routes/catalog.routes");

const app = express();
const publicDir = path.join(__dirname, "..", "public");

app.use(express.json());
app.use(express.static(publicDir));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "UrbanStep Store"
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

  return res.sendFile(path.join(publicDir, "index.html"), next);
});

app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({
    message: "Có lỗi xảy ra trên máy chủ."
  });
});

module.exports = app;
