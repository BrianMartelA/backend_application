import { Module } from '@nestjs/common';
import { EspecieService } from './especie.service.js';
import { EspecieController } from './especie.controller.js';

@Module({
  controllers: [EspecieController],
  providers: [EspecieService],
})
export class EspecieModule {}
