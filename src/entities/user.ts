import {
  BaseEntity, Column, CreateDateColumn, Entity, JoinTable,
  ManyToMany, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';
import { Post } from './post';
import { Group } from './group';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({
      type: 'text',
    })
    @MinLength(5)
    name: string;

    @Column({
      type: 'text',
    })
    @MinLength(5)
    fieldOfStudy: string;

    @MinLength(5)
    @Column('text')
    password: string;

    @Column({ type: 'text', nullable: true })
    role?: string;

    @OneToMany(() => Post, (Posts) => Posts.user)
    posts: Post[];

    @ManyToMany(() => Group, (group) => group.users)
    @JoinTable()
    groups: Group[];

    @MinLength(5)
    @Column({ nullable: false, unique: true })
    @IsEmail()
    email: string;

    @Column({ nullable: true, unique: true })
    photo_url: string;

    @CreateDateColumn({
      type: 'timestamp',
    })
    created: string;
}
