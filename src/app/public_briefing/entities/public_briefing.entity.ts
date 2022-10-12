import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("public_briefings")
export class PublicBriefing {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  target_public: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  age_group: string;

  @Column({ nullable: true })
  socioeconomic: string;

  @Column({ nullable: true })
  origin_city: string;

  @Column({ nullable: true })
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