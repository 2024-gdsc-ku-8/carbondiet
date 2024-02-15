import{
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { Category } from './Category.entity.js';
@Entity()
export class CarbonDietUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userid: string;
  @Column()
  passwordhash: string;
  @Column()
  username: string;
  @Column()
  gender: string;
  @Column()
  nickname: string;
  @OneToMany(() => Category, (category) => category.user) 
  categories: Category[];
}