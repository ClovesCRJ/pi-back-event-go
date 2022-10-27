import { Event } from "src/app/event/entities/event.entity";
import { TicketItem } from "src/app/ticket_item/entities/ticket_item.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("ticket_list")
export class TicketList {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.ticket_lists, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @OneToMany(() => TicketItem, ticket_item => ticket_item.ticket_list, {
    cascade: true,
  })
  ticket_items: TicketItem[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}