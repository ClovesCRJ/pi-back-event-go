import { Event } from "../../event/entities/event.entity";
import { UserPermission } from "../../user_permission/entities/user_permission.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Event, event => event.owner)
  events: Event[];

  @OneToMany(() => UserPermission, user_permisison => user_permisison.user)
  user_permissions: UserPermission[];

  @Column()
  surname: string;

  @Column()
  email: string;

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