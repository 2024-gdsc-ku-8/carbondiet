import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CarbonDietUser } from './CarbonDietUser.entity'; 

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'date'})
  time: Date;

  @Column()
  food: string;

  @Column()
  carbon: number;

  @ManyToOne(
    () => CarbonDietUser,
    (carbonDietUser) => carbonDietUser.categories,) 
  user: CarbonDietUser;
}
