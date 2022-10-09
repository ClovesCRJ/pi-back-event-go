import { CheckItem } from "../../check_item/entities/check_item.entity";
import { Event } from "../../event/entities/event.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("check_lists")
export class CheckList {
  @PrimaryColumn()
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.check_lists)
  @JoinColumn({ name: "event_id" })
  event: Event;

  @OneToMany(() => CheckItem, check_item => check_item.check_list)
  check_items: CheckItem[];

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