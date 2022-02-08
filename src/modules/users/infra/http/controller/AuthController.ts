import { AuthService } from "@modules/users/services/AuthService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

class AuthController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const authUser = container.resolve(AuthService);

    await authUser.auth(request, response, next);
  }
}

export { AuthController };
