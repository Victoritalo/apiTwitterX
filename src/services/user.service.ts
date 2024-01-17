import { repository } from "../database/prisma.repository";
// import { ResponseDto } from "../dtos/response.dto";
import { CreateUserDTO } from "../dtos/user.dto";
import { User } from "../models/user.model";
import { conflictError, notFoundError } from "./../util/service.helper";
import bcrypt from "bcrypt";

class UserService {
  public async createUser(data: CreateUserDTO) {
    const user = new User(data.name, data.email, data.username, data.password);

    const verifyUsername = await repository.user.findUnique({
      where: { username: data.username },
    });

    if (verifyUsername) {
      return conflictError(409, "Username already in use!", null);
    }

    const verifyEmail = await repository.user.findUnique({
      where: { email: data.email },
    });

    if (verifyEmail) {
      return conflictError(409, "Email already in use!", null);
    }

    try {
      const genSalt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, genSalt);

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
        status: 201,
        message: "User created successfully!",
        data: createUser,
      };

    } catch (error: any) {
      return { status: 500, message: "Something went wrong!", data: error };
    }
  }

  

  public async deleteUser(id: string) {
    const user = await repository.user.findUnique({ where: { id } });

    if (!user) return notFoundError(404, "User not found!", null);

    try {
      await repository.user.delete({ where: { id } });
      return {
        status: 201,
        message: "Deletion of user completed successfully!",
        data: user.username,
      };
    } catch (error: any) {
      return { status: 500, message: "Something went wrong!", data: null };
    }
  }
}

export default new UserService();
