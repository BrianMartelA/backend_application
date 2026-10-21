import { Module } from '@nestjs/common';
import { RecordatorioService } from './recordatorio.service.js';
import { RecordatorioController } from './recordatorio.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from '../citas/entities/cita.entity.js';
import { Notificaciones } from '../notificaciones/entities/notificacione.entity.js';
import { HistorialVacuna } from '../historial_vacunas/entities/historial_vacuna.entity.js';

@Module({
  controllers: [RecordatorioController],
  providers: [RecordatorioService],  imports: [
    TypeOrmModule.forFeature([Cita,Notificaciones,HistorialVacuna]),
  ],
  
})
export class RecordatorioModule {}
