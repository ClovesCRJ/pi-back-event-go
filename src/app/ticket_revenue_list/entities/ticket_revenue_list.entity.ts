import { Event } from "../../event/entities/event.entity";
import { TicketRevenue } from "../../ticket_revenue/entities/ticket_revenue.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("ticket_revenue_lists")
export class TicketRevenueList {
  @PrimaryColumn()
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.ticket_revenue_lists, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @OneToMany(() => TicketRevenue, ticket_revenue => ticket_revenue.ticket_revenue_list, {
    cascade: true,
  })
  ticket_revenues: TicketRevenue[];

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