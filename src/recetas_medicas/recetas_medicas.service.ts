import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecetasMedicaDto } from './dto/create-recetas_medica.dto.js';
import { UpdateRecetasMedicaDto } from './dto/update-recetas_medica.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { RecetasMedica } from './entities/recetas_medica.entity.js';
import { Repository } from 'typeorm';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { Usuario } from '../usuarios/entities/usuario.entity.js';
import { AuthService } from '../auth/auth.service.js';
@Injectable()
export class RecetasMedicasService {
  constructor(
    @InjectRepository(RecetasMedica)
    private recetaRepository: Repository<RecetasMedica>,
    @InjectRepository(Mascota) private mascotaRepository: Repository<Mascota>,
private authService:AuthService  ) {}
  async create(
    createRecetasMedicaDto: CreateRecetasMedicaDto,
    id_mascota: number,
    id_usuario:number,
  ) {
    const receta = new RecetasMedica();

    const mascota = await this.mascotaRepository.findOneBy({
id_mascota
    });

    
    if (!mascota) throw new NotFoundException('Mascota no encontrada');
    receta.medicamentos_indicaciones = createRecetasMedicaDto.medicamentos_indicaciones;
    receta.mascota = mascota;
    receta.usuario={idUsuario:id_usuario} as Usuario;
    return this.recetaRepository.save(receta);
  }

  findAll() {
    return `This action returns all recetasMedicas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recetasMedica`;
  }

  update(id: number, updateRecetasMedicaDto: UpdateRecetasMedicaDto) {
    return `This action updates a #${id} recetasMedica`;
  }

  remove(id: number) {
    return `This action removes a #${id} recetasMedica`;
  }
}
