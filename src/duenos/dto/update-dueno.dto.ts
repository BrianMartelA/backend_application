import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { CreateDuenoDto } from './create-dueno.dto.js';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateDuenoDto extends PartialType(CreateDuenoDto) {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, {
    message: 'El RUT debe tener el formato 12.345.678-5.',
  })
  rut?: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  nombre_completo?: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?\d+$/, {
    message: 'Ingrese un número de teléfono válido.',
  })
  telefono?: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Ingrese un correo válido.' })
  @IsNotEmpty()
  correo?: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\p{L}\p{N}\s.,#°º()\/-]+$/u, {
    message: 'La dirección contiene caracteres no permitidos.',
  })
  direccion?: string;
}