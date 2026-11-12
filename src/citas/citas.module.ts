import { Module } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { CitasController } from './citas.controller.js';
import { Cita } from './entities/cita.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { Negocio } from '../negocio/entities/negocio.entity.js';
import { AuthModule } from '../auth/auth.module.js';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Dueno,
      Mascota,
      Cita,
      Negocio,
    ]),
  ],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
