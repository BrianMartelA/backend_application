import { Module } from '@nestjs/common';
import { BoletasService } from './boletas.service.js';
import { BoletasController } from './boletas.controller.js';

@Module({
  controllers: [BoletasController],
  providers: [BoletasService],
})
export class BoletasModule {}
