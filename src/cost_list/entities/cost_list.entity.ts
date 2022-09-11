import { CostItem } from "src/cost_item/entities/cost_item.entity";
import { Event } from "src/event/entities/event.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("cost_lists")
export class CostList {
  @PrimaryColumn()
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.cost_lists)
  @JoinColumn({ name: "event_id" })
  event: Event;

  @OneToMany(() => CostItem, cost_item => cost_item.cost_list)
  cost_items: CostItem[];

  @Column()
  name: string;

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