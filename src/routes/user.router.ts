import { Router } from "express";

import { UserController } from "../controllers/user.controller";

export const UserRoutes = () => {
  const router = Router();
  router.post("/", new UserController().createUser);
  router.delete("/:id", new UserController().deleteUser);
  return router;
};
