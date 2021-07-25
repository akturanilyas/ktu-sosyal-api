import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('helps')
export class Help extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({
      type: 'text',
    })
    content: string;

    @Column({
      type: 'text',
    })
    text: string;
}
