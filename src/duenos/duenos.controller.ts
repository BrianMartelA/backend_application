import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DuenosService } from './duenos.service.js';
import { CreateDuenoDto } from './dto/create-dueno.dto.js';
import { UpdateDuenoDto } from './dto/update-dueno.dto.js';

@Controller('duenos')
export class DuenosController {
  constructor(private readonly duenosService: DuenosService) {}

  @Post()
  create(@Body() createDuenoDto: CreateDuenoDto) {
    return this.duenosService.create(createDuenoDto);
  }

  @Get()
  findAll() {
    return this.duenosService.findAll();
  }

  @Get(':nombre')
  async findOne(@Param('nombre') nombre: string) {
    const duenoFind= await this.duenosService.findOne(nombre);
    if(!duenoFind){
      throw new NotFoundException(`Usuario con nombre ${nombre} inexistente`)
    }
    return duenoFind;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDuenoDto: UpdateDuenoDto) {
    return this.duenosService.update(+id, updateDuenoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.duenosService.remove(+id);
  }
}
