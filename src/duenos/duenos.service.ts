import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDuenoDto } from './dto/create-dueno.dto.js';
import { UpdateDuenoDto } from './dto/update-dueno.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Dueno } from './entities/dueno.entity.js';
import { Repository } from 'typeorm';
import { Negocio } from '../negocio/entities/negocio.entity.js';

@Injectable()
export class DuenosService {
  constructor(
    @InjectRepository(Dueno) private duenoRepository: Repository<Dueno>,
    @InjectRepository(Negocio) private negocioRepository: Repository<Negocio>,
  ) {}

  async create(createDuenoDto: CreateDuenoDto) {
    const dueno = new Dueno();

    const negocio = await this.negocioRepository.findOneBy({
      negocioId: createDuenoDto.negocioId.negocioId
    });

    if(!negocio){
      throw new NotFoundException(`Negocio no existente`)
    }

    dueno.negocio = negocio;
    dueno.rut = createDuenoDto.rut;
    dueno.nombre = createDuenoDto.nombre;
    dueno.apellido = createDuenoDto.apellido;
    dueno.direccion = createDuenoDto.direccion;
    dueno.email = createDuenoDto.email;
    dueno.telefono = createDuenoDto.telefono;
    return this.duenoRepository.save(dueno);
  }

  findAll() {
    return `This action returns all duenos`;
  }

  findOne(nombre: string) {
    return this.duenoRepository.findOneBy({ nombre: nombre });
  }

  update(id: number, updateDuenoDto: UpdateDuenoDto) {
    return `This action updates a #${id} dueno`;
  }

  remove(id: number) {
    return `This action removes a #${id} dueno`;
  }
}
