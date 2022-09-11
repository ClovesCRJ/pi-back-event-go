import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBriefing1645927000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "briefings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "event_briefing_id",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "public_briefing_id",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "marketing_briefing_id",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "strategy_briefing_id",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "promotion_briefing_id",
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
            name: "fk_event_briefing",
            columnNames: ["event_briefing_id"],
            referencedTableName: "event_briefings",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_public_briefing",
            columnNames: ["public_briefing_id"],
            referencedTableName: "public_briefings",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_marketing_briefing",
            columnNames: ["marketing_briefing_id"],
            referencedTableName: "marketing_briefings",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_strategy_briefing",
            columnNames: ["strategy_briefing_id"],
            referencedTableName: "strategy_briefings",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_promotion_briefing",
            columnNames: ["promotion_briefing_id"],
            referencedTableName: "promotion_briefings",
            referencedColumnNames: ["id"],
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("briefings");
  }

}
