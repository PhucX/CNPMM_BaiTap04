const app = require("./app");

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`UrbanStep Store dang chay tai http://localhost:${port}`);
});
