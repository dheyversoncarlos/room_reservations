import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { Room } from "../infra/typeorm/entities/Room";
import IRoomRepository from "../infra/typeorm/IRepositories/IRoomRepository";

@injectable()
class RoomDetailsByIdService {
  constructor(
    @inject("RoomRepository")
    private roomRepository: IRoomRepository
  ) {}

  async find(id: string): Promise<Room> {
    if (!id) {
      throw new AppError("Id not found", 406);
    }

    try {
      const room = await this.roomRepository.findById(id);

      if (!room) {
        throw new AppError("Id not exists", 404);
      }

      return Promise.resolve(room);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export { RoomDetailsByIdService };
