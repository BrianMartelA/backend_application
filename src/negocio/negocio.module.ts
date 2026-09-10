import { Module } from '@nestjs/common';
import { NegocioService } from './negocio.service.js';
import { NegocioController } from './negocio.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negocio } from './entities/negocio.entity.js';
import { Entity } from 'typeorm';

@Entity()
@Module({
  controllers: [NegocioController],
  providers: [NegocioService],
  imports:[TypeOrmModule.forFeature([Negocio])]
})
export class NegocioModule {}
