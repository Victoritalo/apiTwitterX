import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { validateInfoMiddleware } from "../middlewares/login.middleware";

export const AuthRoutes = () => {
  const router = Router({ mergeParams: true });

  router.post("/", [validateInfoMiddleware],  new AuthController().login);
  return router;
};
