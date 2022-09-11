import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserPermission1645927500000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_permissions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "event_id",
            type: "uuid",
          },
          {
            name: "briefing_read",
            type: "boolean",
          },
          {
            name: "briefing_write",
            type: "boolean",
          },
          {
            name: "check_list_read",
            type: "boolean",
          },
          {
            name: "check_list_write",
            type: "boolean",
          },
          {
            name: "costs_read",
            type: "boolean",
          },
          {
            name: "costs_write",
            type: "boolean",
          },
          {
            name: "ticket_revenue_read",
            type: "boolean",
          },
          {
            name: "ticket_revenue_write",
            type: "boolean",
          },
          {
            name: "event_revenue_read",
            type: "boolean",
          },
          {
            name: "event_revenue_write",
            type: "boolean",
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
            name: "fk_user",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_event",
            columnNames: ["event_id"],
            referencedTableName: "events",
            referencedColumnNames: ["id"],
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_permissions");
  }

}
