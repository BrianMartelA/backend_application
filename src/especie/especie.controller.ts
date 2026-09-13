import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspecieService } from './especie.service.js';
import { CreateEspecieDto } from './dto/create-especie.dto.js';
import { UpdateEspecieDto } from './dto/update-especie.dto.js';

@Controller('especie')
export class EspecieController {
  constructor(private readonly especieService: EspecieService) {}

  @Post()
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especieService.create(createEspecieDto);
  }

  @Get()
  findAll() {
    return this.especieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecieDto: UpdateEspecieDto) {
    return this.especieService.update(+id, updateEspecieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especieService.remove(+id);
  }
}
