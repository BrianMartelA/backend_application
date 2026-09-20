import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post('/:negocioId')
  create(
    @Param('negocioId',ParseIntPipe) negocioId:number,
    @Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(negocioId,createCitaDto);
  }

  @Get()
  findAll(@Query('negocioId', ParseIntPipe) negocioId: number) {
    return this.citasService.findAll(negocioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(+id, updateCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasService.remove(+id);
  }
}
