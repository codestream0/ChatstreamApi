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
import { MailService } from '../mail/mail.service';
import { OtpEmail } from 'src/mail/template/otp.email';
import { render } from '@react-email/render';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

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


  async sendOtp(dto: ForgotPasswordDto) {
    try {
      const existingUser = await this.userModel.findOne({ email: dto.email });
      if (!existingUser) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const html = await render(OtpEmail({ otp }));

      console.log(`Generated OTP for ${dto.email}: ${otp}`);

      const mailSent = await this.mailService.sendMail(
        dto.email,
        'Password Reset OTP',
        otp, 
      );

      // existingUser.otp = otp;
      // await existingUser.save();
      return {
        msg: 'OTP sent successfully',
        email: dto.email,
        mailSent,
      };
    } catch (error) {
      console.error('❌ Error sending OTP:', error.message);
      throw new BadRequestException(error.message);
    }
}
}
