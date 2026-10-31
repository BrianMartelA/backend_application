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

import { DuenosService } from './duenos.service.js';
import { CreateDuenoDto } from './dto/create-dueno.dto.js';
import { UpdateDuenoDto } from './dto/update-dueno.dto.js';
import { JwtAuthGuard } from '../auth/jwt-guard.auth.js';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    negocioId: number;
    rol: string;
  };
}

@Controller('duenos')
@UseGuards(JwtAuthGuard)
export class DuenosController {
  constructor(private readonly duenosService: DuenosService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createDuenoDto: CreateDuenoDto,
  ) {
    return this.duenosService.create(
      req.user.negocioId,
      createDuenoDto,
    );
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.duenosService.findAll(req.user.negocioId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.duenosService.findOne(id, req.user.negocioId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() updateDuenoDto: UpdateDuenoDto,
  ) {
    return this.duenosService.update(
      id,
      req.user.negocioId,
      updateDuenoDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.duenosService.remove(id, req.user.negocioId);
  }
}