import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateDuenoDto } from '../../duenos/dto/create-dueno.dto.js';
import { ContactoEmergencia } from '../entities/contacto-emergencia.entity.js';
import { CreateContactoEmergenciaDto } from './create-contacto-emergencia.dto.js';
export class CreateContactoConuenoDto extends CreateContactoEmergenciaDto {
  @ValidateNested()
  @Type(() => CreateDuenoDto)
  dueno: CreateDuenoDto;
}