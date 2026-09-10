import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto.js';
import { UpdateMascotaDto } from './dto/update-mascota.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';

@Injectable()
export class MascotasService {

  constructor(@InjectRepository(Mascota) private mascotaRepository:Repository<Mascota>,
  @InjectRepository(Dueno) private duenoRepository:Repository<Dueno> ){}
  async create(createMascotaDto: CreateMascotaDto) {
    const mascota = new Mascota();
    const dueno = await this.duenoRepository.findOneBy({id_dueno:createMascotaDto.id_dueno.id_dueno})

    if(!dueno){
      throw new NotFoundException(`Dueño no encontrado`);
    }

    mascota.dueno=dueno;
    mascota.especie=createMascotaDto.especie;
    mascota.fecha_nacimiento=createMascotaDto.fecha_nacimiento;
    mascota.microchip=createMascotaDto.microchip;
    mascota.nombre=createMascotaDto.nombre;
    mascota.peso=createMascotaDto.peso;
    mascota.raza=createMascotaDto.raza;
    mascota.sexo=createMascotaDto.sexo;
    mascota.antecedentes=createMascotaDto.antecedentes;
    mascota.observaciones=createMascotaDto.observaciones;



    return this.mascotaRepository.save(mascota);
  }

  findAll() {
    return `This action returns all mascotas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaDto: UpdateMascotaDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
