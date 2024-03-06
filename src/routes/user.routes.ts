import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validateTokenMiddleware } from "../middlewares/token.middleware";

export const UserRoutes = () => {
  const router = Router({ mergeParams: true });

  router.post("/", new UserController().createUser);
  router.delete("/:id", [validateTokenMiddleware], new UserController().deleteUser);
  return router;
};
