import { Manager } from 'src/manager/entity/manager.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DeleteDateColumn,
} from 'typeorm';
import { MenuItemType } from '../enums/menu-item-type.enum';
import { ColumnNumericTransformer } from './transformers/numeric.transformer';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Manager)
  @JoinColumn({ name: 'managerId' })
  manager: Manager;

  @Column('decimal', { scale: 2, transformer: new ColumnNumericTransformer() })
  price: number;

  @Column()
  type: MenuItemType;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
