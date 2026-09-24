import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';
import { MascotasController } from './mascotas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Entity } from 'typeorm';
import { Especy } from '../especies/entities/especy.entity.js';
import { Raza } from '../razas/entities/raza.entity.js';

@Entity()
@Module({
  controllers: [MascotasController],
  providers: [MascotasService],
  imports:[TypeOrmModule.forFeature([Mascota,Dueno,Especy,Raza])]
})
export class MascotasModule {}
