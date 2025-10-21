import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(11)
  phoneNumber: number;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class forgotPasswordDto {
  @IsEmail()
  @IsString()
  email: string;
}

export class verifyOtp {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsEmail()
  email: string;
}

export class resetPasswordDto{
  @IsString()
  @IsNotEmpty()
  email:string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  newPassword:string;
}

export class refreshTokenDto{
  @IsString()
  @IsNotEmpty()
  token:string;
}