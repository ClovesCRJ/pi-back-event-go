import { TicketRevenueList } from "../../ticket_revenue_list/entities/ticket_revenue_list.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("ticket_revenues")
export class TicketRevenue {
  @PrimaryColumn()
  id: string;

  @Column()
  ticket_revenue_list_id: string;

  @ManyToOne(() => TicketRevenueList, ticket_revenue_list => ticket_revenue_list.ticket_revenues, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: "ticket_revenue_list_id" })
  ticket_revenue_list: TicketRevenueList;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  value_unit: number;

  @Column()
  taxes: number;

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