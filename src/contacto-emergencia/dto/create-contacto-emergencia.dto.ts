import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreateContactoEmergenciaDto {
  @Matches(/^[\p{L}\p{N}\s.,;:!?()\/-]+$/u, {
    message: 'La razón contiene caracteres no permitidos.',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  razon_consulta: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  nom_mascota: string;
}
