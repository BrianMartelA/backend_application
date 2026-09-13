import { Module } from '@nestjs/common';
import { HistorialVacunasService } from './historial_vacunas.service.js';
import { HistorialVacunasController } from './historial_vacunas.controller.js';

@Module({
  controllers: [HistorialVacunasController],
  providers: [HistorialVacunasService],
})
export class HistorialVacunasModule {}
