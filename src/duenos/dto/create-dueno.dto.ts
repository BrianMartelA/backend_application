import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Negocio } from '../../negocio/entities/negocio.entity.js';

export class CreateDuenoDto {
  id_dueno: number;
  @IsNotEmpty({ message: 'El campo no puede quedar en blanco.' })
  rut: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  fecha_registro: string;
  @ValidateNested()
  @Type(()=>Negocio)
  negocioId: Negocio;
}
