import express from "express";
const {
  addProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/projects", addProject);
router.get("/projects", getAllProjects);
router.get("/project/:projectId", getProject);
router.put("/project/:projectId", updateProject);
router.delete("/project/:projectId", deleteProject);

module.exports = {
  routes: router,
};
