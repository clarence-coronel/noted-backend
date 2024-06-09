// TO DO
// Add data validation

import { Router, response } from "express";
import { validateSession } from "../utils/middlewares.mjs";
import { Project } from "./../mongoose/schemas/ProjectSchema.mjs";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import {
  createProjectValidationSchema,
  updateProjectValidatitonSchema,
} from "../utils/validationSchema.mjs";

const router = Router();

// Create new project
router.post(
  "/api/project",
  validateSession,
  checkSchema(createProjectValidationSchema),
  async (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    const newProject = new Project(data);

    newProject.ownedBy = request.user._id;

    try {
      const savedProject = await newProject.save();
      return response.status(201).send(savedProject);
    } catch (error) {
      return response.status(401).send({ msg: error });
    }
  }
);

// Update Project
router.put(
  "/api/project/:id",
  validateSession,
  checkSchema(updateProjectValidatitonSchema),
  async (request, response) => {
    const {
      params: { id },
    } = request;

    const result = validationResult(request);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    try {
      const project = await Project.findById(id);

      if (!project.ownedBy.equals(request.user._id))
        return response
          .status(403)
          .send({ msg: "User does not own the project" });

      project.name = data.name || project.name;
      project.listType = data.listType || project.listType;

      const savedProject = await project.save();

      return response.status(200).send(savedProject);
    } catch (error) {
      return response.sendStatus(404);
    }

    return response.sendStatus(200);
  }
);

export default router;
