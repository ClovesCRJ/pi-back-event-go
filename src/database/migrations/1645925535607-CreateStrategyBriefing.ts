import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStrategyBriefing1645925535607 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "strategy_briefings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "opportunities",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "threats",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "extra_attractions",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "extra_services",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "promotion_strategies",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "sales_strategies",
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
    await queryRunner.dropTable("strategy_briefings");
  }

}
