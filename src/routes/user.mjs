import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { User } from "../mongoose/schemas/UserSchema.mjs";
import {
  createUserValidationSchema,
  loginUserValidationSchema,
} from "../utils/validationSchema.mjs";
import "./../strategies/local-strategy.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import passport from "passport";
import { validateSession } from "../utils/middlewares.mjs";

const router = Router();

// Login User
router.post(
  "/api/user/auth",
  checkSchema(loginUserValidationSchema),
  async (request, response, next) => {
    const result = validationResult(request);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    request.body = data;

    next();
  },
  passport.authenticate("local"),
  async (request, response) => {
    return response.sendStatus(200);
  }
);

// Check Status
router.get("/api/user/auth/status", validateSession, (request, response) => {
  return response.status(200).send(request.user);
});

// Register User
router.post(
  "/api/user/register",
  checkSchema(createUserValidationSchema),
  async (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    data.password = hashPassword(data.password);

    const newUser = new User(data);

    try {
      const savedUser = await newUser.save();
      return response.status(201).send(savedUser);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
);

// End User Session
router.post("/api/user/auth/logout", validateSession, (request, response) => {
  request.logout((err) => {
    if (err) return response.sendStatus(400);

    return response.sendStatus(200);
  });
});

export default router;
