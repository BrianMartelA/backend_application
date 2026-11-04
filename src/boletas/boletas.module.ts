import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletasService } from './boletas.service.js';
import { BoletasController } from './boletas.controller.js';
import { Boleta } from './entities/boleta.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Boleta,Mascota])],
  controllers: [BoletasController],
  providers: [BoletasService],
  exports: [BoletasService],
})
export class BoletasModule {}