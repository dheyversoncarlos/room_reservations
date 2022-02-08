import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";
import IUserRepository from "../IRepositories/IUsersRepository";

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const created = await this.ormRepository
      .createQueryBuilder()
      .insert()
      .into("User")
      .values(user)
      .returning(["id", "name", "email", "avatar"])
      .execute();

    if (created.raw.length) {
      return created.raw[0];
    }
    return Promise.reject();
  }
}

export { UsersRepository };
