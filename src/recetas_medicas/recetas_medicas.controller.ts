import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RecetasMedicasService } from './recetas_medicas.service.js';
import { CreateRecetasMedicaDto } from './dto/create-recetas_medica.dto.js';
import { UpdateRecetasMedicaDto } from './dto/update-recetas_medica.dto.js';

@Controller('recetas-medicas')
export class RecetasMedicasController {
  constructor(private readonly recetasMedicasService: RecetasMedicasService) {}

  @Post('/:id_mascota')
  create(
    @Param('id_mascota', ParseIntPipe) id_mascota: number,
    @Body() createRecetasMedicaDto: CreateRecetasMedicaDto) {
    return this.recetasMedicasService.create(createRecetasMedicaDto,id_mascota);
  }

  @Get()
  findAll() {
    return this.recetasMedicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetasMedicasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetasMedicaDto: UpdateRecetasMedicaDto) {
    return this.recetasMedicasService.update(+id, updateRecetasMedicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetasMedicasService.remove(+id);
  }
}
