import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { OtpEmail } from './template/otp.email';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.MAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER || 'hamzaabdulfatah235@gmail.com',
        pass: process.env.MAIL_PASS || 'kato ggvv bhhj ikka', 
      },
        tls: {
        rejectUnauthorized: true,
      },
    });
  }

  async sendMail(to: string, subject: string, otp: string) {
    try {
    const html = await render(OtpEmail({ otp }));

    const info = await this.transporter.sendMail({
      from: `"Chatstream" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,                        
      text: `Your OTP is ${otp}`,  
    });

    return {
      message: 'Email sent successfully',
      messageId: info.messageId,
      response: info.response,
    };
    } catch (error) {
      console.error('❌  Full mail error:', error );
      throw new BadRequestException(error.message || 'Failed to send email');
    }
  }
}
