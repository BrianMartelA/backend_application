import { Injectable } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocio.dto.js';
import { UpdateNegocioDto } from './dto/update-negocio.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Negocio } from './entities/negocio.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class NegocioService {
constructor(@InjectRepository(Negocio) private negocioRepository:Repository<Negocio>){}

  create(createNegocioDto: CreateNegocioDto) {
const business= new Negocio();

business.nombre_negocio=createNegocioDto.nombre_negocio;
business.direccion_negocio=createNegocioDto.direccion_negocio;
business.rut=createNegocioDto.rut;
    
    return this.negocioRepository.save(business);
  }

  findAll() {
    return `This action returns all negocio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} negocio`;
  }

  update(id: number, updateNegocioDto: UpdateNegocioDto) {
    return `This action updates a #${id} negocio`;
  }

  remove(id: number) {
    return `This action removes a #${id} negocio`;
  }
}
