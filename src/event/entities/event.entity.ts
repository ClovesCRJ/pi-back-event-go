import { Briefing } from "../../briefing/entities/briefing.entity";
import { CheckList } from "../../check_list/entities/check_list.entity";
import { CostList } from "../../cost_list/entities/cost_list.entity";
import { EventRevenue } from "../../event_revenue/entities/event_revenue.entity";
import { TicketRevenueList } from "../../ticket_revenue_list/entities/ticket_revenue_list.entity";
import { User } from "../../user/entities/user.entity";
import { UserPermission } from "../../user_permission/entities/user_permission.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("events")
export class Event {
  @PrimaryColumn()
  id: string;

  @Column()
  owner_id: string;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @OneToMany(() => UserPermission, user_permission => user_permission.event)
  user_permissions: UserPermission[];

  @OneToMany(() => CheckList, check_list => check_list.event)
  check_lists: CheckList[];

  @OneToMany(() => CostList, cost_list => cost_list.event)
  cost_lists: CostList[];

  @OneToMany(() => TicketRevenueList, ticket_revenue_list => ticket_revenue_list.event)
  ticket_revenue_lists: TicketRevenueList[];

  @OneToMany(() => EventRevenue, event_revenue => event_revenue.event)
  event_revenues: EventRevenue[];

  @Column()
  briefing_id: string;

  @OneToOne(() => Briefing)
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