import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { IAvailablesDTO } from "../dtos/IAvailablesDTO";
import IRoomRepository from "../infra/typeorm/IRepositories/IRoomRepository";
import IScheduleRepository from "../infra/typeorm/IRepositories/IScheduleRepository";

@injectable()
class AvailablesByRoomIdService {
  constructor(
    @inject("ScheduleRepository")
    private scheduleRepository: IScheduleRepository,

    @inject("RoomRepository")
    private roomRepository: IRoomRepository
  ) {}

  async find(id: string): Promise<IAvailablesDTO[]> {
    if (!id) {
      throw new AppError("Id not found", 406);
    }

    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new AppError("Id not exists", 404);
    }

    try {
      const availables = await this.scheduleRepository.findAvailablesByRoomId(
        id
      );

      return Promise.resolve(availables);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export { AvailablesByRoomIdService };
