import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MascotasService } from './mascotas.service.js';
import { MascotasController } from './mascotas.controller.js';

import { Mascota } from './entities/mascota.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Especy } from '../especies/entities/especy.entity.js';
import { Raza } from '../razas/entities/raza.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mascota,
      Dueno,
      Especy,
      Raza,
    ]),
    AuthModule,
  ],
  controllers: [MascotasController],
  providers: [MascotasService],
})
export class MascotasModule {}