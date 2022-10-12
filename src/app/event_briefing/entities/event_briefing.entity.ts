import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("event_briefings")
export class EventBriefing {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  event_type: string;

  @Column()
  brand_history: string;

  @Column()
  purpose: string;

  @Column()
  event_date: Date;

  @Column()
  locale: string;

  @Column()
  attendes: number;

  @Column()
  theme: string;

  @Column()
  time_duration: string;

  @Column()
  music_attractions: string;

  @Column()
  other_attractions: string;

  @Column()
  sectors: string;

  @Column()
  special_sectors: string;

  @Column()
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