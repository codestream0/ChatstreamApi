import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto, LoginDto, forgotPasswordDto, refreshTokenDto, verifyOtp, resetPasswordDto } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import {Otp} from '../schemas/otp.schema';
import { MailService } from '../mail/mail.service';
import { OtpEmail } from 'src/mail/template/otp.email';
import { render } from '@react-email/render';
import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    private readonly JwtService: JwtService,
    // private readonly userService: UserService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Otp.name) private readonly otpModel: Model<Otp>,
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

  async generateToken(user: User) {
    const payload = { sub: user._id, email: user.email };

    const accessToken = this.JwtService.sign(payload,{ expiresIn:"1m" });
    const refreshToken = this.JwtService.sign(payload,{ expiresIn:"3m" });
    console.log("AccessToken:",accessToken);  
    console.log("RefreshToken:",refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user) throw new UnauthorizedException('invalid credential');
      // console.log("userPassword:",user.password);
      // console.log("password:",dto.password);
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('invalid password');

      const token= await this.generateToken(user);

       return { msg: 'login successful',token };

    } catch (error) {
      return error;
    }
  }

  async refreshToken(dto:refreshTokenDto){
    try {
      const decode = this.JwtService.verify(dto.token)
    //   const user = this.userService.
    //   if(!user){
    //     throw new UnauthorizedException('Invalid token')
    //   }
    } catch (error) {
      
    }

  }

  async sendOtp(dto: forgotPasswordDto) {
    try {
      const existingUser = await this.userModel.findOne({ email: dto.email });
      if (!existingUser) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const html = await render(OtpEmail({ otp }));

      console.log(`Generated OTP for ${dto.email}: ${otp}`);

        const saveTodb = new this.otpModel({
        email: dto.email,
        otp: otp,
      });

      await saveTodb.save();
      console.log(saveTodb);

      const mailSent = await this.mailService.sendMail(
        dto.email,
        'Password Reset OTP',
        otp, 
      );

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

  async verifyOtp(dto: verifyOtp) {
    try {
      const otpRecord = await this.otpModel.findOne({ email: dto.email }).sort({ createdAt: -1 });
      if (!otpRecord) {
        throw new BadRequestException('OTP not found or expired');
      }
      if(otpRecord.otp !== dto.otp){
        throw new BadRequestException('Invalid OTP');
      }

      const now = new Date();
      const otpAge = (now.getTime() - otpRecord.createdAt.getTime()) / 1000; 
      console.log('OTP age in seconds:', otpAge);
      console.log('OTP created at:', otpRecord.createdAt);
      if (otpAge > 300) {
        throw new BadRequestException('OTP has expired');
      }

      await this.otpModel.deleteMany({ email: dto.email });
      return { msg: 'OTP verified successfully',email:dto.email  };
    } catch (error) {
      console.error('❌ Error verifying OTP:', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async resetPassword(dto: resetPasswordDto) {
    try {
      const user = await this.userModel.findOne({ email: dto.email }).sort({ createdAt: -1 });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const hashPassword = await bcrypt.hash(dto.newPassword, 10);
      user.password = hashPassword;
      const updatePassword=await this.userModel.updateOne({ email: dto.email }, { password: hashPassword });
      await this.otpModel.deleteMany({ email: dto.email });
      
      return { msg: 'Password reset successful',updatePassword  };
    } catch (error) {
      console.error('❌ Error resetting password:', error.message);
      throw new BadRequestException(error.message);
    }
  }
}
