import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventBriefing1645916732538 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "event_briefings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "event_type",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "brand_history",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "purpose",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "event_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "locale",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "attendes",
            type: "integer",
            isNullable: true,
          },
          {
            name: "theme",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "time_duration",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "music_attractions",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "other_attractions",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "sectors",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "special_sectors",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "obs",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("event_briefings");
  }

}
