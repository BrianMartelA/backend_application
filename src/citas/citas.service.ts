import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, Not } from 'typeorm';

import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';
import { Cita } from './entities/cita.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { Negocio } from '../negocio/entities/negocio.entity.js';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,

    @InjectRepository(Dueno)
    private readonly duenoRepository: Repository<Dueno>,

    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,

    @InjectRepository(Negocio)
    private readonly negocioRepository: Repository<Negocio>,
  ) {}

  // CREAR CITA
  async create(negocioId: number, createCitaDto: CreateCitaDto) {
    const negocio = await this.negocioRepository.findOneBy({ negocioId });

    if (!negocio) {
      throw new NotFoundException('Negocio no encontrado');
    }

    const dueno = await this.duenoRepository.findOne({
      where: {
        id_dueno: createCitaDto.id_dueno.id_dueno,
        negocio: { negocioId },
      },
    });

    if (!dueno) {
      throw new NotFoundException('Dueño no encontrado en este negocio');
    }

    const mascota = await this.mascotaRepository.findOne({
      where: {
        id_mascota: createCitaDto.id_mascota.id_mascota,
        dueno: {
          id_dueno: dueno.id_dueno,
          negocio: { negocioId },
        },
      },
      relations: { dueno: true },
    });

    if (!mascota) {
      throw new NotFoundException(
        'Mascota no encontrada en este negocio o no pertenece al dueño indicado',
      );
    }

    const fechaHora = createCitaDto.fecha_hora;

    const citaExistente = await this.citaRepository.findOne({
      where: {
        fecha_hora: fechaHora,
        negocio: { negocioId },
      },
    });

    if (citaExistente) {
      throw new ConflictException('Fecha y hora ya tomada');
    }

    const cita = this.citaRepository.create({
      fecha_hora: fechaHora,
      dueno,
      mascota,
      motivo: createCitaDto.motivo,
      estado: createCitaDto.estado || 'Pendiente',
      negocio,
    });

    return this.citaRepository.save(cita);
  }

  // CONSULTAR CITAS POR RANGO DE FECHAS
  async findAll(
    negocioId: number,
    fechaInicio: string,
    fechaFin: string,
  ) {
    if (!fechaInicio || !fechaFin) {
      throw new BadRequestException(
        'Debe indicar fechaInicio y fechaFin',
      );
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (
      isNaN(inicio.getTime()) ||
      isNaN(fin.getTime()) ||
      inicio > fin
    ) {
      throw new BadRequestException(
        'El rango de fechas no es válido',
      );
    }

    return this.citaRepository.find({
      where: {
        negocio: { negocioId },
        fecha_hora: Between(inicio, fin),
      },
      relations: {
        dueno: true,
        mascota: true,
      },
      order: {
        fecha_hora: 'ASC',
      },
    });
  }

  // CONSULTAR TODAS LAS CITAS DEL NEGOCIO
  async findAllCitas(negocioId: number) {
    const negocio = await this.negocioRepository.findOneBy({
      negocioId,
    });

    if (!negocio) {
      throw new NotFoundException('Negocio no encontrado');
    }

    return this.citaRepository.find({
      where: {
        negocio: { negocioId },
      },
      relations: {
        dueno: true,
        mascota: true,
      },
      order: {
        fecha_hora: 'ASC',
      },
    });
  }

  // CONSULTAR UNA CITA
  async findOne(negocioId: number, id: number) {
    const cita = await this.citaRepository.findOne({
      where: {
        id_cita: id,
        negocio: { negocioId },
      },
      relations: {
        dueno: true,
        mascota: true,
      },
    });

    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }

    return cita;
  }

  // ACTUALIZAR CITA
  async update(
    negocioId: number,
    id: number,
    updateCitaDto: UpdateCitaDto,
  ) {
    const cita = await this.citaRepository.findOne({
      where: {
        id_cita: id,
        negocio: { negocioId },
      },
    });

    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }

    if (updateCitaDto.fecha_hora !== undefined) {
      const citaExistente = await this.citaRepository.findOne({
        where: {
          id_cita: Not(id),
          fecha_hora: updateCitaDto.fecha_hora,
          negocio: { negocioId },
        },
      });

      if (citaExistente) {
        throw new ConflictException('Fecha y hora ya tomada');
      }

      cita.fecha_hora = updateCitaDto.fecha_hora;
    }

    if (updateCitaDto.motivo !== undefined) {
      cita.motivo = updateCitaDto.motivo;
    }

    if (updateCitaDto.estado !== undefined) {
      cita.estado = updateCitaDto.estado;
    }

    return this.citaRepository.save(cita);
  }

  // ELIMINAR CITA
  async remove(negocioId: number, id: number) {
    const cita = await this.citaRepository.findOne({
      where: {
        id_cita: id,
        negocio: { negocioId },
      },
      relations: {
        dueno: true,
      },
    });

    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }

    await this.citaRepository.delete({
      id_cita: cita.id_cita,
    });

    return `Se eliminó la cita para ${cita.dueno.nombre_completo}`;
  }
}