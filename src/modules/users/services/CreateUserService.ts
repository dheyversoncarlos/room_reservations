import { generatorHash } from "@utils";
import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";
import IUsersRepository from "../infra/typeorm/IRepositories/IUsersRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, email, name }: ICreateUserDTO): Promise<User> {
    try {
      if (!password || !email || !name) {
        throw new AppError("Name, email and password is required", 406);
      }

      const verifyEmail = await this.usersRepository.findUserByEmail(email);

      if (verifyEmail) {
        throw new AppError("Email already exist", 422);
      }

      const hashPass = generatorHash(password);

      const user = await this.usersRepository.create({
        email,
        name,
        password: hashPass,
      });

      return user;
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export { CreateUserService };
