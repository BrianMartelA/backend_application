import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile, BadRequestException, ParseIntPipe, Query } from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { CreateStorageDto } from './dto/create-storage.dto.js';
import { UpdateStorageDto } from './dto/update-storage.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

@Post('examen')
  @UseInterceptors(FileInterceptor('archivo'))
  async subirExamen(
    @UploadedFile() archivo: Express.Multer.File,
    @Body('id_mascota') idMascota: string,
    @Body('tipo_examen') tipoExamen: string,
    @Body('fecha_realizacion') fechaRealizacion: string,
    @Body('resultado_detalles') resultadoDetalles: string,
  ) {
    if (!archivo) {
      throw new BadRequestException(
        'Debe seleccionar un archivo',
      );
    }

    return this.storageService.subirExamen(
      archivo,
      Number(idMascota),
      tipoExamen,
      fechaRealizacion,
      resultadoDetalles,
    );
  }

  @Get('examenes')
listarExamenes(@Query('negocioId', ParseIntPipe) negocioId: number) {
  return this.storageService.listarExamenes(negocioId);
}
}
