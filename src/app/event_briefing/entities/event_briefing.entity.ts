import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("event_briefings")
export class EventBriefing {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  event_type: string;

  @Column({ nullable: true })
  brand_history: string;

  @Column({ nullable: true })
  purpose: string;

  @Column({ nullable: true })
  event_date: Date;

  @Column({ nullable: true })
  locale: string;

  @Column({ nullable: true })
  attendes: number;

  @Column({ nullable: true })
  theme: string;

  @Column({ nullable: true })
  time_duration: string;

  @Column({ nullable: true })
  music_attractions: string;

  @Column({ nullable: true })
  other_attractions: string;

  @Column({ nullable: true })
  sectors: string;

  @Column({ nullable: true })
  special_sectors: string;

  @Column({ nullable: true })
  obs: string;

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