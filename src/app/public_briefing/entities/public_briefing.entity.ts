import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("public_briefings")
export class PublicBriefing {
  @PrimaryColumn()
  id: string;

  @Column()
  target_public: string;

  @Column()
  gender: string;

  @Column()
  age_group: string;

  @Column()
  socioeconomic: string;

  @Column()
  origin_city: string;

  @Column()
  obs: string;

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