import { Module } from '@nestjs/common';
import { ContactoEmergenciaService } from './contacto-emergencia.service.js';
import { ContactoEmergenciaController } from './contacto-emergencia.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negocio } from '../negocio/entities/negocio.entity.js';
import { ContactoEmergencia } from './entities/contacto-emergencia.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';

@Module({
  controllers: [ContactoEmergenciaController],
  providers: [ContactoEmergenciaService],
  imports:[TypeOrmModule.forFeature([Negocio,ContactoEmergencia,Dueno])]
})
export class ContactoEmergenciaModule {}
