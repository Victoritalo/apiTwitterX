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

  public get nome() {
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

// model User {
//     id       String  @id @default(uuid()) @db.Uuid
//     name     String  @db.VarChar(50)
//     email    String  @unique @db.VarChar(50)
//     username String  @unique @db.VarChar(15)
//     password String  @db.VarChar(50)
//     token    String?

//     tweet     Tweet[]
//     like      Like[]
//     following Follow[] @relation("Following")
//     followers Follow[] @relation("Followers")
//     reply     Reply[]

//     createdAt DateTime @default(now()) @map("created_at")
//     updatedAt DateTime @updatedAt @map("updated_at")

//     @@map("users")
//   }
