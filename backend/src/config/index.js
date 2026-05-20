const path = require("path");
require("dotenv").config();

module.exports = {
  port: Number(process.env.PORT || 3000),
  env: process.env.NODE_ENV || "development",
  appName: process.env.APP_NAME || "UrbanStep Store",
  publicDir: path.join(__dirname, "..", "..", "..", "frontend", "dist"),
};
