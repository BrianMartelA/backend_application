import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class VacunaRefDto {
  @IsInt()
  @IsNotEmpty()
  id_mascota: number;
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
@IsNotEmpty()
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