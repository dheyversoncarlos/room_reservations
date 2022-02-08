import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";

import { User } from "../entities/User";

export default interface IUsersRepository {
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  create(user: ICreateUserDTO): Promise<User>;
}
