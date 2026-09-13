import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';
import { MascotasController } from './mascotas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Entity } from 'typeorm';

@Entity()
@Module({
  controllers: [MascotasController],
  providers: [MascotasService],
  imports:[TypeOrmModule.forFeature([Mascota,Dueno])]
})
export class MascotasModule {}
