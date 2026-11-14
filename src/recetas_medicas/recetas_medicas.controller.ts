import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { RecetasMedicasService } from './recetas_medicas.service.js';
import { CreateRecetasMedicaDto } from './dto/create-recetas_medica.dto.js';
import { UpdateRecetasMedicaDto } from './dto/update-recetas_medica.dto.js';
import { JwtAuthGuard } from '../auth/jwt-guard.auth.js';

@Controller('recetas-medicas')
export class RecetasMedicasController {
  constructor(private readonly recetasMedicasService: RecetasMedicasService) {}

  @Post('/:id_mascota')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('id_mascota', ParseIntPipe) id_mascota: number,
    @Body() createRecetasMedicaDto: CreateRecetasMedicaDto,@Req() req: any,) {
      const id_usuario = req.user.sub;
    return this.recetasMedicasService.create(createRecetasMedicaDto,id_mascota,id_usuario);
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
