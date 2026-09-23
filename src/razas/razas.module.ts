import { Module } from '@nestjs/common';
import { RazasService } from './razas.service.js';
import { RazasController } from './razas.controller.js';
import { Raza } from './entities/raza.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RazasController],
  providers: [RazasService],
    imports:[TypeOrmModule.forFeature([Raza])]
  
})
export class RazasModule {}
