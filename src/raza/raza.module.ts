import { Module } from '@nestjs/common';
import { RazaService } from './raza.service.js';
import { RazaController } from './raza.controller.js';

@Module({
  controllers: [RazaController],
  providers: [RazaService],
})
export class RazaModule {}
