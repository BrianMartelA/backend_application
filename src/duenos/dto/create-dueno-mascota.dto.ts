import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateDuenoDto } from './create-dueno.dto.js';
import { CreateMascotaDto } from '../../mascotas/dto/create-mascota.dto.js';

export class CreateDuenoConMascotasDto extends CreateDuenoDto {
  
  @ValidateNested({ each: true })
  @Type(() => CreateMascotaDto)
  mascotas: CreateMascotaDto[];
}