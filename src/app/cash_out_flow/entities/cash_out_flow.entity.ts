import { Event } from "src/app/event/entities/event.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("cash_out_flow")
export class CashOutFlow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.cash_out_flows, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}