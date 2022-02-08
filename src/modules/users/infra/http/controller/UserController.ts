import { CreateUserService } from "@modules/users/services/CreateUserService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

class UserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(request.body);

    return response.status(201).json(user);
  }
}

export { UserController };
