import { Event } from "../../event/entities/event.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("user_permissions")
export class UserPermission {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  event_id: string;

  @ManyToOne(() => Event)
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column()
  briefing_read: boolean;

  @Column()
  briefing_write: boolean;

  @Column()
  check_list_read: boolean;

  @Column()
  check_list_write: boolean;

  @Column()
  costs_read: boolean;

  @Column()
  costs_write: boolean;

  @Column()
  ticket_revenue_read: boolean;

  @Column()
  ticket_revenue_write: boolean;

  @Column()
  event_revenue_read: boolean;

  @Column()
  event_revenue_write: boolean;

  @Column()
  finance_read: boolean;

  @Column()
  finance_write: boolean;

  @Column()
  booking_read: boolean;

  @Column()
  booking_write: boolean;

  @Column()
  tickets_list_read: boolean;

  @Column()
  tickets_list_write: boolean;

  @Column()
  annotation_read: boolean;

  @Column()
  annotation_write: boolean;

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