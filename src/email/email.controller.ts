import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service.js';
import { sendEmailDto } from './dto/email.dto.js';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('send')
  async sendMail(@Body()dto:sendEmailDto){
    await this.emailService.sendEmail(dto);
    return {message:'Email Sent Succesfully'};
  }
}
