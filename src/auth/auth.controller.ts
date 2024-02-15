import { Body,Controller, Post, Req, Res,Get, UseGuards} from '@nestjs/common';
import { Request,Response } from 'express';
import { AuthService } from './auth.service';
import { signUpDto } from './dtos/signUp.dto';
import {LoginDto} from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation,ApiTags, ApiUnauthorizedResponse, } from '@nestjs/swagger';
import { TokenResponseDto } from './dtos/tokenResponse.dto';
import { DocumentedException } from 'src/docsException';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    description:'userid,password 이용해 로그인,access JWT 발급',
    summary:'로그인',
  })
  @ApiBody({
    type:LoginDto,
    description:'userid, password 이용해 로그인',
  })
  @ApiCreatedResponse({description:'로그인 성공',type:TokenResponseDto})
  @ApiUnauthorizedResponse({
    description:'로그인 실패',
    type:DocumentedException,
})
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const jwt = await this.authService.validateuser(loginDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }
  @Post('/signup')
  @ApiOperation({
    description:'회원가입',
    summary:'회원가입',
})
  @ApiCreatedResponse({description:'회원가입 성공'})
  @ApiBadRequestResponse({
    description:'회원가입 실패,메세지는 명세에',
    type:DocumentedException,
  })
  async signUp(@Body() body: signUpDto) {
    await this.authService.signUp(body);
  }
  @Get('/authenticate')
  @UseGuards(AuthGuard())
  isAuthenticated(@Req() req:Request):any{
    const user:any=req.user;
    return user;
  }

}
