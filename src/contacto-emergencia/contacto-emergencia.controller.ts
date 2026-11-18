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
} from '@nestjs/common';
import { ContactoEmergenciaService } from './contacto-emergencia.service.js';
import { UpdateContactoEmergenciaDto } from './dto/update-contacto-emergencia.dto.js';
import { CreateContactoConuenoDto } from './dto/create-contacto-dueno.dt.js';
import { JwtAuthGuard } from '../auth/jwt-guard.auth.js';
@Controller('contacto-emergencia')
export class ContactoEmergenciaController {
  constructor(
    private readonly contactoEmergenciaService: ContactoEmergenciaService,
  ) {}

  @Post('negocio/:negocioId')
  create(
    @Param('negocioId', ParseIntPipe) negocioId: number,
    @Body() createConDueño: CreateContactoConuenoDto,
  ) {
    return this.contactoEmergenciaService.createConDueño(
      negocioId,
      createConDueño,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  
  findAll(@Query('negocioId', ParseIntPipe) negocioId: number) {
    return this.contactoEmergenciaService.findAll(negocioId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  
  findOne(@Param('id') id: string) {
    return this.contactoEmergenciaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  
  update(
    @Param('id') id: string,
    @Body() updateContactoEmergenciaDto: UpdateContactoEmergenciaDto,
  ) {
    return this.contactoEmergenciaService.update(
      +id,
      updateContactoEmergenciaDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  
  remove(@Param('id') id: string) {
    return this.contactoEmergenciaService.remove(+id);
  }
}
