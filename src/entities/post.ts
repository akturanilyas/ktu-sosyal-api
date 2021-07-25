import {
  BaseEntity, Column, CreateDateColumn, Entity,
  JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group';
import { Reply } from './reply';
import { User } from './user';

@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({
      type: 'text',
      unique: true,
    })
  content: string;

    @Column({
      type: 'text',
      unique: true,
      nullable: true,
    })
    image_url: string;

    @CreateDateColumn({
      type: 'timestamp',
    })
    created: string;

    @ManyToOne(() => Group, (group) => group.posts, { nullable: true })
    @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
    group: Group;

    @OneToMany(() => Reply, (Reply) => Reply.posts)
    replies: Reply[];

    @ManyToOne(() => User, (user) => user.posts, { nullable: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}
