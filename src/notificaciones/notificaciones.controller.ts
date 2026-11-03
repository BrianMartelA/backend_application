import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service.js';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto.js';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto.js';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post()
  create(@Body() createNotificacioneDto: CreateNotificacioneDto) {
    return this.notificacionesService.create(createNotificacioneDto);
  }

  @Get()
  findAll(@Query('negocioId', ParseIntPipe) negocioId: number) {
    return this.notificacionesService.findAll(negocioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificacioneDto: UpdateNotificacioneDto) {
    return this.notificacionesService.update(+id, updateNotificacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacionesService.remove(+id);
  }
}
