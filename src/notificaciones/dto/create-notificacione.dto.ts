import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DuenoRefDto {
  @IsInt()
  @IsNotEmpty()
  id_dueno: number;
}

export class CreateNotificacioneDto {
  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsInt()
  referencia_id:number
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  fecha_envio: Date;

  @ValidateNested()
  @Type(() => DuenoRefDto)
  id_dueno: DuenoRefDto;
  
}