import { Briefing } from "src/app/briefing/entities/briefing.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("marketing_briefings")
export class MarketingBriefing {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Briefing, briefing => briefing.marketing_briefing, { onDelete: "CASCADE" })
  briefing: Briefing;

  @Column({ nullable: true })
  strengths: string;

  @Column({ nullable: true })
  weaknesses: string;

  @Column({ nullable: true })
  what_change: string;

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