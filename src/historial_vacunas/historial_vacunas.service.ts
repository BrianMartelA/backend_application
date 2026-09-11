import { Injectable } from '@nestjs/common';
import { CreateHistorialVacunaDto } from './dto/create-historial_vacuna.dto.js';
import { UpdateHistorialVacunaDto } from './dto/update-historial_vacuna.dto.js';

@Injectable()
export class HistorialVacunasService {
  create(createHistorialVacunaDto: CreateHistorialVacunaDto) {
    return 'This action adds a new historialVacuna';
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
