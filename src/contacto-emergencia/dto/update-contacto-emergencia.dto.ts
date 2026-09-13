import { PartialType } from '@nestjs/mapped-types';
import { CreateContactoEmergenciaDto } from './create-contacto-emergencia.dto.js';

export class UpdateContactoEmergenciaDto extends PartialType(CreateContactoEmergenciaDto) {}
