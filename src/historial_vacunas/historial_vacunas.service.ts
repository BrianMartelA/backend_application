import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistorialVacunaDto } from './dto/create-historial_vacuna.dto.js';
import { UpdateHistorialVacunaDto } from './dto/update-historial_vacuna.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialVacuna } from './entities/historial_vacuna.entity.js';
import { Repository } from 'typeorm';
import { Vacuna } from '../vacunas/entities/vacuna.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';

@Injectable()
export class HistorialVacunasService {
  constructor(
    @InjectRepository(HistorialVacuna)
    private historialRepository: Repository<HistorialVacuna>,
    @InjectRepository(Vacuna) private vacunaRepository: Repository<Vacuna>,
    @InjectRepository(Mascota) private mascotaRepository: Repository<Mascota>,
  ) {}
  async create(createHistorialVacunaDto: CreateHistorialVacunaDto) {
    const historialVacuna = new HistorialVacuna();

    const vacuna = await this.vacunaRepository.findOne({
      where: { id_vacuna: createHistorialVacunaDto.id_vacuna.id_vacuna },
    });
    
    const mascota = await this.mascotaRepository.findOne({
      where: { id_mascota: createHistorialVacunaDto.id_mascota.id_mascota },
    });
    if (!vacuna) {
      throw new NotFoundException(`vacuna no encontrada`);
    }
    if (!mascota) {
      throw new NotFoundException(`mascota no encontrada`);
    }
    historialVacuna.mascota=mascota;
    historialVacuna.observaciones=createHistorialVacunaDto.observaciones;
    historialVacuna.proxima_dosis=createHistorialVacunaDto.proxima_dosis;
    historialVacuna.lote=createHistorialVacunaDto.lote;
    historialVacuna.mascota=mascota;
    historialVacuna.vacuna=vacuna;
    return this.historialRepository.save(historialVacuna);
  }

  async findAll(negocioId:number,id_mascota:number) {
    const historialVacuna = await this.historialRepository.find({
    where: {
      mascota: {
        id_mascota,
        dueno: {
          negocio: {
            negocioId,
          },
        },
      },
    },
    relations: {
      mascota: {
        dueno: {
          negocio: true,
        },
      },
      vacuna: true,
    },
  });

  if(historialVacuna.length==0) throw new NotFoundException("No existe historial vacunas")

    return historialVacuna;
  }

  findOne(id: number) {

    return  this.historialRepository.findOneBy({id_historial:id});
  }

  async update(id: number, updateHistorialVacunaDto: UpdateHistorialVacunaDto) {
    await this.historialRepository.update(id,updateHistorialVacunaDto)
    return this.historialRepository.findOneBy({id_historial:id});
  }

  async remove(id: number) {
    const historial = await this.findOne(id)
    if(!historial) throw new NotFoundException("historial no encontrado")

      await this.historialRepository.delete(id);
    return `historial removido`;
  }
}
