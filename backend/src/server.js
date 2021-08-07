const express = require("express");
const routes = require("./routes");
const app = express();
const { startDb } = require("./database/database");

app.use(express.json());

app.use(routes);

app.listen(8080, () => {
  startDb();
});
