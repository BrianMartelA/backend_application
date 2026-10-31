import { Module } from '@nestjs/common';
import { DuenosService } from './duenos.service.js';
import { DuenosController } from './duenos.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dueno } from './entities/dueno.entity.js';
import { Negocio } from '../negocio/entities/negocio.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [DuenosController],
  providers: [DuenosService],
  exports: [DuenosService],
  imports: [
    TypeOrmModule.forFeature([Dueno, Negocio, Mascota]),
    AuthModule,
  ],
})
export class DuenosModule {}