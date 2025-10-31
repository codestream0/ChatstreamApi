import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example:"johndoe@gmail.com", description:"user email"})
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:"********", description:"user password"})
  password: string;
}

export class forgotPasswordDto {
  @IsEmail()
  @IsString()
  @ApiProperty({example:"johndoe@gmail.com", description:"user email"})
  email: string;
}

export class verifyOtp {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:"123456", description:" user verification otp"})
  otp: string;

  @IsString()
  @IsEmail()
  @ApiProperty({example:"johndoe@gmail.com", description:"user email"})
  email: string;
}

export class resetPasswordDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:"johndoe@gmail.com", description:"user email"})
  email:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:"123456", description:" user verification otp"})
  otp: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:"********", description:"user password"})
  newPassword:string;
}

export class refreshTokenDto{
  @IsString()
  @IsNotEmpty()
  token:string;
}