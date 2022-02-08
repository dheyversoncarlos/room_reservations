import { Room } from "../entities/Room";

export default interface IRoomRepository {
  findById(id: string): Promise<Room>;
  findAvailableByDate(date: string): Promise<Room[]>;
}
