import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto.js';
import { UpdateMascotaDto } from './dto/update-mascota.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Raza } from '../razas/entities/raza.entity.js';
import { Especy } from '../especies/entities/especy.entity.js';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private mascotaRepository: Repository<Mascota>,

    @InjectRepository(Dueno)
    private duenoRepository: Repository<Dueno>,

    @InjectRepository(Raza)
    private razaRepository: Repository<Raza>,

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

    const especie = await this.especieRepository.findOneBy({
      id_especie: createMascotaDto.id_especie.id_especie,
    });

    if (!especie) {
      throw new NotFoundException('Especie no encontrada');
    }

    const raza = await this.razaRepository.findOneBy({
      id_raza: createMascotaDto.id_raza.id_raza,
    });

    if (!raza) {
      throw new NotFoundException('Raza no encontrada');
    }

    const mascota = new Mascota();

    mascota.dueno = dueno;
    mascota.especy = especie;
    mascota.raza = raza;
    mascota.fecha_nacimiento = createMascotaDto.fecha_nacimiento;
    mascota.microchip = createMascotaDto.microchip;
    mascota.nombre = createMascotaDto.nombre;
    mascota.peso = createMascotaDto.peso;
    mascota.sexo = createMascotaDto.sexo;
    mascota.antecedentes = createMascotaDto.antecedentes;
    mascota.alergias = createMascotaDto.alergias;

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
        raza: true,
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
        raza: true,
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

    // Solo se actualizan los campos editables.
    // No permitimos cambiar el dueño mediante este endpoint.
    mascota.nombre = updateMascotaDto.nombre ?? mascota.nombre;
    mascota.peso = updateMascotaDto.peso ?? mascota.peso;
    mascota.microchip = updateMascotaDto.microchip ?? mascota.microchip;
    mascota.antecedentes =
      updateMascotaDto.antecedentes ?? mascota.antecedentes;
    mascota.alergias = updateMascotaDto.alergias ?? mascota.alergias;

    mascota.sexo = updateMascotaDto.sexo ?? mascota.sexo;
    mascota.fecha_nacimiento =
      updateMascotaDto.fecha_nacimiento ?? mascota.fecha_nacimiento;

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