import { ICreateScheduleDTO } from "@modules/rooms/dtos/ICreateScheduleDTO";
import { AvailablesByRoomIdService } from "@modules/rooms/services/AvailablesByRoomIdService";
import { CreateScheduleService } from "@modules/rooms/services/CreateScheduleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ScheduleController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateScheduleDTO;
    const { _id } = request.user;
    data.user_id = _id;

    const createSchedule = container.resolve(CreateScheduleService);

    const schedule = await createSchedule.execute(data);

    return response.status(201).json(schedule);
  }

  async AvailablesByRoom(
    request: Request,
    response: Response
  ): Promise<Response> {
    const handleService = container.resolve(AvailablesByRoomIdService);

    const rooms = await handleService.find(request.params.room_id);

    return response.status(200).json(rooms);
  }
}

export { ScheduleController };
