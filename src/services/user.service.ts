import { repository } from "../database/prisma.repository";
import { ResultDTO } from "../contract/result.contract";
import { CreateUserDTO, UpdateUserDto } from "../contract/user.contract";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

class UserService {
  public async createUser(data: CreateUserDTO): Promise<ResultDTO> {
    const user = new User(data.name, data.email, data.username, data.password);

    const verifyUsername = await repository.user.findUnique({
      where: { username: data.username },
    });

    if (verifyUsername) {
      return { ok: false, status: 409, message: "Username already in use!" };
    }

    const verifyEmail = await repository.user.findUnique({
      where: { email: data.email },
    });

    if (verifyEmail) {
      return { ok: false, status: 409, message: "Email already in use!" };
    }

    try {
      const hashPassword = await bcrypt.hash(user.password, 10);

      const createUser = await repository.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: hashPassword,
          id: user.id,
        },
      });

      return {
        ok: true,
        status: 201,
        message: "User created successfully!",
        data: createUser,
      };
    } catch (error: any) {
      return {
        ok: false,
        status: 500,
        message: "Something went wrong!",
        data: error,
      };
    }
  }

  public async bringUserData(username: string, password: string) {
    try {
      const user = await repository.user.findUnique({
        where: { username: username },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          token: true,
        },
      });
      if (!user)
        return { status: 401, message: "Wrong credentials!", data: null };

      const verifyPassword = await bcrypt.compare(password, user!.password);
      if (!verifyPassword) {
        return false;
      } else {
        return user;
      }
    } catch (error: any) {
      return { status: 500, message: "Something went wrong!", data: null };
    }
  }

  public async bringUserToken(token: string) {
    const user = repository.user.findUnique({ where: { token: token } });
    return user;
  }

  public async updateUser(data: UpdateUserDto): Promise<ResultDTO> {
    try {
      const user = await repository.user.findUnique({
        where: { id: data.id },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          token: true,
        },
      });

      if (!user) return { ok: false, status: 404, message: "User not found!" };

      const hashPassword = await bcrypt.hash(data.password, 10);
      const updateUser = await repository.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          username: data.username,
          password: hashPassword,
          token: data.token,
        },
      });
      return {
        ok: true,
        status: 200,
        message: "Information updated successfully!",
        data: updateUser,
      };
    } catch (error: any) {
      return {
        ok: false,
        status: 500,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  public async deleteUser(id: string): Promise<ResultDTO> {
    const user = await repository.user.findUnique({ where: { id } });

    if (!user) return { ok: false, status: 404, message: "User not found!" };

    await repository.user.delete({ where: { id } });

    return {
      ok: true,
      status: 201,
      message: "User successfully deleted",
      data: user.username,
    };

    // try {
    // } catch (error: any) {
    //   return { status: 500, message: "Something went wrong!", data: null };
    // }
  }
}

export default new UserService();
