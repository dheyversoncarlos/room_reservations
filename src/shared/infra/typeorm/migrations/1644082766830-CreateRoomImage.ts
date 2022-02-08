import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRoomImage1644082766830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "room_images",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "room_id",
            type: "uuid",
          },
          {
            name: "image",
            type: "text",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "current_timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "current_timestamp",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "room_images",
      new TableForeignKey({
        name: "RoomImagesRoom",
        columnNames: ["room_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "rooms",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("room_images", "RoomImagesRoom");

    await queryRunner.dropTable("room_images");
  }
}
