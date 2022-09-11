import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePromotionBriefing1645926087322 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "promotion_briefings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "promotion_means",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "alternative_media",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "fisical_actions",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "start",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "end",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "designer",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "video_maker",
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
    await queryRunner.dropTable("promotion_briefings");
  }

}
