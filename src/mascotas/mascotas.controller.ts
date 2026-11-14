import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { MascotasService } from './mascotas.service.js';
import { CreateMascotaDto } from './dto/create-mascota.dto.js';
import { UpdateMascotaDto } from './dto/update-mascota.dto.js';
import { JwtAuthGuard } from '../auth/jwt-guard.auth.js';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    negocioId: number;
    rol: string;
  };
}

@Controller('mascotas')
@UseGuards(JwtAuthGuard)
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createMascotaDto: CreateMascotaDto,
  ) {
    return this.mascotasService.create(
      req.user.negocioId,
      createMascotaDto,
    );
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.mascotasService.findAll(req.user.negocioId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.mascotasService.findOne(id, req.user.negocioId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() updateMascotaDto: UpdateMascotaDto,
  ) {
    return this.mascotasService.update(
      id,
      req.user.negocioId,
      updateMascotaDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.mascotasService.remove(id, req.user.negocioId);
  }
}