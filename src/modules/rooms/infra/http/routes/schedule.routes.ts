import { Router } from "express";

import { ScheduleController } from "../controller/ScheduleController";

const scheduleRouter = Router();
const scheduleController = new ScheduleController();

scheduleRouter.get("/:room_id", scheduleController.AvailablesByRoom);
scheduleRouter.post("/", scheduleController.create);

export { scheduleRouter };
