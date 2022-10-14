import { CheckList } from "../../check_list/entities/check_list.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("check_items")
export class CheckItem {
  @PrimaryColumn()
  id: string;

  @Column()
  check_list_id: string;

  @ManyToOne(() => CheckList, check_list => check_list.check_items)
  @JoinColumn({ name: "check_list_id" })
  check_list: CheckList;

  @Column()
  name: string;

  @Column({default: false})
  checked: boolean;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  obs: string;

  @Column({ nullable: true })
  next_step: string;

  @Column({ nullable: true })
  deadline: Date;

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