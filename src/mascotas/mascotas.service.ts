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
    @InjectRepository(Mascota) private mascotaRepository: Repository<Mascota>,
    @InjectRepository(Dueno) private duenoRepository: Repository<Dueno>,
    @InjectRepository(Raza) private razaRepository: Repository<Raza>,
    @InjectRepository(Especy) private especieRepository: Repository<Especy>,
  ) {}
  async create(createMascotaDto: CreateMascotaDto) {
    const mascota = new Mascota();
    const dueno = await this.duenoRepository.findOneBy({
      id_dueno: createMascotaDto.id_dueno.id_dueno,
    });

    if (!dueno) {
      throw new NotFoundException(`Dueño no encontrado`);
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

    mascota.dueno = dueno;
    mascota.especy = especie;
    mascota.fecha_nacimiento = createMascotaDto.fecha_nacimiento;
    mascota.microchip = createMascotaDto.microchip;
    mascota.nombre = createMascotaDto.nombre;
    mascota.peso = createMascotaDto.peso;
    mascota.raza = raza;
    mascota.sexo = createMascotaDto.sexo;
    mascota.antecedentes = createMascotaDto.antecedentes;
    mascota.alergias = createMascotaDto.alergias;

    return this.mascotaRepository.save(mascota);
  }

  findAll(negocioId: number) {
    return this.mascotaRepository.find({
      where: {
        dueno: {
          negocio: {
            negocioId,
          },
        },
      },
      relations: {
        dueno: {
          negocio: true,
        },
      },
    });
  }

  async findOneWithOwner(id: number) {
    const mascota = this.mascotaRepository.findOne({
      where: { id_mascota: id },
      relations: { dueno: true },
    });

    return mascota;
  }

  async findOne(id: number, negocioId: number) {
    const mascota = this.mascotaRepository.findOne({
      where: { id_mascota: id, dueno: { negocio: { negocioId: negocioId } } },
      relations: {
        dueno: {
          negocio: true,
        },
      },
    });
    return mascota;
  }

  async update(id: number, updateMascotaDto: UpdateMascotaDto) {
    const mascota = await this.mascotaRepository.findOne({
      where: {
        id_mascota: id,
      },
    });
    if (!mascota) {
      throw new NotFoundException(`mascota no encontrada`);
    }
    mascota.alergias = updateMascotaDto.alergias ?? mascota.alergias;
    mascota.antecedentes =
      updateMascotaDto.antecedentes ?? mascota.antecedentes;
    mascota.microchip = updateMascotaDto.microchip ?? mascota.microchip;
    mascota.peso = updateMascotaDto.peso ?? mascota.peso;
    mascota.nombre = updateMascotaDto.nombre ?? mascota.nombre;
    await this.mascotaRepository.update(id, updateMascotaDto);
    return `This action updates a #${id} mascota`;
  }

  async remove(id: number) {
    const mascota = await this.mascotaRepository.findOne({
      where: { id_mascota: id },
      relations: { dueno: true },
    });
    if (!mascota) {
      throw new NotFoundException(`dueño no encontrado`);
    }

    await this.mascotaRepository.delete(id);

    return `Se la mascota de${mascota.dueno.nombre_completo} ${mascota.nombre}`;
  }
}
