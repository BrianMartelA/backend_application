import { Injectable } from '@nestjs/common';
import { CreateEspecyDto } from './dto/create-especy.dto.js';
import { UpdateEspecyDto } from './dto/update-especy.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especy } from './entities/especy.entity.js';

@Injectable()
export class EspeciesService {
  constructor(
    @InjectRepository(Especy) private especieRepository:Repository<Especy>
  ){}
  create(createEspecyDto: CreateEspecyDto) {
    const especie= new Especy();
    especie.nombre_especie=createEspecyDto.nombre_especie;
    
    return this.especieRepository.save(especie);
  }

  findAll() {
    return `This action returns all especies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especy`;
  }

  update(id: number, updateEspecyDto: UpdateEspecyDto) {
    return `This action updates a #${id} especy`;
  }

  remove(id: number) {
    return `This action removes a #${id} especy`;
  }
}
