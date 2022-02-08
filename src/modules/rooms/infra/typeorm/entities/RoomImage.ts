import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("room_images")
class RoomImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  room_id: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "image_url" })
  getAvatarUrl(): string | null {
    return this.image
      ? `${process.env.HOST_API}:${process.env.PORT_API}/roomimages/${this.image}`
      : null;
  }
}

export default RoomImage;
