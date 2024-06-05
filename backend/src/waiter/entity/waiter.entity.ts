import { Manager } from '../../manager/entity/manager.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['token', 'manager'])
export class Waiter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 10 })
  token: string;

  @ManyToOne(() => Manager)
  @JoinColumn({ name: 'managerId' })
  manager: Manager;
}
