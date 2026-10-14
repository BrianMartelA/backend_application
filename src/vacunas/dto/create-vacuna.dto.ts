import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Especy } from '../../especies/entities/especy.entity.js';

export class especieRefDto {
  @IsInt()
  id_especie: number;
}
export class CreateVacunaDto {
  id_vacuna: number;
  @IsString()
  nombre_vacuna: string;
  @IsString()
  descripcion: string;
  @IsInt()
  precio:number;
  @ValidateNested()
  @Type(() => Especy)
  id_especie: Especy;
}
