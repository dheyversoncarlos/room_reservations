import IRoomRepository from "@modules/rooms/infra/typeorm/IRepositories/IRoomRepository";
import IScheduleRepository from "@modules/rooms/infra/typeorm/IRepositories/IScheduleRepository";
import { RoomRepository } from "@modules/rooms/infra/typeorm/repositories/RoomRepository";
import { ScheduleRepository } from "@modules/rooms/infra/typeorm/repositories/ScheduleRepository";
import IUsersRepository from "@modules/users/infra/typeorm/IRepositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IRoomRepository>("RoomRepository", RoomRepository);

container.registerSingleton<IScheduleRepository>(
  "ScheduleRepository",
  ScheduleRepository
);
