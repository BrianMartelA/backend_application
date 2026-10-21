import { Module } from '@nestjs/common';
import { RecetasMedicasService } from './recetas_medicas.service.js';
import { RecetasMedicasController } from './recetas_medicas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { RecetasMedica } from './entities/recetas_medica.entity.js';

@Module({
  controllers: [RecetasMedicasController],
  providers: [RecetasMedicasService],
  imports: [TypeOrmModule.forFeature([RecetasMedica, Mascota])],
})
export class RecetasMedicasModule {}
