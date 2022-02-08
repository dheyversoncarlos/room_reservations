import { IRoomSearchDTO } from "@modules/rooms/dtos/IRoomSearchDTO";
import { RoomDetailsByIdService } from "@modules/rooms/services/RoomDetailsByIdService";
import { RoomsAvailableByDateService } from "@modules/rooms/services/RoomsAvailableByDateService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class RoomController {
  async RoomAvailableByDate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const handleService = container.resolve(RoomsAvailableByDateService);

    const rooms = await handleService.find(
      request.query as unknown as IRoomSearchDTO
    );

    return response.status(200).json(rooms);
  }

  async RoomDetails(request: Request, response: Response): Promise<Response> {
    const handleService = container.resolve(RoomDetailsByIdService);

    const rooms = await handleService.find(request.params.id);

    return response.status(200).json(rooms);
  }
}

export { RoomController };
