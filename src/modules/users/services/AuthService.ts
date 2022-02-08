import {
  Request as ERequest,
  Response as EResponse,
  NextFunction,
} from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { IPassportPropsDTO } from "../dtos/IPassportPropsDTO";
import IUsersRepository from "../infra/typeorm/IRepositories/IUsersRepository";

@injectable()
class AuthService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  auth = async (req: ERequest, res: EResponse, next: NextFunction) => {
    const authData = req.body as IPassportPropsDTO;

    if (!authData.email || !authData.password) {
      throw new AppError("Email or password not found", 406);
    }

    const user = await this.usersRepository.findUserByEmail(authData.email);

    if (!user) {
      throw new AppError("Email not exists", 404);
    }

    passport.authenticate("login", async (_, user, info) => {
      if (!user) {
        return next(info);
      }
      try {
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _id: user._id, email: user.email };

          const token = jwt.sign({ user: body }, process.env.SECRET);
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  };
}

export { AuthService };
