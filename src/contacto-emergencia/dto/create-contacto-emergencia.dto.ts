import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateContactoEmergenciaDto {
  @IsString()
  @IsNotEmpty()
  razon_consulta: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  nom_mascota: string;
}
