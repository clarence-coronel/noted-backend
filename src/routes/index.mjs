import { Router } from "express";
import UserRouter from "./user.mjs";
import ProjectRouter from "./project.mjs";

const router = Router();

router.use(UserRouter);
router.use(ProjectRouter);

// ROUTES HERE

export default router;
