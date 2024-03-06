import { Request, Response } from "express";
import { emptyFieldError, serverError } from "../util/response.helper";
import AuthService from "../services/auth.service";

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) return emptyFieldError(res);
      const result = await AuthService.login({ username, password });

      return res.status(result.status).send(result);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
