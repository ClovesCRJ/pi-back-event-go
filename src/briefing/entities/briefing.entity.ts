import { EventBriefing } from "src/event_briefing/entities/event_briefing.entity";
import { MarketingBriefing } from "src/marketing_briefing/entities/marketing_briefing.entity";
import { PromotionBriefing } from "src/promotion_briefing/entities/promotion_briefing.entity";
import { PublicBriefing } from "src/public_briefing/entities/public_briefing.entity";
import { StrategyBriefing } from "src/strategy_briefing/entities/strategy_briefing.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("briefings")
export class Briefing {
  @PrimaryColumn()
  id: string;

  @Column()
  event_briefing_id: string;

  @OneToOne(() => EventBriefing)
  @JoinColumn({ name: "event_briefing_id" })
  event_briefing: EventBriefing;

  @Column()
  public_briefing_id: string;

  @OneToOne(() => PublicBriefing)
  @JoinColumn({ name: "public_briefing_id" })
  public_briefing: PublicBriefing;

  @Column()
  marketing_briefing_id: string;
  
  @OneToOne(() => MarketingBriefing)
  @JoinColumn({ name: "marketing_briefing_id" })
  marketing_briefing: MarketingBriefing;

  @Column()
  strategy_briefing_id: string;
  
  @OneToOne(() => StrategyBriefing)
  @JoinColumn({ name: "strategy_briefing_id" })
  strategy_briefing: StrategyBriefing;

  @Column()
  promotion_briefing_id: string;
  
  @OneToOne(() => PromotionBriefing)
  @JoinColumn({ name: "promotion_briefing_id" })
  promotion_briefing: PromotionBriefing;

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