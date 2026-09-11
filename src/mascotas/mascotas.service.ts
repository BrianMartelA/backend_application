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
    return this.mascotaRepository.find();
  }

  async findOneWithOwner(id: number) {
    const mascota = this.mascotaRepository.findOne({where:{id_mascota:id},
    relations:{dueno:true}});

    return mascota;
  }

  async findOne(id:number){
    const mascota = this.mascotaRepository.findOneBy({id_mascota:id})
    return mascota;
  }

  async update(id: number, updateMascotaDto: UpdateMascotaDto) {
    await this.mascotaRepository.update(id,updateMascotaDto)
    return `This action updates a #${id} mascota`;
  }

  async remove(id: number) {
      const mascota = await this.findOne(id);
       if(!mascota){
         throw new NotFoundException(`dueño no encontrado`)
       }
   
       await this.mascotaRepository.delete(id);
   
       return `Se elimino a usuario ${mascota.nombre}`
  }
}
