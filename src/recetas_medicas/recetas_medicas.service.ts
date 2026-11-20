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
    private authService: AuthService,
  ) {}
  async create(
    createRecetasMedicaDto: CreateRecetasMedicaDto,
    id_mascota: number,
    id_usuario: number,
  ) {
    const receta = new RecetasMedica();

    const mascota = await this.mascotaRepository.findOneBy({
      id_mascota,
    });

    if (!mascota) throw new NotFoundException('Mascota no encontrada');
    receta.medicamentos_indicaciones =
      createRecetasMedicaDto.medicamentos_indicaciones;
    receta.mascota = mascota;
    receta.usuario = { idUsuario: id_usuario } as Usuario;
    return this.recetaRepository.save(receta);
  }

  findAll(negocioId: number) {
    return this.recetaRepository.find({
      where: {
        mascota: { dueno: { negocio: { negocioId } } },
      },
      relations: { mascota: true },
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number) {
    const receta = await this.recetaRepository.findOne({
      where: { id_receta: id },
      relations: { mascota: true },
    });
    if (!receta) throw new NotFoundException('Receta no encontrada');
    return receta;
  }

async update(
  id: number,
  updateRecetasMedicaDto: UpdateRecetasMedicaDto,
) {
  const receta = await this.recetaRepository.findOne({
    where: {
      id_receta: id
    },
  });

  if (!receta) {
    throw new NotFoundException('Receta no encontrada');
  }

  if (
    updateRecetasMedicaDto.medicamentos_indicaciones !== undefined
  ) {
    receta.medicamentos_indicaciones =
      updateRecetasMedicaDto.medicamentos_indicaciones;
  }

  return this.recetaRepository.save(receta);
}

async remove(id: number) {
  const receta = await this.recetaRepository.findOne({
    where: {
      id_receta: id
    },
  });

  if (!receta) {
    throw new NotFoundException('Receta no encontrada');
  }

  await this.recetaRepository.remove(receta);

  return {
    mensaje: `Se eliminó la receta #${id}`,
  };
}
}