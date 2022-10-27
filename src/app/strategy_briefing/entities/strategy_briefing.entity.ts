import { Briefing } from "src/app/briefing/entities/briefing.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("strategy_briefings")
export class StrategyBriefing {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Briefing, briefing => briefing.strategy_briefing, { onDelete: "CASCADE" })
  briefing: Briefing;

  @Column({ nullable: true })
  opportunities: string;

  @Column({ nullable: true })
  threats: string;

  @Column({ nullable: true })
  extra_attractions: string;

  @Column({ nullable: true })
  extra_services: string;

  @Column({ nullable: true })
  promotion_strategies: string;

  @Column({ nullable: true })
  sales_strategies: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}