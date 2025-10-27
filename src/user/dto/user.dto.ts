
// import { partialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

}
// export class UpdateUserDto extends partialType(CreateUserDto) {}
export class UpdateUserDto{
  // @IsOptional()
  @IsString()
  fullName?: string;


  @IsEmail()
  email?: string;

  // @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsString()
  phoneNumber?: string;

}
