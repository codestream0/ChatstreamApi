import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // or your SMTP server
      port: Number(process.env.MAIL_PORT) || 465,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.MAIL_USER || 'hamzaabdulfatah235@gmail.com',
        pass: process.env.MAIL_PASS || ' kato ggvv bhhj ikka',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"chatstream" <hamzaabdulfatah235@gmail.com>',
        to,
        subject,
        text,
        html,
      });
      console.log(text);
      
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      return error;
    }
  }
}
