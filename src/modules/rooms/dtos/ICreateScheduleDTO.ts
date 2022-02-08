import {
  ESchedulePeriod,
  EScheduleStatus,
} from "../infra/typeorm/entities/Schedule";

export interface ICreateScheduleDTO {
  user_id: string;
  room_id: string;
  date: string;
  period: ESchedulePeriod;
  status: EScheduleStatus;
}
