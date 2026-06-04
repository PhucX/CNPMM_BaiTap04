const app = require("./app");
const config = require("./config");
const connectDB = require("./config/db");

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`${config.appName} dang chay tai http://localhost:${config.port} [${config.env}]`);
    });
  })
  .catch((error) => {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  });
