import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotaDto } from './create-mascota.dto.js';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Dueno } from '../../duenos/entities/dueno.entity.js';

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  nombre: string;
  @IsNotEmpty()
  especie: string;
  @IsNotEmpty()
  raza: string;
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
  @ValidateNested()
  @Type(() => Dueno)
  id_dueno: Dueno;
}
