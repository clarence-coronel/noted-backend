import { Router, response } from "express";
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

const router = Router();

router.post(
  "/api/user/auth",
  checkSchema(loginUserValidationSchema),
  async (request, response, next) => {
    const result = validationResult(request);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    next();
  },
  passport.authenticate("local"),
  async (request, response) => {
    return response.sendStatus(200);
  }
);

router.get("/api/user/auth/status", (request, response) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(request.user);
  console.log(request.session);
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

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

router.post("/api/user/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);

  request.logout((err) => {
    if (err) return response.sendStatus(400);

    return response.sendStatus(200);
  });
});

export default router;
