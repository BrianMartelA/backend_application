import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactoEmergenciaService } from './contacto-emergencia.service.js';
import { CreateContactoEmergenciaDto } from './dto/create-contacto-emergencia.dto.js';
import { UpdateContactoEmergenciaDto } from './dto/update-contacto-emergencia.dto.js';
import { CreateContactoConuenoDto } from './dto/create-contacto-dueno.dt.js';
@Controller('contacto-emergencia')
export class ContactoEmergenciaController {
  constructor(private readonly contactoEmergenciaService: ContactoEmergenciaService) {}

  @Post()
  create(@Body() createConDueño: CreateContactoConuenoDto) {
    return this.contactoEmergenciaService.createConDueño(createConDueño);
  }

  @Get()
  findAll() {
    return this.contactoEmergenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactoEmergenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactoEmergenciaDto: UpdateContactoEmergenciaDto) {
    return this.contactoEmergenciaService.update(+id, updateContactoEmergenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactoEmergenciaService.remove(+id);
  }
}
