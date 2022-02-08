import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { IUserPassportDTO } from "../dtos/IPassportPropsDTO";
import IUsersRepository from "../infra/typeorm/IRepositories/IUsersRepository";

@injectable()
class FinUserByEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async handle(email: string): Promise<IUserPassportDTO> {
    try {
      const user = await this.usersRepository.findUserByEmail(email);

      const userReturn: IUserPassportDTO = {
        _id: user.id,
        email: user.email,
        password: user.password,
      };
      return userReturn;
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export { FinUserByEmailService };
