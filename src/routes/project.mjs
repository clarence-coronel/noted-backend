import { Router, response } from "express";
import { validateSession } from "../utils/middlewares.mjs";
import { Project } from "./../mongoose/schemas/ProjectSchema.mjs";
import { validationResult, checkSchema, matchedData } from "express-validator";
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

// Update project
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

// Delete project / Toggle active status to false
router.patch("/api/project/:id", validateSession, async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    const selectedProject = await Project.findById(id);

    selectedProject.isActive = false;

    selectedProject.save();

    return response.status(200).send({ msg: "Project disabled" });
  } catch (error) {
    return response.status(400).send({ error: error });
  }
});
export default router;
