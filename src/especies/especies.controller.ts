import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EspeciesService } from './especies.service.js';
import { CreateEspecyDto } from './dto/create-especy.dto.js';
import { UpdateEspecyDto } from './dto/update-especy.dto.js';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  create(
    
    @Body() createEspecyDto: CreateEspecyDto) {
    return this.especiesService.create(createEspecyDto);
  }

  @Get()
  findAll() {
    return this.especiesService.findAll();
  }

    @Get('perName')
  findPerName(@Query('nombre_especie')nombre_especie:string) {
    return this.especiesService.findPerName(nombre_especie);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecyDto: UpdateEspecyDto) {
    return this.especiesService.update(+id, updateEspecyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especiesService.remove(+id);
  }
}
