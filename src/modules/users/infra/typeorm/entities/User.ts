import { Exclude, Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.HOST_API}:${process.env.PORT_API}/avatar/${this.avatar}`
      : null;
  }
}

export { User };
