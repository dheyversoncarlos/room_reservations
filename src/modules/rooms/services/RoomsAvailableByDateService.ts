import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { IRoomSearchDTO } from "../dtos/IRoomSearchDTO";
import { Room } from "../infra/typeorm/entities/Room";
import IRoomRepository from "../infra/typeorm/IRepositories/IRoomRepository";

@injectable()
class RoomsAvailableByDateService {
  constructor(
    @inject("RoomRepository")
    private roomRepository: IRoomRepository
  ) {}

  async find({ date }: IRoomSearchDTO): Promise<Room[]> {
    if (!date) {
      throw new AppError("Date not found", 406);
    }

    try {
      const rooms = await this.roomRepository.findAvailableByDate(date);
      return Promise.resolve(rooms);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export { RoomsAvailableByDateService };
