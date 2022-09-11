import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTicketRevenue1645934413714 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ticket_revenues",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "ticket_revenue_list_id",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "quantity",
            type: "integer",
          },
          {
            name: "value_unit",
            type: "decimal",
          },
          {
            name: "taxes",
            type: "decimal",
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
            name: "fk_ticket_revenue_list",
            columnNames: ["ticket_revenue_list_id"],
            referencedTableName: "ticket_revenue_lists",
            referencedColumnNames: ["id"],
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ticket_revenues");
  }

}
