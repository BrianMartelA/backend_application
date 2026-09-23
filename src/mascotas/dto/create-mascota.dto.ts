import { Type, Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
export class RazaRefDto {
  @IsInt()
  id_raza: number;
}
export class especieRefDto {
  @IsInt()
  id_especie: number;
}
export class CreateMascotaDto {
  id_mascota: number;
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  nombre: string;
  @IsObject()
  @ValidateNested()
  @Type(() => especieRefDto)
  id_especie: especieRefDto;
  @IsObject()
  @ValidateNested()
  @Type(() => RazaRefDto)
  id_raza: RazaRefDto;
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  sexo: string;
  @IsNotEmpty()
  fecha_nacimiento: Date;
  @IsNotEmpty()
  peso: number;
  @IsNotEmpty()
  observaciones: string;
  @IsNotEmpty()
  @IsNumber()
  microchip: number;
  @IsNotEmpty()
  antecedentes: string;
  alergias: string;

  @ValidateNested()
  @Type(() => Dueno)
  id_dueno: Dueno;
}
