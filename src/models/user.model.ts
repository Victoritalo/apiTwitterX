import { randomUUID } from "crypto";

export class User {
  private _id: string;
  constructor(
    private _name: string,
    private _email: string,
    private _username: string,
    private _password: string
  ) {
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  public get username() {
    return this._username;
  }

  public get password() {
    return this._password;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      username: this._username,
      password: this._password,
    };
  }
}