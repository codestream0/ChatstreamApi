import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { forgotPasswordDto, LoginDto, refreshTokenDto, verifyOtp, resetPasswordDto } from './dto';
import { CreateUserDto } from 'src/user/dto';
import { ApiTags,ApiOperation, ApiResponse, } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  signup(@Body() dto: CreateUserDto) {
    console.log({ dto });

    return this.authservice.signup(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  @ApiResponse({ status: 201, description: 'User login successfully' })
  login(@Body() dot: LoginDto) {
    console.log({ dot });
    return this.authservice.login(dot);
  }

  @Post('forgotPassword')
  @ApiOperation({ summary: 'forgot userpassword' })
  @ApiResponse({ status: 201, description: 'An otp is sent successfully' })
  async forgotPassword(@Body() dto: forgotPasswordDto) {
    return await this.authservice.sendOtp(dto);
  }

  @Post('verifyOtp')
  @ApiOperation({ summary: 'Verify otp sent to user email' })
  @ApiResponse({ status: 201, description: 'User otp verified successfully' })
  verifyOtp(@Body() dto: verifyOtp) {
    console.log({dto});  
    return this.authservice.verifyOtp(dto);
  }

  @Post('resetPassword')
  @ApiOperation({ summary: 'reset userpassword' })
  @ApiResponse({ status: 201, description: 'password reset successfully' })
  resetPassword(@Body() dto:resetPasswordDto){
    return this.authservice.resetPassword(dto)
  }

  @Post("refreshToken")
  refreshToken(@Body() dto:refreshTokenDto){
    return this.authservice.refreshToken(dto)

  }
}
