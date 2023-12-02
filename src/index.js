const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const config = require("./config");
const projectRoutes = require("./routers/project-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/.netlify/functions/api", projectRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);

module.exports.handler = serverless(app);
