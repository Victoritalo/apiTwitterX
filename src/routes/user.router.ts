import { Router } from "express";

import { UserController } from "../controllers/user.controller";

export const UserRoutes = () => {
  const router = Router();
  router.post("/", new UserController().createUser);
  return router;
};
