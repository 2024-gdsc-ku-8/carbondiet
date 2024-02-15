import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from './dtos/createCategory.dto'; 
import { DocumentedException } from 'src/docsException';
@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @ApiOperation({
    description:
      'userid에 해당하는 유저에게 category 생성 Authorization Header에 bearer accessToken 넣어줘요',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 or invalid',
    type: DocumentedException,
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'category 생성',
  })
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('/:userid/date')
  @ApiOperation({
    description:
      'userid와 date로 category 조회하기 Authorization Header에 bearer accessToken 넣어줘요',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 or invalid',
    type: DocumentedException,
  })
  @ApiParam({
    name: 'userid',
    description: '사용자의 id',
    required: true,
    type: String,
    example: 'Korea12',
  })
  @ApiQuery({
    name: 'date',
    description: '조회할 날짜',
    required: true,
    type: String,
    example: '2024-02-14',
  })
  async getCategoriesByDate(
    @Param('userid') userid: string,
    @Query('date') date: string,
  ) {
    return this.categoryService.findCategoriesByDate(userid, date);
  }

  @Get('/:userid/monthly-carbon')
  @ApiOperation({
    description:
      'userid와 year,month로 category 조회하기 Authorization Header에 bearer accessToken 넣어줘요',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 or invalid',
    type: DocumentedException,
  })
  @ApiParam({
    name: 'userid',
    description: '사용자의 id',
    required: true,
    type: String,
    example: 'Korea12',
  })
  @ApiQuery({
    name: 'year',
    description: '조회할 년도',
    required: true,
    type: Number,
    example: 2024,
  })
  @ApiQuery({
    name: 'month',
    description: '조회할 월',
    required: true,
    type: Number,
    example: 2,
  })
  async getMonthlyCarbon(
    @Param('userid') userid: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.categoryService.findMonthlyCarbon(userid, month, year);
  }
  @Delete('/:userid/date')
  @ApiOperation({
    description: '특정 날짜에 해당하는 사용자의 모든 카테고리를 삭제합니다.',
  })
  @ApiParam({
    name: 'userid',
    description: '사용자 ID',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'date',
    description: '삭제할 날짜',
    required: true,
    type: String,
  })
  async deleteCategoriesByDate(
    @Param('userid') userid: string,
    @Query('date') date: string,
  ) {
    return this.categoryService.deleteCategoriesByDate(userid, date);
  }
}
