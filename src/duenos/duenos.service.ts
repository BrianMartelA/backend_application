import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDuenoDto } from './dto/create-dueno.dto.js';
import { UpdateDuenoDto } from './dto/update-dueno.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Dueno } from './entities/dueno.entity.js';
import { Like, Repository } from 'typeorm';
import { Negocio } from '../negocio/entities/negocio.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { CreateDuenoConMascotasDto } from './dto/create-dueno-mascota.dto.js';

@Injectable()
export class DuenosService {
  constructor(
    @InjectRepository(Dueno) private duenoRepository: Repository<Dueno>,
    @InjectRepository(Negocio) private negocioRepository: Repository<Negocio>,
    @InjectRepository(Mascota) private mascotaRepository: Repository<Mascota>,
  ) {}

  async create(negocioId:number,createDuenoDto: CreateDuenoDto) {
    const dueno = new Dueno();

    const negocio = await this.negocioRepository.findOneBy({
      negocioId
    });

    if (!negocio) {
      throw new NotFoundException(`Negocio no existente`);
    }



    dueno.negocio = negocio;
    dueno.rut = createDuenoDto.rut;
    dueno.nombre_completo = createDuenoDto.nombre_completo;
    dueno.direccion = createDuenoDto.direccion;
    dueno.correo = createDuenoDto.correo;
    dueno.telefono = createDuenoDto.telefono;

    const userExist = await this.duenoRepository.exists({where:{rut:dueno.rut}})
    if(userExist){
      throw new ConflictException(`Usuario existente`)
    }
    return this.duenoRepository.save(dueno);
  }

  async findAll(negocioId:number) {
        const negocio = await this.negocioRepository.findOneBy({negocioId});
    if(!negocio){
      throw new NotFoundException(`negocio no encontrado`)
    }
    return this.duenoRepository.find(
      {where:{negocio:{negocioId}}}
    );
  }

  findOne(id: number) {
    return this.duenoRepository.findOneBy({ id_dueno: id });
  }

  async update(id: number, updateDuenoDto: UpdateDuenoDto) {
    await this.duenoRepository.update(id, updateDuenoDto);
    return this.duenoRepository.findOneBy({ id_dueno: id });
  }

  async remove(id: number) {
    const dueno = await this.findOne(id);
    if (!dueno) {
      throw new NotFoundException(`dueño no encontrado`);
    }

    await this.duenoRepository.delete(id);

    return `Se elimino a usuario ${dueno.nombre_completo}`;
  }
}
