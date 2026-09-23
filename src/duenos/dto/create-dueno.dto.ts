import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Negocio } from '../../negocio/entities/negocio.entity.js';

export class NegocioRefDto {
  @IsInt()
  @IsNotEmpty()
  negocioId: number;
}

export class CreateDuenoDto {
  id_dueno: number;
  @IsNotEmpty({ message: 'El campo no puede quedar en blanco.' })
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, {
    message: 'El RUT debe tener el formato 12.345.678-5.',
  })
  rut: string;
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  nombre_completo: string;

  @IsNotEmpty()
  telefono: string;
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  correo: string;
  @IsNotEmpty()
  direccion: string;
  fecha_registro: string;
  @IsObject()
  @ValidateNested()
  @Type(() => Negocio)
  negocioId: NegocioRefDto;
}
