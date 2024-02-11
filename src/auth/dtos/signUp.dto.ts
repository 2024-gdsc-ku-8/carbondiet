import { ApiProperty } from "@nestjs/swagger";
import { IsString} from "class-validator";
export class signUpDto{
    @IsString()
    @ApiProperty({example:'Korea123'})
    userid:string;
    @IsString()
    @ApiProperty({example:'password123@'})
    password:string;
    @IsString()
    @ApiProperty({example:'호식이'})
    username:string;
    @IsString()
    @ApiProperty({example:'남자'})
    gender:string;
    @IsString()
    @ApiProperty({example:'졸업하고싶은 호랑이'})
    nickname:string;
}