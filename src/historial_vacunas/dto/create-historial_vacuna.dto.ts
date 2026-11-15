import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class VacunaRefDto {
  @IsInt()
  id_vacuna: number;
}

export class mascotaRefDto {
  @IsInt()
  id_mascota: number;
}

export class CreateHistorialVacunaDto {
  @IsOptional()
  @IsString()
  observaciones?: string;

  @Type(() => Date)
  @IsDate()
  proxima_dosis: Date;

  @IsNotEmpty()
  @IsString()
  lote: string;

  @ValidateNested()
  @Type(() => mascotaRefDto)
  id_mascota: mascotaRefDto;

  @ValidateNested()
  @Type(() => VacunaRefDto)
  id_vacuna: VacunaRefDto;
}