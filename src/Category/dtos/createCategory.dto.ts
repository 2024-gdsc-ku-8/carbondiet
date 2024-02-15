import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @ApiProperty({example:'Korea123'})
  userid: string;
  @ApiProperty({example:'2024-02-12'})
  time: Date;
  @IsString()
  @ApiProperty({example:'김치찌개,라면,김밥'})
  food: string;
  @ApiProperty({example:'100'})
  carbon: number;
}
