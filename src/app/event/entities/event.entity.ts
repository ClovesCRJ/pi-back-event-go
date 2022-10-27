import { Briefing } from "../../briefing/entities/briefing.entity";
import { CheckList } from "../../check_list/entities/check_list.entity";
import { CostList } from "../../cost_list/entities/cost_list.entity";
import { EventRevenue } from "../../event_revenue/entities/event_revenue.entity";
import { TicketRevenueList } from "../../ticket_revenue_list/entities/ticket_revenue_list.entity";
import { User } from "../../user/entities/user.entity";
import { UserPermission } from "../../user_permission/entities/user_permission.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CashInFlow } from "src/app/cash_in_flow/entities/cash_in_flow.entity";
import { CashOutFlow } from "src/app/cash_out_flow/entities/cash_out_flow.entity";
import { BookingList } from "src/app/booking_list/entities/booking_list.entity";
import { TicketList } from "src/app/ticket_list/entities/ticket_list.entity";
import { Annotation } from "src/app/annotation/entities/annotation.entity";

@Entity("events")
export class Event {
  @PrimaryColumn()
  id: string;

  @Column()
  owner_id: string;

  @ManyToOne(() => User, user => user.events, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @OneToMany(() => UserPermission, user_permission => user_permission.event, {
    cascade: true,
  })
  user_permissions: UserPermission[];

  @OneToMany(() => CheckList, check_list => check_list.event, {
    cascade: ["remove"],
  })
  check_lists: CheckList[];

  @OneToMany(() => CostList, cost_list => cost_list.event, {
    cascade: ["remove"],
  })
  cost_lists: CostList[];

  @OneToMany(() => TicketRevenueList, ticket_revenue_list => ticket_revenue_list.event, {
    cascade: ["remove"],
  })
  ticket_revenue_lists: TicketRevenueList[];

  @OneToMany(() => EventRevenue, event_revenue => event_revenue.event, {
    cascade: ["remove"],
  })
  event_revenues: EventRevenue[];

  @OneToMany(() => CashInFlow, cash_in_flow => cash_in_flow.event, {
    cascade: ["remove"],
  })
  cash_in_flows: CashInFlow[];

  @OneToMany(() => CashOutFlow, cash_out_flow => cash_out_flow.event, {
    cascade: ["remove"],
  })
  cash_out_flows: CashOutFlow[];

  @OneToMany(() => BookingList, booking_list => booking_list.event, {
    cascade: ["remove"],
  })
  booking_lists: BookingList[];

  @OneToMany(() => TicketList, ticket_list => ticket_list.event, {
    cascade: ["remove"],
  })
  ticket_lists: TicketList[];

  @OneToMany(() => Annotation, annotation => annotation.event, {
    cascade: ["remove"],
  })
  annotations: Annotation[];

  @Column()
  briefing_id: string;

  @OneToOne(() => Briefing, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "briefing_id" })
  briefing: Briefing;

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