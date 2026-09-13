import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service.js';
import { NotificacionesController } from './notificaciones.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Notificaciones } from './entities/notificacione.entity.js';

@Module({
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  imports:[TypeOrmModule.forFeature([Dueno,Notificaciones])]
})
export class NotificacionesModule {}
