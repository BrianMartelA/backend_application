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
  ParseDatePipe,
  UseGuards,
  Req,
} from '@nestjs/common';
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
    return this.citasService.create(req.user.negocioId, createCitaDto);
  }

  @Get('todas')
  findAllCitas(@Query('negocioId', ParseIntPipe) negocioId: number) {
    return this.citasService.findAllCitas(negocioId);
  }

  @Get(':negocioId')
  findAll(
    @Req() req: AuthenticatedRequest,    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.citasService.findAll(req.user.negocioId, fechaInicio, fechaFin);
  }

  @Get(':negocioId/detalle/:id')
  findOne(
    @Param('negocioId', ParseIntPipe) negocioId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.citasService.findOne(negocioId, id);
  }

  @Patch(':negocioId/:id')
  update(
    @Param('negocioId', ParseIntPipe) negocioId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCitaDto: UpdateCitaDto,
  ) {
    return this.citasService.update(negocioId, id, updateCitaDto);
  }

  @Delete(':negocioId/:id')
  remove(
    @Param('negocioId', ParseIntPipe) negocioId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.citasService.remove(negocioId, id);
  }
}
