import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMarketingBriefing1645925019217 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "marketing_briefings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "strengths",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "weaknesses",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "what_change",
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
    await queryRunner.dropTable("marketing_briefings");
  }

}
