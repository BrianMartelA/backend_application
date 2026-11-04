import { Module } from '@nestjs/common';
import { RecetasMedicasService } from './recetas_medicas.service.js';
import { RecetasMedicasController } from './recetas_medicas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { RecetasMedica } from './entities/recetas_medica.entity.js';
import { Usuario } from '../usuarios/entities/usuario.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [RecetasMedicasController],
  providers: [RecetasMedicasService],
  imports: [TypeOrmModule.forFeature([RecetasMedica, Mascota,Usuario]),AuthModule],
})
export class RecetasMedicasModule {}
