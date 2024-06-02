import { Router } from "express";
import UserRouter from "./user.mjs";

const router = Router();

router.use(UserRouter);

// ROUTES HERE

export default router;
