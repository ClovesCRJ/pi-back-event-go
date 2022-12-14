import { Briefing } from "src/app/briefing/entities/briefing.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("promotion_briefings")
export class PromotionBriefing {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Briefing, briefing => briefing.promotion_briefing, { onDelete: "CASCADE" })
  briefing: Briefing;

  @Column({ nullable: true })
  promotion_means: string;

  @Column({ nullable: true })
  alternative_media: string;

  @Column({ nullable: true })
  fisical_actions: string;

  @Column({ nullable: true })
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @Column({ nullable: true })
  designer: string;

  @Column({ nullable: true })
  video_maker: string;

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