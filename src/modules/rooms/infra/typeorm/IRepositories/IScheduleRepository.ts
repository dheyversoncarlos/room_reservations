import { IAvailablesDTO } from "@modules/rooms/dtos/IAvailablesDTO";
import { ICreateScheduleDTO } from "@modules/rooms/dtos/ICreateScheduleDTO";

import { Schedule } from "../entities/Schedule";

export default interface IScheduleRepository {
  findById(id: string): Promise<Schedule>;
  findAvailablesByRoomId(room_id: string): Promise<IAvailablesDTO[]>;
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  isAvailability(data: ICreateScheduleDTO): Promise<boolean>;
}
