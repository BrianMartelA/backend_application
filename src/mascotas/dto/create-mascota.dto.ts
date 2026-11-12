import { Type, Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
  IsDateString,
  Min,
  IsOptional,
} from 'class-validator';

export class EspecieRefDto {
  @IsInt()
  @Min(1)
  id_especie: number;
}

export class DuenoRefDto {
  @IsInt()
  @Min(1)
  id_dueno: number;
}

export class CreateMascotaDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'Campo nombre no puede estar vacío' })
  nombre: string;

  @IsObject()
  @ValidateNested()
  @Type(() => EspecieRefDto)
  id_especie: EspecieRefDto;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'Ingrese sexo de la mascota' })
  sexo: string;

  @IsOptional()
  @IsDateString(
  {},
  { message: 'Ingrese una fecha de nacimiento válida (YYYY-MM-DD)' },
)
fecha_nacimiento?: string;

  @IsNumber()
  @Min(0, { message: 'El peso no puede ser negativo' })
  peso: number;

 @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsOptional()
  @IsString()
  microchip?: string;

  @IsOptional()
  @IsString()
  antecedentes?: string;

  @IsOptional()
  @IsString()
  alergias?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DuenoRefDto)
  id_dueno: DuenoRefDto;
}