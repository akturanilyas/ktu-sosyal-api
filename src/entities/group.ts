import { MinLength } from 'class-validator';
import {
  BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post';
import { User } from './user';

@Entity('groups')
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({
      type: 'text',
      nullable: true,
    })
    @MinLength(5)
    name: string;

    @OneToMany(() => Post, (Posts) => Posts.group)
    posts: Post[];

    @ManyToMany(() => User, (user) => user.groups)
    users: User[];

    @ManyToMany(() => User, { cascade: true })
    @JoinTable()
    admins: User[];

    @Column({
      type: 'text',
      nullable: true,
    })
    faculty: string;

    @CreateDateColumn({
      type: 'timestamp',
    })
    created: string;
}
