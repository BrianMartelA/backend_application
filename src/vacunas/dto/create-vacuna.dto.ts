import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Especy } from '../../especies/entities/especy.entity.js';

export class especieRefDto {
  @IsInt()
  id_especie: number;
}
export class CreateVacunaDto {
  @IsString()
  nombre_vacuna: string;
  @IsString()
  descripcion: string;
  @IsInt()
  precio:number;
  @ValidateNested()
  @Type(() => especieRefDto)
  id_especie: especieRefDto;
}
