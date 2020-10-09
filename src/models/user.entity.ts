import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './gender';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id!: number;

  @Column({
    type: 'varchar',
    name: 'full_name',
    length: 100,
  })
  fullName!: string;

  @Column({
    type: 'date',
  })
  dob!: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender!: Gender;
}
