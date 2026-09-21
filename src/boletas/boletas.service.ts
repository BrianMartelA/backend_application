import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleta } from './entities/boleta.entity.js';
import { CreateBoletaDto } from './dto/create-boleta.dto.js';
import { UpdateBoletaDto } from './dto/update-boleta.dto.js';

@Injectable()
export class BoletasService {
  constructor(
    @InjectRepository(Boleta)
    private readonly boletaRepository: Repository<Boleta>,
  ) {}

  async create(createBoletaDto: CreateBoletaDto): Promise<Boleta> {
    const nuevaBoleta = this.boletaRepository.create(createBoletaDto);
    return await this.boletaRepository.save(nuevaBoleta);
  }

  async findAll(): Promise<Boleta[]> {
    return await this.boletaRepository.find({
      relations: {
        negocio: true,
        dueno: true,
        cita: true,
      },
    });
  }

  async findOne(id: number): Promise<Boleta> {
    const boleta = await this.boletaRepository.findOne({
      where: { idBoleta: id },
      relations: {
        negocio: true,
        dueno: true,
        cita: true,
      },
    });
    if (!boleta) {
      throw new NotFoundException(`Boleta con ID ${id} no encontrada`);
    }
    return boleta;
  }

  async findByDueno(idDueno: number): Promise<Boleta[]> {
    return await this.boletaRepository.find({
      where: { idDueno },
      relations: {
        negocio: true,
        cita: true,
      },
    });
  }

  async update(id: number, updateBoletaDto: UpdateBoletaDto): Promise<Boleta> {
    const boleta = await this.findOne(id);
    this.boletaRepository.merge(boleta, updateBoletaDto);
    return await this.boletaRepository.save(boleta);
  }

  async remove(id: number): Promise<void> {
    const boleta = await this.findOne(id);
    await this.boletaRepository.remove(boleta);
  }
}