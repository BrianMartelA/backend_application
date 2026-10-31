import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordatorioService } from './recordatorio.service.js';
import { CreateRecordatorioDto } from './dto/create-recordatorio.dto.js';
import { UpdateRecordatorioDto } from './dto/update-recordatorio.dto.js';

@Controller('recordatorio')
export class RecordatorioController {
  constructor(private readonly recordatorioService: RecordatorioService) {}

  @Post()
  create(@Body() createRecordatorioDto: CreateRecordatorioDto) {
    return this.recordatorioService.create(createRecordatorioDto);
  }

  @Get()
  findAll() {
    return this.recordatorioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordatorioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordatorioDto: UpdateRecordatorioDto) {
    return this.recordatorioService.update(+id, updateRecordatorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordatorioService.remove(+id);
  }
}
