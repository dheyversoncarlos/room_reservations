import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1644082747556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "text",
          },
          {
            name: "email",
            type: "text",
            isUnique: true,
          },
          {
            name: "avatar",
            type: "text",
            isNullable: true,
          },
          {
            name: "password",
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
