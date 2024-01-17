import { Request, Response } from "express";
import { emptyFieldError, serverError } from "../util/response.helper";
import UserService from "./../services/user.service";

export class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, username, password } = req.body;
      if (!name || !email || !username || !password)
        return emptyFieldError(res);

      const result = await UserService.createUser({
        name,
        email,
        username,
        password,
      });
      res.status(result.status).send(result);
    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UserService.deleteUser(id);
      return res.status(result.status).send(result);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
