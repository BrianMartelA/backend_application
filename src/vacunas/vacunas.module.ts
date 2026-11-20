import { Module } from '@nestjs/common';
import { VacunasService } from './vacunas.service.js';
import { VacunasController } from './vacunas.controller.js';
import { Especy } from '../especies/entities/especy.entity.js';
import { Vacuna } from './entities/vacuna.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [VacunasController],
  providers: [VacunasService],
  imports:[TypeOrmModule.forFeature([Especy,Vacuna]),AuthModule]
})
export class VacunasModule {}
