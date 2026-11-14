import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
  IsOptional,
  IsIn,
} from 'class-validator';

import { Type } from 'class-transformer';

export class DuenoRefDto {
  @IsInt()
  @IsNotEmpty()
  id_dueno: number;
}

export class MascotaRefDto {
  @IsInt()
  @IsNotEmpty()
  id_mascota: number;
}

export class CreateCitaDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Seleccione una fecha' })
  fecha_hora: Date;

  @IsString()
  @IsNotEmpty({ message: 'Ingrese motivo de visita' })
  @MaxLength(500)
  motivo: string;

  @IsOptional()
  @IsString()
  @IsIn(['Pendiente', 'Confirmada', 'Cancelada', 'Completada'])
  estado?: string;

  @ValidateNested()
  @Type(() => MascotaRefDto)
  id_mascota: MascotaRefDto;

  @ValidateNested()
  @Type(() => DuenoRefDto)
  id_dueno: DuenoRefDto;
}