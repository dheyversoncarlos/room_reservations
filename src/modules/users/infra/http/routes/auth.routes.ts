import { Router } from "express";

import { AuthController } from "../controller/AuthController";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/", authController.handle);

export { authRouter };
