import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';
import { JwtAuthGuard } from '../auth/jwt-guard.auth.js';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    negocioId: number;
    rol: string;
  };
}

@Controller('citas')
@UseGuards(JwtAuthGuard)
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createCitaDto: CreateCitaDto,
  ) {
    return this.citasService.create(
      req.user.negocioId,
      createCitaDto,
    );
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.citasService.findAll(
      req.user.negocioId,
      fechaInicio,
      fechaFin,
    );
  }

  @Get('todas')
  findAllCitas(@Req() req: AuthenticatedRequest) {
    return this.citasService.findAllCitas(req.user.negocioId);
  }

  @Get(':id')
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.citasService.findOne(req.user.negocioId, id);
  }

  @Patch(':id')
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCitaDto: UpdateCitaDto,
  ) {
    return this.citasService.update(
      req.user.negocioId,
      id,
      updateCitaDto,
    );
  }

  @Delete(':id')
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.citasService.remove(req.user.negocioId, id);
  }
}