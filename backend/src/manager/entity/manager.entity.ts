
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 ,unique:true})
  username: string;

  @Column('text' , {unique:true})
  email: string;

  @Column({length:100 , unique:true})
  restaurant: string;

  @Column({ length: 100 })
  password: string;

}
