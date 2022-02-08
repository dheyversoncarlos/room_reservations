import { inject, injectable } from "tsyringe";

import { IUserPassportDTO } from "../dtos/IPassportPropsDTO";
import IUsersRepository from "../infra/typeorm/IRepositories/IUsersRepository";

@injectable()
class FindUserByIdService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  handle = async (id: string) => {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      return [];
    }
    const userReturn: IUserPassportDTO = {
      _id: user.id,
      email: user.email,
      password: user.password,
    };

    return userReturn;
  };
}

export { FindUserByIdService };
