import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCheckItem1645928622576 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "check_items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "check_list_id",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "checked",
            type: "boolean",
          },
          {
            name: "status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "obs",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "next_step",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "deadline",
            type: "timestamp",
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
            name: "fk_check_list",
            columnNames: ["check_list_id"],
            referencedTableName: "check_lists",
            referencedColumnNames: ["id"],
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("check_items");
  }

}
