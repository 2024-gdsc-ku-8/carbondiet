import { ApiProperty } from "@nestjs/swagger";

export class TokenResponseDto{
@ApiProperty({example:'abc.efg.hig'})
accessToken:string;
}