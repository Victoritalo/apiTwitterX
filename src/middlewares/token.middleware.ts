import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { serverError } from "../util/response.helper";

export async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    if (!authorization) {
      return res
        .status(401)
        .send({ ok: false, message: "Token was not informed" });
    }

    const result = await AuthService.validateLogin(authorization, id);

    if (!result.ok) {
      return res.status(result.status).send(result);
    }

    next();
  } catch (error: any) {
    return serverError(res, error);
  }
}
