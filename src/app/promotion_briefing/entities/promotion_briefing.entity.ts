import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("promotion_briefings")
export class PromotionBriefing {
  @PrimaryColumn()
  id: string;

  @Column()
  promotion_means: string;

  @Column()
  alternative_media: string;

  @Column()
  fisical_actions: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  designer: string;

  @Column()
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