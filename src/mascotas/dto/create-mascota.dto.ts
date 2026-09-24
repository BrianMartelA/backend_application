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
  @IsNotEmpty({message:`Campo nombre no puede estar vacio`})
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
  @IsNotEmpty({message:`Campo fecha no puede estar vacio`})
  fecha_nacimiento: Date;
  @IsNotEmpty({message:`Campo peso no puede estar vacio`})
  peso: number;
  @IsNotEmpty({message:`Campo observaciones no puede estar vacio`})
  observaciones: string;
  @IsNotEmpty({message:`Campo microchip no puede estar vacio`})
  @IsNumber()
  microchip: number;
  @IsNotEmpty({message:``})
  antecedentes: string;
  alergias: string;

  @ValidateNested()
  @Type(() => Dueno)
  id_dueno: Dueno;
}
