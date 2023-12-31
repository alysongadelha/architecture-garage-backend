const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const projectRoutes = require("./routers/project-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", projectRoutes.routes);

app.get("/", (req, res) => {
  return res.json(`App is listening on PORT ${config.port}`);
});

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
