import { JwtPayload } from "jsonwebtoken";

export interface LoginDTO {
  username: string;
  password: string;
}

export interface PayloadDTO extends JwtPayload {
  id: string;
  username: string;
}
