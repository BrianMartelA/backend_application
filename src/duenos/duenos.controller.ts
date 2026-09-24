import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query } from '@nestjs/common';
import { DuenosService } from './duenos.service.js';
import { CreateDuenoDto } from './dto/create-dueno.dto.js';
import { UpdateDuenoDto } from './dto/update-dueno.dto.js';
import { CreateDuenoConMascotasDto } from './dto/create-dueno-mascota.dto.js';

@Controller('duenos')
export class DuenosController {
  constructor(private readonly duenosService: DuenosService) {}

  @Post('/:negocioId')
  create(
    @Param('negocioId', ParseIntPipe) negocioId: number,
    @Body() createDuenoDto: CreateDuenoDto) {
    return this.duenosService.create(negocioId,createDuenoDto);
  }
/*
  @Post('con-mascotas')
createConMascotas(
  @Body() dto: CreateDuenoConMascotasDto,
) {
  return this.duenosService.createConMascota(dto);
}
*/
  @Get()
  findAll(@Query('negocioId', ParseIntPipe) negocioId: number) {
    return this.duenosService.findAll(negocioId);
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: string) {
    const duenoFind= await this.duenosService.findOne(parseInt(id));
    if(!duenoFind){
      throw new NotFoundException(`Usuario con nombre ${id} inexistente`)
    }
    return duenoFind;
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: string, @Body() updateDuenoDto: UpdateDuenoDto) {
    const patchDueno = await this.duenosService.update(+id,updateDuenoDto);
    if(!patchDueno){
      throw new NotFoundException(`Máscota no existente`)
    }
    return patchDueno;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.duenosService.remove(+id);
  }
}
