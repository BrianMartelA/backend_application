import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { Type } from 'class-transformer';

export class UpdateCitaDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_hora?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Ingrese motivo de visita' })
  @MaxLength(500)
  motivo?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Pendiente', 'Confirmada', 'Cancelada', 'Completada'])
  estado?: string;
}