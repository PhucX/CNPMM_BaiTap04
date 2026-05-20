const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log(`${config.appName} đang chạy tại http://localhost:${config.port} [${config.env}]`);
});
