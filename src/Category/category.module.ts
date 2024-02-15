import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CarbonDietUser } from 'src/entities/CarbonDietUser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CarbonDietUser]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
