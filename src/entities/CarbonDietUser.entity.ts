import{
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CarbonDietUser{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    userid:string;
    @Column()
    passwordhash:string;
    @Column()
    username:string;
    @Column()
    gender:string;
    @Column()
    nickname:string;
}