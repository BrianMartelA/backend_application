import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MascotasService } from './mascotas.service.js';
import { MascotasController } from './mascotas.controller.js';

import { Mascota } from './entities/mascota.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Especy } from '../especies/entities/especy.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { StorageModule } from '../storage/storage.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mascota,
      Dueno,
      Especy,
    ]),
    AuthModule,
    StorageModule
  ],
  controllers: [MascotasController],
  providers: [MascotasService],
})
export class MascotasModule {}