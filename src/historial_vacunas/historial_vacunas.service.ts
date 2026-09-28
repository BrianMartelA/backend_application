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

  findAll() {
    return `This action returns all historialVacunas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialVacuna`;
  }

  update(id: number, updateHistorialVacunaDto: UpdateHistorialVacunaDto) {
    return `This action updates a #${id} historialVacuna`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialVacuna`;
  }
}
