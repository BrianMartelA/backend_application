import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { Negocio } from '../negocio/entities/negocio.entity.js';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita) private citaRepository: Repository<Cita>,
    @InjectRepository(Dueno) private duenoRepository: Repository<Dueno>,
    @InjectRepository(Mascota) private mascotaRepository: Repository<Mascota>,
    @InjectRepository(Negocio) private negocioRepository: Repository<Negocio>,
  ) {}
  async create(negocioId: number, createCitaDto: CreateCitaDto) {
    const cita = new Cita();

    const dueno = await this.duenoRepository.findOneBy({
      id_dueno: createCitaDto.id_dueno.id_dueno,
    });
    const mascota = await this.mascotaRepository.findOne({
      where: { id_mascota: createCitaDto.id_mascota.id_mascota },
      relations: { dueno: true },
    });
    const negocio = await this.negocioRepository.findOneBy({ negocioId });
    if (!negocio) {
      throw new NotFoundException(`Negocio no encontrado`);
    }
    if (!mascota) {
      throw new NotFoundException(`Mascota no encontrada`);
    }
    if (!dueno || !mascota.dueno.id_dueno) {
      throw new NotFoundException(`Dueño no encontrado`);
    }

    if (mascota.dueno.id_dueno !== dueno.id_dueno) {
      throw new ForbiddenException('Mascota no vinculada al dueño');
    }

    cita.fecha_hora = createCitaDto.fecha_hora;
    cita.dueno = dueno;
    cita.mascota = mascota;
    cita.motivo = createCitaDto.motivo;
    cita.estado = createCitaDto.estado;
    cita.negocio=negocio;

    const cita_exsitente = await this.citaRepository.findOne({
      where: { fecha_hora: createCitaDto.fecha_hora,negocio:{negocioId} },
    });

    if (cita_exsitente) {
      throw new ConflictException(`fecha y hora ya tomada`);
    }

    return this.citaRepository.save(cita);
  }

  async findAll(negocioId:number) {
        const negocio = await this.negocioRepository.findOneBy({ negocioId });
    if (!negocio) {
      throw new NotFoundException(`negocio no encontrado`);
    }
    return this.citaRepository.find({where:{negocio:{negocioId}},
      relations: { dueno: true, mascota: true },
    });
  }

  findOne(id: number) {
    return this.citaRepository.findOne({
      where: { id_cita: id },
      relations: { dueno: true, mascota: true },
    });
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citaRepository.findOne({
      where: { id_cita: id },
      relations: { dueno: true, mascota: true },
    });
    if (!cita) {
      throw new NotFoundException(`Mascota sin cita`);
    }

    if (updateCitaDto.fecha_hora !== undefined) {
      const cita_existente = await this.citaRepository.findOne({
        where: { fecha_hora: updateCitaDto.fecha_hora },
      });
      if (cita_existente) {
        throw new ConflictException(`fecha y hora ya tomada`);
      }
    }

    cita.fecha_hora = updateCitaDto.fecha_hora ?? cita.fecha_hora;
    cita.motivo = updateCitaDto.motivo ?? cita.motivo;
    cita.estado = updateCitaDto.estado ?? cita.estado;
    return this.citaRepository.save(cita);
  }

  async remove(id: number) {
    const cita = await this.citaRepository.findOne({
      where: { id_cita: id },
      relations: { dueno: true },
    });
    if (!cita) {
      throw new NotFoundException(`Cita no encontrada`);
    }
    await this.citaRepository.delete(id);
    return `se elimino la cita para ${cita.dueno.nombre_completo}`;
  }
}
