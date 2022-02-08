import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Room } from "./Room";

export enum ESchedulePeriod {
  MANHA = "MANHA",
  TARDE = "TARDE",
  NOITE = "NOITE",
}

export enum EScheduleStatus {
  DISPONIVEL = "DISPONIVEL",
  INDISPONIVEL = "INDISPONIVEL",
  RESERVADA = "RESERVADA",
}

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  room_id: string;

  @Column("uuid")
  user_id: string;

  @CreateDateColumn()
  date: string;

  @Column({
    type: "enum",
    enum: ESchedulePeriod,
  })
  period: ESchedulePeriod;

  @Column({
    type: "enum",
    enum: EScheduleStatus,
  })
  status: EScheduleStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Room, (room) => room.schedules)
  @JoinColumn([
    {
      name: "room_id",
      referencedColumnName: "id",
    },
  ])
  room: Room;
}

export { Schedule };
