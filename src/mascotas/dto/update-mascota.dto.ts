import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotaDto } from './create-mascota.dto.js';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Dueno } from '../../duenos/entities/dueno.entity.js';

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  nombre: string;
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
}
