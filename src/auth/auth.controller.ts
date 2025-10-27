import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { forgotPasswordDto, LoginDto, SignupDto,refreshTokenDto, verifyOtp, resetPasswordDto } from './dto';
import { CreateUserDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    console.log({ dto });

    return this.authservice.signup(dto);
  }

  @Post('login')
  login(@Body() dot: LoginDto) {
    console.log({ dot });
    return this.authservice.login(dot);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() dto: forgotPasswordDto) {
    return await this.authservice.sendOtp(dto);
  }

  @Post('verifyOtp')
  verifyOtp(@Body() dto: verifyOtp) {
    console.log({dto});  
    return this.authservice.verifyOtp(dto);
  }

  @Post('resetPassword')
  resetPassword(@Body() dto:resetPasswordDto){
    return this.authservice.resetPassword(dto)
  }

  @Post()
  refreshToken(@Body() dto:refreshTokenDto){
    return this.authservice.refreshToken(dto)

  }
}
