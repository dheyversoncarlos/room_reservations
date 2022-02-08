import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Schedule } from "./Schedule";

@Entity("rooms")
class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address_street: string;

  @Column()
  address_number: number;

  // optional
  @Column()
  address_complement: string;

  @Column()
  address_district: string;

  @Column()
  address_city: string;

  @Column()
  address_state: string;

  @Column()
  address_country: string;

  @Column()
  address_postal_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.room)
  schedules: Schedule[];
}

export { Room };
