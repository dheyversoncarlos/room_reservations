import { Router } from "express";

import { RoomController } from "../controller/RoomController";

const roomRouter = Router();
const roomController = new RoomController();

roomRouter.get("/", roomController.RoomAvailableByDate);
roomRouter.get("/:id", roomController.RoomDetails);

export { roomRouter };
