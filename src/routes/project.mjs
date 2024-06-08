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

export default router;
