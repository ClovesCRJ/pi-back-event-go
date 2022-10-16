import { BookingItem } from "src/app/booking_item/entities/booking_item.entity";
import { Event } from "src/app/event/entities/event.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("booking_lists")
export class BookingList {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.booking_lists)
  @JoinColumn({ name: "event_id" })
  event: Event;

  @OneToMany(() => BookingItem, booking_item => booking_item.booking_list, {
    cascade: true,
  })
  booking_items: BookingItem[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}