import { Event } from "src/app/event/entities/event.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("annotations")
export class Annotation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.annotations, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}