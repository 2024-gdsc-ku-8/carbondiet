import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class LoginDto {
  @IsString()
  @ApiProperty({example:'korea123'})
  userid: string;
  @IsString()
  @ApiProperty({example:'password123@'})
  password: string;
}
