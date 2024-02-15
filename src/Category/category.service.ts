import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/Category.entity';
import { CarbonDietUser } from 'src/entities/CarbonDietUser.entity';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import {Between} from 'typeorm'; 
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(CarbonDietUser)
    private userRepository: Repository<CarbonDietUser>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { userid, time, food, carbon } = createCategoryDto;
    const user = await this.userRepository.findOne({ where: { userid } });
    if (!user) {
      throw new Error('User not found');
    }
    const category = this.categoryRepository.create({
      user,
      time,
      food,
      carbon,
    });
    return this.categoryRepository.save(category);
  }

  async findCategoriesByDate(userid: string, date: string) {
    const user = await this.userRepository.findOne({ where: { userid } });
    if (!user) {
      throw new Error('User not found');
    }
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    return this.categoryRepository.find({
      where: { user, time: Between(startDate, endDate) },
    });
  }

  async findMonthlyCarbon(userid: string, month: string, year: string) {
    const user = await this.userRepository.findOne({ where: { userid } });
    if (!user) {
      throw new Error('User not found');
    }
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(`${year}-${month}-01`);
    endDate.setMonth(endDate.getMonth() + 1);
    const categories = await this.categoryRepository.find({
      where: { user, time: Between(startDate, endDate) },
    });
    return categories.reduce((acc, curr) => acc + curr.carbon, 0);
  }
  async deleteCategoriesByDate(userid: string, date: string) {
    const user = await this.userRepository.findOne({ where: { userid } });
    if (!user) {
      throw new Error('User not found');
    }
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    await this.categoryRepository.delete({
      user,
      time: Between(startDate, endDate),
    });
  }
}
