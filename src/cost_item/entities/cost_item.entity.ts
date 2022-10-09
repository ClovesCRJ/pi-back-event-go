import { CostList } from "../../cost_list/entities/cost_list.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("cost_items")
export class CostItem {
  @PrimaryColumn()
  id: string;

  @Column()
  cost_list_id: string;

  @ManyToOne(() => CostList, cost_list => cost_list.cost_items)
  @JoinColumn({ name: "cost_list_id" })
  cost_list: CostList;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @Column()
  spent: number;

  @Column()
  responsible: string;

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