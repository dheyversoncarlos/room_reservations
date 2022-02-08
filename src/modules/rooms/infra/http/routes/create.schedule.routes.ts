import { Router } from "express";

import { ScheduleController } from "../controller/ScheduleController";

const createScheduleRouter = Router();
const scheduleController = new ScheduleController();

createScheduleRouter.post("/", scheduleController.create);

export { createScheduleRouter };
