import { Injectable } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto.js';
import { UpdateRazaDto } from './dto/update-raza.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Raza } from './entities/raza.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class RazasService {
  constructor(@InjectRepository(Raza) private razaRepository:Repository<Raza>){}
  create(createRazaDto: CreateRazaDto) {
    const raza = new Raza()

    raza.nombre_raza=createRazaDto.nombre_raza;
    return this.razaRepository.save(raza);
  }

  findAll() {
    return this.razaRepository.find();
  }

  findOne(id: number) {
    
    return this.razaRepository.findOneBy({id_raza:id});
  }

  async update(id: number, updateRazaDto: UpdateRazaDto) {
    await this.razaRepository.update(id,updateRazaDto);
    return this.razaRepository.findOneBy({id_raza:id});
  }

  remove(id: number) {
    return `This action removes a #${id} raza`;
  }
}
