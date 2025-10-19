import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { MailModule } from '../mail/mail.module';
// import Mail from 'nodemailer/lib/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   MailModule 
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
