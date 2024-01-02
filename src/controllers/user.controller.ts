import { Request, Response } from "express";
import {  emptyFieldError, serverError } from "../util/response.helper";
import UserService from "./../services/user.service";

export class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, username, password } = req.body;
      if (!name || !email || !username || !password)
        return emptyFieldError(res);

        const result = await UserService.createUser({name, email, username, password});
        
        if(result !== null) return res.status(409).send({ok: false, message: "Something went wrong!", data: result});
        if(result) return res.status(201).send({ok: true, message: "User created successfully!", data: result});

    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
