import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonDietUser } from 'src/entities/CarbonDietUser.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './securities/passport.jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([CarbonDietUser]),JwtModule.register({
    secret:'SECRET_KEY',
    signOptions:{expiresIn:'1h'},
  }),
  PassportModule.register({defaultStrategy:'jwt'})
],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
