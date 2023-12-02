const firebase = require("../db");
const { Project, ProjectSlim } = require("../models/project");
const { getAssetValue } = require("../utils/helper.util");
const firestore = firebase.firestore();
const { v4: uuidv4 } = require("uuid");

const addProject = async (req, res, next) => {
  try {
    const createdAt = String(new Date());
    const data = { ...req.body, createdAt };
    const id = uuidv4();
    await firestore.collection("projectDetail").doc(id).set(data);

    const newProjectSlim = {
      id: uuidv4(),
      projectId: id,
      baths: getAssetValue(data.assets, "bathsIcon"),
      beds: getAssetValue(data.assets, "bedsIcon"),
      image: data.imageCluster,
      name: data.name,
      squareMeters: getAssetValue(data.assets, "sqmtIcon"),
      stories: getAssetValue(data.assets, "storiesIcon"),
      teaser: data.longDescription[0].substring(0, 20) + "...",
      active: data.active,
      createdAt,
    };

    await firestore.collection("projects").doc().set(newProjectSlim);
    res.send("Record saved successfully");
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projects = firestore.collection("projects");
    const data = await projects.get();
    const projectSlimArray = [];

    if (data.empty) {
      res.status(404).send();
    } else {
      data.forEach((doc) => {
        const projectSlim = new ProjectSlim(
          doc.id,
          doc.data().projectId,
          doc.data().name,
          doc.data().image,
          doc.data().teaser,
          doc.data().bath,
          doc.data().beds,
          doc.data().squareMeters,
          doc.data().stories,
          doc.data().createdAt,
          doc.data().active
        );

        projectSlimArray.push(projectSlim);
      });
      res.send(projectSlimArray);
    }
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const project = firestore.collection("projectDetail").doc(id);
    const data = await project.get();
    if (!data.exists) {
      res.status(404).send(`Project with ID ${id} was not found`);
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const data = req.body;
    const projectSlimArray = [];

    if (data === null) {
      res.status(404).send(`Request with ID ${id} without body`);
    }

    const project = firestore.collection("projectDetail").doc(id);
    await project.update(data);

    const projectRef = firestore.collection("projects");
    const projectsData = await projectRef.where("projectId", "==", id).get();

    if (projectsData.empty) {
      res
        .status(404)
        .send(`Request with ID ${id} no matching documents to projects`);
    } else {
      projectsData.forEach((doc) => {
        const projectSlim = new ProjectSlim(
          doc.id,
          doc.data().projectId,
          doc.data().name,
          doc.data().image,
          doc.data().teaser,
          doc.data().bath,
          doc.data().beds,
          doc.data().squareMeters,
          doc.data().stories,
          doc.data().createdAt,
          doc.data().active
        );

        projectSlimArray.push(projectSlim);
      });
    }
    const projectToUpdate = projectSlimArray.find(
      (project) => project.projectId === id
    );

    if (projectToUpdate === undefined) {
      res
        .status(404)
        .send(`Request with ID ${id} no matching documents to projects`);
    } else {
      const newProjectSlim = {
        id: projectToUpdate.id,
        projectId: id,
        baths: getAssetValue(data.assets, "bathsIcon"),
        beds: getAssetValue(data.assets, "bedsIcon"),
        image: data.imageCluster,
        name: data.name,
        squareMeters: getAssetValue(data.assets, "sqmtIcon"),
        stories: getAssetValue(data.assets, "storiesIcon"),
        teaser: data.longDescription[0].substring(0, 20) + "...",
        active: data.active,
        createdAt: projectToUpdate.createdAt,
      };

      await projectRef.doc(projectToUpdate.id).update(newProjectSlim);
    }

    res.send(`Project with ID ${id} was updated`);
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const id = req.params.projectId;
    await firestore.collection("projectDetail").doc(id).delete();

    const projectRef = firestore.collection("projects");
    const projectsData = await firestore
      .collection("projects")
      .where("projectId", "==", id)
      .get();
    if (projectsData.empty) {
      res.send(`The Project with Id ${id} do not exist`);
    } else {
      projectsData.forEach(async (project) => {
        await projectRef.doc(project.id).delete();
      });
      res.send("Record deleted successfully");
    }
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

module.exports = {
  addProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
