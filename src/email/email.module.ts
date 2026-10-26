import { Module } from '@nestjs/common';
import { EmailService } from './email.service.js';
import { EmailController } from './email.controller.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports:[ConfigModule],
  exports:[EmailService]
})
export class EmailModule {}
