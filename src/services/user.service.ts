import { repository } from "../database/prisma.repository";
import { CreateUserDTO } from "../dtos/user.dto";
import { User } from "../models/user.model";

class UserService {
  public async createUser(data: CreateUserDTO) {
    const user = new User(data.name, data.email, data.username, data.password);

    const verifyUsername = await repository.user.findUnique({
      where: { username: data.username },
    });

    if (verifyUsername) {
      return { status: 409, message: "Username already in use!", data: null };
    }

    const verifyEmail = await repository.user.findUnique({
      where: { email: data.email },
    });

    if (verifyEmail) {
      return { status: 409, message: "Email already in use!", data: null };
    }

    try {
      const createUser = await repository.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: user.password,
          id: user.id,
        },
      });
      return {
        status: 201,
        message: "User created successfully!",
        data: createUser,
      };
    } catch (error: any) {
      return { status: 500, message: "Something went wrong!", data: null };
    }
  }
}

export default new UserService();
