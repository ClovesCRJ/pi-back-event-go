import { EventBriefing } from "../../event_briefing/entities/event_briefing.entity";
import { MarketingBriefing } from "../../marketing_briefing/entities/marketing_briefing.entity";
import { PromotionBriefing } from "../../promotion_briefing/entities/promotion_briefing.entity";
import { PublicBriefing } from "../../public_briefing/entities/public_briefing.entity";
import { StrategyBriefing } from "../../strategy_briefing/entities/strategy_briefing.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Event } from "src/app/event/entities/event.entity";

@Entity("briefings")
export class Briefing {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Event, event => event.briefing, { onDelete: "CASCADE" })
  event: Event;

  @Column()
  event_briefing_id: string;

  @OneToOne(() => EventBriefing, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "event_briefing_id" })
  event_briefing: EventBriefing;

  @Column()
  public_briefing_id: string;

  @OneToOne(() => PublicBriefing, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "public_briefing_id" })
  public_briefing: PublicBriefing;

  @Column()
  marketing_briefing_id: string;
  
  @OneToOne(() => MarketingBriefing, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "marketing_briefing_id" })
  marketing_briefing: MarketingBriefing;

  @Column()
  strategy_briefing_id: string;
  
  @OneToOne(() => StrategyBriefing, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "strategy_briefing_id" })
  strategy_briefing: StrategyBriefing;

  @Column()
  promotion_briefing_id: string;
  
  @OneToOne(() => PromotionBriefing, { eager: true, onDelete: 'CASCADE' })
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