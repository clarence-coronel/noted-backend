// TO DO
// Add data validation

import { Router, response } from "express";
import { validateSession } from "../utils/middlewares.mjs";
import { Project } from "./../mongoose/schemas/ProjectSchema.mjs";

const router = Router();

// Create new project
router.post("/api/project", validateSession, async (request, response) => {
  const newProject = new Project(request.body);

  newProject.ownedBy = request.user._id;

  try {
    const savedProject = await newProject.save();
    return response.status(201).send(savedProject);
  } catch (error) {
    return response.status(401).send({ msg: error });
  }
});

// Update Project
router.put("/api/project/:id", validateSession, async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    const project = await Project.findById(id);

    project.name = request.body.name || project.name;
    project.listType = request.body.listType || project.listType;

    const savedProject = await project.save();

    return response.status(200).send(savedProject);
  } catch (error) {
    return response.sendStatus(404);
  }

  return response.sendStatus(200);
});

export default router;
