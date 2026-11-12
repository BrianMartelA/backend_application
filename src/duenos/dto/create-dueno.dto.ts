import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateDuenoDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'El RUT no puede quedar en blanco.' })
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, {
    message: 'El RUT debe tener el formato 12.345.678-5.',
  })
  rut: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede quedar en blanco.' })
  nombre_completo: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'El teléfono no puede quedar en blanco.' })
  @Matches(/^\+?\d+$/, {
    message: 'Ingrese un número de teléfono válido.',
  })
  telefono: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Ingrese un correo válido.' })
  @IsNotEmpty({ message: 'El correo no puede quedar en blanco.' })
  correo: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'La dirección no puede quedar en blanco.' })
  @Matches(/^[\p{L}\p{N}\s.,#°º()\/-]+$/u, {
    message: 'La dirección contiene caracteres no permitidos.',
  })
  direccion: string;
}