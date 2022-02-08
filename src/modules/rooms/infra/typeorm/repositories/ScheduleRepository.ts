import { IAvailablesDTO } from "@modules/rooms/dtos/IAvailablesDTO";
import { ICreateScheduleDTO } from "@modules/rooms/dtos/ICreateScheduleDTO";
import IScheduleRepository from "@modules/rooms/infra/typeorm/IRepositories/IScheduleRepository";
import moment from "moment";
import { getRepository, MoreThan, Repository } from "typeorm";

import { Schedule } from "../entities/Schedule";

class ScheduleRepository implements IScheduleRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  async findById(id: string): Promise<Schedule> {
    const schedule = await this.ormRepository.findOne({ id });
    return schedule;
  }

  async findAvailablesByRoomId(room_id: string): Promise<IAvailablesDTO[]> {
    const unavailables = await this.ormRepository.find({
      where: {
        room_id,
        date: MoreThan(moment().utc().format("yyyy-MM-DD")),
      },
    });

    const availables: IAvailablesDTO[] = [];
    const periods = ["MANHA", "TARDE", "NOITE"];

    let i = 0;
    let now = moment().utc().add(1, "days").format("yyyy-MM-DD");
    while (i < 7) {
      for await (const period of periods) {
        const unavailability = unavailables.filter(
          (item) =>
            moment(item.date).utc().format("yyyy-MM-DD") === now &&
            item.period === period
        );

        if (!unavailability.length) {
          availables.push({
            room_id,
            date: now,
            period,
          });
        }
      }
      now = moment(now).utc().add(1, "days").format("yyyy-MM-DD");
      i++;
    }

    return availables;
  }

  async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = await this.ormRepository
      .createQueryBuilder()
      .insert()
      .into("Schedule")
      .values({
        room_id: data.room_id,
        date: moment(data.date).add(1, "day").format("yyyy-MM-DD"),
        period: data.period,
        user_id: data.user_id,
        status: data.status,
      })
      .returning("*")
      .execute();

    if (schedule.raw.length) {
      return schedule.raw[0];
    }
    return Promise.reject();
  }

  async isAvailability(data: ICreateScheduleDTO): Promise<boolean> {
    const reservations = await this.ormRepository.find(data);

    if (reservations.length) {
      return false;
    }
    return true;
  }
}

export { ScheduleRepository };
