import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCostItem1645931305659 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cost_items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "cost_list_id",
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
            name: "value",
            type: "decimal",
          },
          {
            name: "spent",
            type: "decimal",
          },
          {
            name: "responsible",
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
        foreignKeys: [
          {
            name: "fk_cost_list",
            columnNames: ["cost_list_id"],
            referencedTableName: "cost_lists",
            referencedColumnNames: ["id"],
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cost_items");
  }

}
