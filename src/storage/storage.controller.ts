import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { CreateStorageDto } from './dto/create-storage.dto.js';
import { UpdateStorageDto } from './dto/update-storage.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-guard.auth.js';
const tiposPermitidos = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp'
];
interface AuthenticatedRequest {
  user: {
    sub: number;
    negocioId: number;
    rol: string;
  };
}
@Controller('storage')
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('examen')
  @UseInterceptors(FileInterceptor('archivo', {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
      if (!tiposPermitidos.includes(file.mimetype)) {
        return callback(
          new BadRequestException(
            'Solo se permiten archivos PDF, JPG o PNG',
          ),
          false,
        );
      }

      callback(null, true);
    },
  }))
  async subirExamen(
    @UploadedFile() archivo: Express.Multer.File,
    @Body('id_mascota') idMascota: string,
    @Body('tipo_examen') tipoExamen: string,
    @Body('fecha_realizacion') fechaRealizacion: string,
    @Body('resultado_detalles') resultadoDetalles: string,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!archivo) {
      throw new BadRequestException('Debe seleccionar un archivo');
    }

    return this.storageService.subirExamen(
      archivo,
      Number(idMascota),
      tipoExamen,
      fechaRealizacion,
      resultadoDetalles,
      req.user
    );
  }

  @Get('examenes')
  listarExamenes(@Req() req: AuthenticatedRequest) {
    return this.storageService.listarExamenes(req.user.negocioId);
  }
}
