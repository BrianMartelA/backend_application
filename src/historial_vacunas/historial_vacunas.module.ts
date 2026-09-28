import { Module } from '@nestjs/common';
import { HistorialVacunasService } from './historial_vacunas.service.js';
import { HistorialVacunasController } from './historial_vacunas.controller.js';
import { HistorialVacuna } from './entities/historial_vacuna.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { Vacuna } from '../vacunas/entities/vacuna.entity.js';

@Module({
  controllers: [HistorialVacunasController],
  providers: [HistorialVacunasService],
  imports: [TypeOrmModule.forFeature([HistorialVacuna,Mascota,Vacuna])],
})
export class HistorialVacunasModule {}
