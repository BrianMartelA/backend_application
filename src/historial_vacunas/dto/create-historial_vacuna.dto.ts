import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MascotaRefDto {
  @IsInt()
  @IsNotEmpty()
  id_mascota: number;
}

export class VacunaRefDto {
  @IsInt()
  @IsNotEmpty()
  id_vacuna: number;
}

export class CreateHistorialVacunaDto {
  @IsString()
  @IsNotEmpty()
  observaciones: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  proxima_dosis: Date;

  @IsString()
  @IsNotEmpty()
  lote: string;

  @ValidateNested()
  @Type(() => MascotaRefDto)
  id_mascota: MascotaRefDto;

  @ValidateNested()
  @Type(() => VacunaRefDto)
  id_vacuna: VacunaRefDto;
}