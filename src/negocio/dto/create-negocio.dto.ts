import { IsNotEmpty, Matches } from 'class-validator';

export class CreateNegocioDto {
  negocioId: number;
  @IsNotEmpty({message:`Ingrese el nombre del negocio`})
  nombre_negocio: string;
  @IsNotEmpty({message:`Ingrese dirección del negocio`})
  direccion_negocio: string;
  fecha_registro: Date;
  @IsNotEmpty()
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, {
    message: 'El RUT debe tener el formato 12.345.678-5.',
  })
  rut: string;
}
