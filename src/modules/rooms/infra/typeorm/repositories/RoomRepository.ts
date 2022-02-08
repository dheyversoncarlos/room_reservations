import moment from "moment";
import { getRepository, Repository } from "typeorm";

import { Room } from "../entities/Room";
import IRoomRepository from "../IRepositories/IRoomRepository";

class RoomRepository implements IRoomRepository {
  private ormRepository: Repository<Room>;

  constructor() {
    this.ormRepository = getRepository(Room);
  }

  async findAvailableByDate(date: string): Promise<Room[]> {
    const idsUnavailable = await this.unavailableRooms(date);
    let rooms: Room[];
    if (idsUnavailable.length) {
      rooms = await this.ormRepository
        .createQueryBuilder("room")
        .select(["room"])
        .where("room.id NOT IN (:...ids) ", { ids: idsUnavailable })
        .getMany();
    } else {
      rooms = await this.ormRepository
        .createQueryBuilder("room")
        .select(["room"])
        .getMany();
    }

    return rooms;
  }

  async findById(id: string): Promise<Room> {
    const room = await this.ormRepository.findOne({ id });

    return room;
  }

  async unavailableRooms(date: string): Promise<string[]> {
    const unavailableRooms = await this.ormRepository
      .createQueryBuilder("room")
      .leftJoinAndSelect("room.schedules", "schedule")
      .select(["room.id"])
      .where("schedule.date = :date ", {
        date: moment(date).utc().format("yyyy-MM-DD"),
      })
      .getMany();

    return unavailableRooms.map((item) => {
      return item.id;
    });
  }
}

export { RoomRepository };
