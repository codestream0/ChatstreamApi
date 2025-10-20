import { Controller, Body, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { render } from '@react-email/render';
import { OtpEmail } from './template/otp.email';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(
    @Body() body: { to: string; subject: string; message: string },
  ) {
    try {
      const html = await render(OtpEmail({ otp: body.message }));

      const info = await this.mailService.sendMail(body.to, body.subject, html);

      console.log('Message sent:', info.messageId);

      return {
        msg: 'Email sent successfully',
        messageId: info.messageId,
        response: info.response,
      };
    } catch (error) {
      console.error('Error in MailController:', error);
      return { msg: 'Failed to send email', error: error.message };
    }
  }
}
