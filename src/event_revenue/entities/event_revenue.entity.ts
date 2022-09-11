import { Event } from "src/event/entities/event.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("event_revenues")
export class EventRevenue {
  @PrimaryColumn()
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.event_revenues)
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column()
  name: string;

  @Column()
  value_unit: number;
  
  @Column()
  quantity: number;

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