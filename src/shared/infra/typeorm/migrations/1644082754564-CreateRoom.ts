import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoom1644082754564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rooms",
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
            name: "description",
            type: "text",
          },
          {
            name: "address_street",
            type: "text",
          },
          {
            name: "address_number",
            type: "integer",
          },
          {
            name: "address_complement",
            type: "text",
            isNullable: true,
          },
          {
            name: "address_district",
            type: "text",
          },
          {
            name: "address_city",
            type: "text",
          },
          {
            name: "address_state",
            type: "text",
          },
          {
            name: "address_country",
            type: "text",
          },
          {
            name: "address_postal_code",
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
    await queryRunner.dropTable("rooms");
  }
}
