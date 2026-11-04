import { Module } from '@nestjs/common';
import { RecordatorioService } from './recordatorio.service.js';
import { RecordatorioController } from './recordatorio.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from '../citas/entities/cita.entity.js';
import { Notificaciones } from '../notificaciones/entities/notificacione.entity.js';
import { HistorialVacuna } from '../historial_vacunas/entities/historial_vacuna.entity.js';
import { EmailModule } from '../email/email.module.js';

@Module({
  controllers: [RecordatorioController],
  providers: [RecordatorioService],  imports: [
    TypeOrmModule.forFeature([Cita,Notificaciones,HistorialVacuna]),EmailModule,
  ],
  
})
export class RecordatorioModule {}
