import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';
import { CreateMascotaDto } from './dto/create-mascota.dto.js';
import { UpdateMascotaDto } from './dto/update-mascota.dto.js';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  create(@Body() createMascotaDto: CreateMascotaDto) {
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  findAll(@Query('negocioId', ParseIntPipe) negocioId: number) {
    return this.mascotasService.findAll(negocioId);
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: string,@Query('negocioId', ParseIntPipe) negocioId: number) {
    const mascotaFind=await this.mascotasService.findOne(parseInt(id),negocioId);
    if(!mascotaFind){
throw new NotFoundException(`Mascota no encontrada `)
    }
    return this.mascotasService.findOne(+id,negocioId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotasService.update(+id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(+id);
  }
}
