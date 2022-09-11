import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePublicBriefing1645923721172 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "public_briefings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "target_public",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "gender",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "age_group",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "socioeconomic",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "origin_city",
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
    await queryRunner.dropTable("public_briefings");
  }

}
