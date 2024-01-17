import { Response } from "express";

export function serverError(res: Response, error: any) {
  return res.status(500).send({ ok: false, message: error.toString() });
}

export function emptyFieldError(res: Response) {
  return res.status(400).send({
    ok: false,
    message: "Incomplete fields. Please fill out all the required information.",
  });
}


