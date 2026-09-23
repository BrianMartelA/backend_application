import { Module } from '@nestjs/common';
import { EspeciesService } from './especies.service.js';
import { EspeciesController } from './especies.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especy } from './entities/especy.entity.js';

@Module({
  controllers: [EspeciesController],
  providers: [EspeciesService],
    imports:[TypeOrmModule.forFeature([Especy])]
  
})
export class EspeciesModule {}
