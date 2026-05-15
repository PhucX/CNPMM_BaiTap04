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
      message: "API khong ton tai."
    });
  }

  return res.sendFile(path.join(publicDir, "index.html"), next);
});

app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({
    message: "Co loi xay ra tren may chu."
  });
});

module.exports = app;
