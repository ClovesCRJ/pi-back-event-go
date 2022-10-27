import { BookingList } from "src/app/booking_list/entities/booking_list.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("booking_items")
export class BookingItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  booking_list_id: string;

  @ManyToOne(() => BookingList, booking_list => booking_list.booking_items, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: "booking_list_id" })
  booking_list: BookingList;

  @Column()
  code: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  contact: string;

  @Column()
  value: number;

  @Column({ nullable: true })
  payed: number;

  @Column({ nullable: true })
  payment_method: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}