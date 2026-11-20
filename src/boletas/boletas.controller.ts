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
  UseGuards,
  Req,
} from '@nestjs/common';
import { BoletasService } from './boletas.service.js';
import { CreateBoletaDto } from './dto/create-boleta.dto.js';
import { UpdateBoletaDto } from './dto/update-boleta.dto.js';
import { JwtAuthGuard } from '../auth/jwt-guard.auth.js';
interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    negocioId: number;
    rol: string;
  };
}
@Controller('boletas')
@UseGuards(JwtAuthGuard)
export class BoletasController {
  constructor(private readonly boletasService: BoletasService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createBoletaDto: CreateBoletaDto,
  ) {
    return this.boletasService.create(createBoletaDto);
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query('negocioId', ParseIntPipe) negocioId: number,
  ) {
    return this.boletasService.findAll(negocioId);
  }
  @Get('items-cobrados')
  itemsCobrados(
    @Req() req: AuthenticatedRequest,
    @Query('id_mascota', ParseIntPipe) idMascota: number,
  ) {
    return this.boletasService.clavesCobradas(idMascota);
  }

  @Get(':id')
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.boletasService.findOne(id);
  }

  @Get('dueno/:idDueno')
  findByDueno(
    @Req() req: AuthenticatedRequest,
    @Param('idDueno', ParseIntPipe) idDueno: number,
  ) {
    return this.boletasService.findByDueno(idDueno);
  }

  @Patch(':id')
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoletaDto: UpdateBoletaDto,
  ) {
    return this.boletasService.update(id, updateBoletaDto);
  }

  @Delete(':id')
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.boletasService.remove(id);
  }
}
