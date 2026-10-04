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
  @Transform(({ value }) => value?.trim())
  nombre: string;
  peso: number;

  @IsNumber()
  microchip: number;
  antecedentes: string;
  alergias: string;
}
