import { Type } from 'class-transformer';
<<<<<<< HEAD
import { ValidateNested } from 'class-validator';
import { CreateDuenoDto } from '../../duenos/dto/create-dueno.dto.js';
import { ContactoEmergencia } from '../entities/contacto-emergencia.entity.js';
import { CreateContactoEmergenciaDto } from './create-contacto-emergencia.dto.js';
export class CreateContactoConuenoDto extends CreateContactoEmergenciaDto {
=======
import { IsObject, ValidateNested } from 'class-validator';
import { CreateDuenoDto } from '../../duenos/dto/create-dueno.dto.js';
import { CreateContactoEmergenciaDto } from './create-contacto-emergencia.dto.js';

export class CreateContactoConuenoDto extends CreateContactoEmergenciaDto {
  @IsObject()
>>>>>>> master
  @ValidateNested()
  @Type(() => CreateDuenoDto)
  dueno: CreateDuenoDto;
}