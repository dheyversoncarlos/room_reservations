import moment from "moment";
import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { ICreateScheduleDTO } from "../dtos/ICreateScheduleDTO";
import { EScheduleStatus, Schedule } from "../infra/typeorm/entities/Schedule";
import IRoomRepository from "../infra/typeorm/IRepositories/IRoomRepository";
import IScheduleRepository from "../infra/typeorm/IRepositories/IScheduleRepository";

@injectable()
class CreateScheduleService {
  constructor(
    @inject("ScheduleRepository")
    private scheduleRepository: IScheduleRepository,

    @inject("RoomRepository")
    private roomRepository: IRoomRepository
  ) {}

  async execute(data: ICreateScheduleDTO): Promise<Schedule> {
    try {
      const room = await this.roomRepository.findById(data.room_id);

      if (!room) {
        throw new AppError("Room not exists", 404);
      }

      const isAvailability = await this.scheduleRepository.isAvailability(data);

      if (!isAvailability || data.date <= moment().utc().format("yyyy-MM-DD")) {
        throw new AppError("Room unavailable ", 422);
      }

      data.status = EScheduleStatus.RESERVADA;
      const schedule = this.scheduleRepository.create(data);

      return schedule;
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export { CreateScheduleService };
