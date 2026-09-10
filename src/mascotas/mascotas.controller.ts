import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(+id);
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
