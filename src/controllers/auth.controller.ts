import { Request, Response } from "express";
import { randomUUID } from "crypto";
import userService from "../services/user.service";

export class AuthController {
  public async handleLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await userService.bringUserData(username, password);
  }
}
