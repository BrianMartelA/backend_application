import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { CreateDuenoDto } from '../../duenos/dto/create-dueno.dto.js';
import { CreateContactoEmergenciaDto } from './create-contacto-emergencia.dto.js';

export class CreateContactoConuenoDto extends CreateContactoEmergenciaDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateDuenoDto)
  dueno: CreateDuenoDto;
}