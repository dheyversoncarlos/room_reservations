import { Router } from "express";

import { UserController } from "../controller/UserController";

const usersRouter = Router();
const usersController = new UserController();

usersRouter.post("/", usersController.handle);

export { usersRouter };
