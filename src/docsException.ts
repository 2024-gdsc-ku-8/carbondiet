import { ApiProperty } from "@nestjs/swagger";

export class DocumentedException{
    @ApiProperty({example:401})
    status: number;

    @ApiProperty({example:'UnauthorizedException'})
    name:string;

    response:{
        message:string;
        error:string;
        statuscode:number;
    };
}