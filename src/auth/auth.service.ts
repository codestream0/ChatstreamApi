import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto, LoginDto, ForgotPasswordDto } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(dto: SignupDto) {
    try {
      const existingUser = await this.userModel.findOne({ email: dto.email });
      if (existingUser) throw new BadRequestException('email already exists');

      const hashPassword = await bcrypt.hash(dto.password, 10);
      const newUser = new this.userModel({
        email: dto.email,
        password: hashPassword,
        fullName: dto.fullName,
        phoneNumber: dto.phoneNumber,
      });
      console.log(newUser);

      const saveTodb = await newUser.save();
      return {
        saveTodb,
        msg: 'signup successful',
      };
    } catch (error) {
      return error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user) throw new UnauthorizedException('invalid credential');
      // console.log("userPassword:",user.password);
      // console.log("password:",dto.password);
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('invalid password');

      return { msg: 'login successful' };
    } catch (error) {
      return error;
    }
  }

//   async sendOtp(dto: ForgotPasswordDto) {
//     try {
//       const otpCode = Math.floor(100000 + Math.random() * 900000);
//       const existingUser = await this.userModel.findOne({ email: dto.email });
//       if (!existingUser)
//         throw new UnauthorizedException('invalid incredential');
//       console.log(otpCode);
//       // const confirmUser = new this.userModel({
//       //     otpCode,
//       //     email:dto.email
//       // })
//       // const saveTodb = await confirmUser.save();
//       // return({
//       //     saveTodb,
//       //     msg:"sucessful"
//       // })
//     } catch (error) {
//       return error;
//     }
//   }
}
