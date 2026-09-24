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
  @Transform(({ value }) => value?.trim())
  nombre_completo: string;

  @IsNotEmpty()
  @Matches(/^\+?\d+$/, { message: `ingrese un numero de telefono valido` })
  telefono: string;
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty({message:`Campo correo no puede estar en blanco`})
  correo: string;
  @IsNotEmpty({message:`Campo dirección no puede estar en blanco`})
  direccion: string;
  fecha_registro: string;
  @IsObject()
  @ValidateNested()
  @Type(() => Negocio)
  negocioId: NegocioRefDto;
}
