import {
  BadRequestException,
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

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita) private citaRepository: Repository<Cita>,
    @InjectRepository(Dueno) private duenoRepository: Repository<Dueno>,
    @InjectRepository(Mascota) private mascotaRepository: Repository<Mascota>,
  ) {}
  async create(createCitaDto: CreateCitaDto) {
    const cita = new Cita();

    const dueno = await this.duenoRepository.findOneBy({
      id_dueno: createCitaDto.id_dueno.id_dueno,
    });
    const mascota = await this.mascotaRepository.findOne({
      where: { id_mascota: createCitaDto.id_mascota.id_mascota },
      relations: { dueno: true },
    });
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

    return this.citaRepository.save(cita);
  }

  findAll() {
    return `This action returns all citas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cita`;
  }

  update(id: number, updateCitaDto: UpdateCitaDto) {
    return `This action updates a #${id} cita`;
  }

  remove(id: number) {
    return `This action removes a #${id} cita`;
  }
}
