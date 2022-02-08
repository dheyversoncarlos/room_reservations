import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSchedule1644082921324 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "schedules",
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
            name: "user_id",
            type: "uuid",
          },
          {
            name: "date",
            type: "date",
          },
          {
            name: "period",
            type: "enum",
            enum: ["MANHA", "TARDE", "NOITE"],
          },
          {
            name: "status",
            type: "enum",
            enum: ["DISPONIVEL", "INDISPONIVEL", "RESERVADA"],
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

    await queryRunner.createForeignKeys("schedules", [
      new TableForeignKey({
        name: "ScheduleRoom",
        columnNames: ["room_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "rooms",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        name: "ScheduleUser",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("schedules", [
      new TableForeignKey({
        name: "ScheduleRoom",
        columnNames: ["room_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "rooms",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        name: "ScheduleUser",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);

    await queryRunner.dropTable("schedules");
  }
}
