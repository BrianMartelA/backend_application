import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BoletasService } from './boletas.service.js';
import { CreateBoletaDto } from './dto/create-boleta.dto.js';
import { UpdateBoletaDto } from './dto/update-boleta.dto.js';

@Controller('boletas')
export class BoletasController {
  constructor(private readonly boletasService: BoletasService) {}

  @Post()
  create(@Body() createBoletaDto: CreateBoletaDto) {
    return this.boletasService.create(createBoletaDto);
  }

  @Get()
  findAll() {
    return this.boletasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boletasService.findOne(id);
  }

  @Get('dueno/:idDueno')
  findByDueno(@Param('idDueno', ParseIntPipe) idDueno: number) {
    return this.boletasService.findByDueno(idDueno);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoletaDto: UpdateBoletaDto,
  ) {
    return this.boletasService.update(id, updateBoletaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boletasService.remove(id);
  }
}