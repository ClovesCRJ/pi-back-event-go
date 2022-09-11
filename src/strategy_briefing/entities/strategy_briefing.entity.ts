import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("strategy_briefings")
export class StrategyBriefing {
  @PrimaryColumn()
  id: string;

  @Column()
  opportunities: string;

  @Column()
  threats: string;

  @Column()
  extra_attractions: string;

  @Column()
  extra_services: string;

  @Column()
  promotion_strategies: string;

  @Column()
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