import { PartialType } from '@nestjs/mapped-types';
import { CreateDuenoDto } from './create-dueno.dto.js';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Negocio } from '../../negocio/entities/negocio.entity.js';

export class UpdateDuenoDto extends PartialType(CreateDuenoDto) {

      @IsNotEmpty({ message: 'El campo no puede quedar en blanco.' })
      rut: string;
      @Transform(({ value }) => value?.trim())
      @IsNotEmpty()
      @IsString()
      nombre: string;
      @Transform(({ value }) => value.trim())
      @IsNotEmpty()
      apellido: string;
      @IsNotEmpty()
      telefono: string;
      @Transform(({ value }) => value.toLowerCase())
      @IsNotEmpty()
      email: string;
      @IsNotEmpty()
      direccion: string;
      fecha_registro: string;
      @ValidateNested()
      @Type(() => Negocio)
      negocioId: Negocio;
}
