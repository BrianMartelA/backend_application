import { PartialType } from '@nestjs/mapped-types';
import { CreateVacunaDto } from './create-vacuna.dto.js';
import { IsInt, IsString } from 'class-validator';

export class UpdateVacunaDto extends PartialType(CreateVacunaDto) {
  @IsString()
  nombre_vacuna: string;
  @IsString()
  descripcion: string;
  @IsInt()
  precio: number;
}
