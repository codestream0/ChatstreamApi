
// import { partialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example:"john doe", description:"user full name"})
  fullName: string;

  @IsEmail()
  @ApiProperty({example:"johndoe@gmail.com", description:"user email"})
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({example:"*******", description:"user password"})
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({example:"080123456789 ", description:"user phone number"})
  phoneNumber: string;

}
// export class UpdateUserDto extends partialType(CreateUserDto) {}
export class UpdateUserDto{
  // @IsOptional()
  @IsString()
  @ApiProperty({example:"john doe", description:"user full name"})
  fullName?: string;


  @IsEmail()
  @ApiProperty({example:"johndoe@gmail.com", description:"user email"})
  email?: string;

  // @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({example:"*******", description:"user password"})
  password?: string;

  @IsString()
  @ApiProperty({example:"080123456789 ", description:"user phone number"})
  phoneNumber?: string;

}
