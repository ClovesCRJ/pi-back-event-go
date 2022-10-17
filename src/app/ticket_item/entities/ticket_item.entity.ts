import { TicketList } from "src/app/ticket_list/entities/ticket_list.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("ticket_items")
export class TicketItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  ticket_list_id: string;

  @ManyToOne(() => TicketList, ticket_list => ticket_list.ticket_items)
  @JoinColumn({ name: "ticket_list_id" })
  ticket_list: TicketList;

  @Column()
  name: string;

  @Column()
  sale_value: number;

  @Column()
  quantity_sold: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}