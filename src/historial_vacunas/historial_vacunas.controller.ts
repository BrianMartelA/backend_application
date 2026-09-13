import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialVacunasService } from './historial_vacunas.service.js';
import { CreateHistorialVacunaDto } from './dto/create-historial_vacuna.dto.js';
import { UpdateHistorialVacunaDto } from './dto/update-historial_vacuna.dto.js';

@Controller('historial-vacunas')
export class HistorialVacunasController {
  constructor(private readonly historialVacunasService: HistorialVacunasService) {}

  @Post()
  create(@Body() createHistorialVacunaDto: CreateHistorialVacunaDto) {
    return this.historialVacunasService.create(createHistorialVacunaDto);
  }

  @Get()
  findAll() {
    return this.historialVacunasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialVacunasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialVacunaDto: UpdateHistorialVacunaDto) {
    return this.historialVacunasService.update(+id, updateHistorialVacunaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialVacunasService.remove(+id);
  }
}
