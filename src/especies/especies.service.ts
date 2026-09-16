import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.especieRepository.find();
  }

  findOne(id: number) {
    
    return this.especieRepository.findOneBy({id_especie:id});
  }

  async update(id: number, updateEspecyDto: UpdateEspecyDto) {
    await this.especieRepository.update(id,updateEspecyDto);
    return `Se actualizo la especie ${updateEspecyDto.nombre_especie}`;
  }

  async remove(id: number) {
    const especie = await this.findOne(id);
    if(!especie){
      throw new NotFoundException(`Especie no encontrada`);
    }
    await this.especieRepository.delete(id);
    return `Se elimino la especie ${especie.nombre_especie}`;
  }
}
