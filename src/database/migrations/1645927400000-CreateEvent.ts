import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEvent1645927400000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "events",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "owner_id",
            type: "varchar",
          },
          {
            name: "briefing_id",
            type: "uuid",
            isUnique: true,
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
        foreignKeys: [
          {
            name: "fk_owner",
            columnNames: ["owner_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_briefing",
            columnNames: ["briefing_id"],
            referencedTableName: "briefings",
            referencedColumnNames: ["id"],
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
  }

}
