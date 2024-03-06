import { NextFunction, Request, Response } from "express";
import { serverError } from "../util/response.helper";

export async function validateInfoMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .send({ ok: false, message: "Username was not informed" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ ok: false, message: "Password was not informed" });
    }

    next();
  } catch (error: any) {
    return serverError(res, error);
  }
}
