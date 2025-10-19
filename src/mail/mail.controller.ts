import { Controller, Body, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('send')
  async sendMail(
    @Body() body: { to: string; subject: string; message: string },
  ) {
    const info = await this.mailService.sendMail(
      body.to,
      body.subject,
      body.message,
      `<p>${body.message}</p>`,
    );
    // console.log(info.messageId);

    return {msg:"sucessful",messageId: info.messageId};
    
  }
}
