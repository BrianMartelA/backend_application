import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacunaDto } from './dto/create-vacuna.dto.js';
import { UpdateVacunaDto } from './dto/update-vacuna.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity.js';
import { Repository } from 'typeorm';
import { Especy } from '../especies/entities/especy.entity.js';

@Injectable()
export class VacunasService {
  constructor(
@InjectRepository(Vacuna) private vacunaRepository:Repository<Vacuna>,
@InjectRepository(Especy) private especieRepository:Repository<Especy>){}
  async create(createVacunaDto: CreateVacunaDto) {
    const especie = await this.especieRepository.findOneBy({id_especie:createVacunaDto.id_especie.id_especie});
    if(!especie){
      throw new NotFoundException(`especie no encontrada`);
    }
    const vacuna = new Vacuna()
    vacuna.especy=especie;
    vacuna.descripcion=createVacunaDto.descripcion;
    vacuna.nombre_vacuna=createVacunaDto.nombre_vacuna;
    return this.vacunaRepository.save(vacuna);
  }

  findAll() {
    return this.vacunaRepository.find({relations:{especy:true}});
  }

  findOne(id: number) {
    return this.vacunaRepository.find({where:{id_vacuna:id},relations:{especy:true}});
  }

  async update(id: number, updateVacunaDto: UpdateVacunaDto) {
    await this.vacunaRepository.update(id,updateVacunaDto)
    return `This action updates a #${id} vacuna`;
  }

  async remove(id: number) {
    const vacuna = await this.findOne(id);
    if(!vacuna) throw new NotFoundException("Vacuna no encontrada")
    return `vacuna eliminada`;
  }
}
