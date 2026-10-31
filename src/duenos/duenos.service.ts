import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDuenoDto } from './dto/create-dueno.dto.js';
import { UpdateDuenoDto } from './dto/update-dueno.dto.js';
import { Dueno } from './entities/dueno.entity.js';
import { Negocio } from '../negocio/entities/negocio.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';

@Injectable()
export class DuenosService {
  constructor(
    @InjectRepository(Dueno)
    private readonly duenoRepository: Repository<Dueno>,

    @InjectRepository(Negocio)
    private readonly negocioRepository: Repository<Negocio>,

    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
  ) {}

  // Crear un dueño dentro del negocio autenticado
  async create(
    negocioId: number,
    createDuenoDto: CreateDuenoDto,
  ): Promise<Dueno> {
    const negocio = await this.negocioRepository.findOneBy({
      negocioId,
    });

    if (!negocio) {
      throw new NotFoundException('Negocio no existente');
    }

    const userExist = await this.duenoRepository.exists({
      where: {
        rut: createDuenoDto.rut,
        negocio: { negocioId },
      },
    });

    if (userExist) {
      throw new ConflictException(
        'Ya existe un dueño con ese RUT en este negocio',
      );
    }

    const dueno = this.duenoRepository.create({
      rut: createDuenoDto.rut,
      nombre_completo: createDuenoDto.nombre_completo,
      direccion: createDuenoDto.direccion,
      correo: createDuenoDto.correo,
      telefono: createDuenoDto.telefono,
      negocio,
    });

    return this.duenoRepository.save(dueno);
  }

  // Listar únicamente los dueños del negocio autenticado
  async findAll(negocioId: number): Promise<Dueno[]> {
    return this.duenoRepository.find({
      where: {
        negocio: { negocioId },
      },
      relations: {
  mascotas: true,
},
    });
  }

  // Buscar un dueño dentro del negocio autenticado
  async findOne(
    id: number,
    negocioId: number,
  ): Promise<Dueno> {
    const dueno = await this.duenoRepository.findOne({
      where: {
        id_dueno: id,
        negocio: { negocioId },
      },
      relations: {
  mascotas: true,
},
    });

    if (!dueno) {
      throw new NotFoundException('Dueño no encontrado');
    }

    return dueno;
  }

  // Actualizar únicamente un dueño del negocio autenticado
  async update(
    id: number,
    negocioId: number,
    updateDuenoDto: UpdateDuenoDto,
  ): Promise<Dueno> {
    const dueno = await this.findOne(id, negocioId);

    // Solo se actualizan campos permitidos por el DTO.
    await this.duenoRepository.update(
      {
        id_dueno: dueno.id_dueno,
        negocio: { negocioId },
      },
      updateDuenoDto,
    );

    return this.findOne(id, negocioId);
  }

  // Eliminar únicamente un dueño del negocio autenticado
  async remove(
    id: number,
    negocioId: number,
  ): Promise<{ mensaje: string }> {
    const dueno = await this.findOne(id, negocioId);

    await this.duenoRepository.delete({
      id_dueno: dueno.id_dueno,
      negocio: { negocioId },
    });

    return {
      mensaje: `Se eliminó al dueño ${dueno.nombre_completo}`,
    };
  }
}