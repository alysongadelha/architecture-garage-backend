export {};
import express from "express";
import cors from "cors";
const bodyParser = require("body-parser");
import config from "./config";
const projectRoutes = require("./routers/project-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", projectRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
