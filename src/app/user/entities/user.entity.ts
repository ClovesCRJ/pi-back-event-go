import { Event } from "../../event/entities/event.entity";
import { UserPermission } from "../../user_permission/entities/user_permission.entity";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @OneToMany(() => Event, event => event.owner, {
    cascade: ["remove"],
  })
  events: Event[];

  @OneToMany(() => UserPermission, user_permisison => user_permisison.user, {
    cascade: ["remove"],
  })
  user_permissions: UserPermission[];

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}