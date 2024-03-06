import { LoginDTO, PayloadDTO } from "../contract/login.contract";
import { ResultDTO } from "../contract/result.contract";
import { repository } from "../database/prisma.repository";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

class AuthService {
  public async login(data: LoginDTO): Promise<ResultDTO> {
    const user = await repository.user.findFirst({
      where: { username: data.username },
      select: { id: true, name: true, username: true, password: true },
    });

    if (!user) {
      return { ok: false, status: 401, message: "Wrong credentials!" };
    }

    const validatePass = await bcrypt.compare(data.password, user.password);

    if (!validatePass) {
      return { ok: false, status: 401, message: "Wrong credentials!" };
    }

    const token = this.generateToken(user);

    return {
      ok: true,
      status: 200,
      message: "Logged in successfully!",
      data: { id: user.id, name: user.name, username: user.username, token },
    };
  }

  public async validateLogin(token: string, id: string): Promise<ResultDTO> {
    const payload = this.validateToken(token) as PayloadDTO;

    if (payload == null || id != payload.id) {
      return {
        ok: false,
        status: 401,
        message: "Invalid authenticator token",
      };
    }

    return { ok: true, status: 200, message: "Login validation success!" };
  }

  public generateToken(payload: any) {
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    return token;
  }

  public validateToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      return payload;
    } catch (error: any) {
      return null;
    }
  }
}

export default new AuthService();
