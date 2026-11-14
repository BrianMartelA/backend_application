
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto.js';
import { UpdateMascotaDto } from './dto/update-mascota.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Especy } from '../especies/entities/especy.entity.js';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private mascotaRepository: Repository<Mascota>,

    @InjectRepository(Dueno)
    private duenoRepository: Repository<Dueno>,

    @InjectRepository(Especy)
    private especieRepository: Repository<Especy>,
  ) {}

  async create(negocioId: number, createMascotaDto: CreateMascotaDto) {
    // Verificar que el dueño pertenezca al negocio autenticado
    const dueno = await this.duenoRepository.findOne({
      where: {
        id_dueno: createMascotaDto.id_dueno.id_dueno,
        negocio: { negocioId },
      },
    });

    if (!dueno) {
      throw new NotFoundException('Dueño no encontrado en este negocio');
    }

    // Verificar que la especie exista
    const especie = await this.especieRepository.findOneBy({
      id_especie: createMascotaDto.id_especie.id_especie,
    });

    if (!especie) {
      throw new NotFoundException('Especie no encontrada');
    }

    const mascota = new Mascota();

    mascota.dueno = dueno;
    mascota.especy = especie;
    mascota.fecha_nacimiento = createMascotaDto.fecha_nacimiento
  ? new Date(createMascotaDto.fecha_nacimiento)
  : null;
    mascota.microchip = createMascotaDto.microchip ?? '';
    mascota.nombre = createMascotaDto.nombre;
    mascota.peso = createMascotaDto.peso;
    mascota.sexo = createMascotaDto.sexo;
    mascota.antecedentes = createMascotaDto.antecedentes ?? '';
    mascota.alergias = createMascotaDto.alergias ?? '';

    return this.mascotaRepository.save(mascota);
  }

  findAll(negocioId: number) {
    return this.mascotaRepository.find({
      where: {
        dueno: {
          negocio: { negocioId },
        },
      },
      relations: {
        dueno: true,
        especy: true,
      },
    });
  }

  async findOne(id: number, negocioId: number) {
    const mascota = await this.mascotaRepository.findOne({
      where: {
        id_mascota: id,
        dueno: {
          negocio: { negocioId },
        },
      },
      relations: {
        dueno: true,
        especy: true,
      },
    });

    if (!mascota) {
      throw new NotFoundException('Mascota no encontrada');
    }

    return mascota;
  }

  async update(
    id: number,
    negocioId: number,
    updateMascotaDto: UpdateMascotaDto,
  ) {
    const mascota = await this.findOne(id, negocioId);

    // No permitimos cambiar el dueño mediante este endpoint.
    mascota.nombre = updateMascotaDto.nombre ?? mascota.nombre;
    mascota.peso = updateMascotaDto.peso ?? mascota.peso;
    mascota.microchip = updateMascotaDto.microchip ?? mascota.microchip;
    mascota.antecedentes =
      updateMascotaDto.antecedentes ?? mascota.antecedentes;
    mascota.alergias = updateMascotaDto.alergias ?? mascota.alergias;
    mascota.sexo = updateMascotaDto.sexo ?? mascota.sexo;
    if (updateMascotaDto.fecha_nacimiento !== undefined) {
  mascota.fecha_nacimiento = updateMascotaDto.fecha_nacimiento
    ? new Date(updateMascotaDto.fecha_nacimiento)
    : null;
}

    return this.mascotaRepository.save(mascota);
  }

  async remove(id: number, negocioId: number) {
    const mascota = await this.findOne(id, negocioId);

    await this.mascotaRepository.remove(mascota);

    return {
      message: `Se eliminó la mascota ${mascota.nombre} de ${mascota.dueno.nombre_completo}`,
    };
  }
}