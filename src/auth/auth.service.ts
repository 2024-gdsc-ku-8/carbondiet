import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {compare,hash} from 'bcrypt';
import {Repository} from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { signUpDto } from './dtos/signUp.dto';
import { CarbonDietUser } from 'src/entities/CarbonDietUser.entity';
import { Payload } from './securities/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    private jwtService:JwtService,
    @InjectRepository(CarbonDietUser)
    private readonly userRepository: Repository<CarbonDietUser>
    ){}
    saltOrRounds=10;
    async signUp(signup: signUpDto){
       const{
        userid,
        password,
        username,
        gender,
        nickname,
       }=signup;
    if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/.test(password))
       throw new BadRequestException('password should be made within 9~16letters combined with numbers,capital letters, and small lettes')
    const userFind= await this.userRepository.findOne({
        where:{userid},
    });
    if(userFind)
        throw new HttpException('Userid already used!',HttpStatus.BAD_REQUEST);
    const passwordhash= await hash(password,this.saltOrRounds);
    const user= this.userRepository.create({
        userid,
        passwordhash,
        username,
        gender,
        nickname,
    });
    await this.userRepository.save(user)
    }
    async validateuser(loginDto:LoginDto){
        const user=await this.userRepository.findOne({
            where:{userid:loginDto.userid},
        }); 
        const passwordMatch = await compare(loginDto.password,user.passwordhash)
        if(!user||!passwordMatch){
            throw new UnauthorizedException(
                'there is no user or userid and password unmatched',
            );
        }
        const payload: Payload = { id: user.id, username: user.username };
        return {
            accessToken:this.jwtService.sign(payload)
        };
    }
    async tokenValidateuser(payload:Payload){
        return await this.userRepository.findOne({
            where: {id: payload.id},
    })
    }
}