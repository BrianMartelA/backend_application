import { IsDate, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';
import { Type } from 'class-transformer';
import { Negocio } from '../../negocio/entities/negocio.entity.js';

export class DuenoRefDto {
  @IsInt()
  @IsNotEmpty()
  id_dueno: number;
}

export class NegocioRefDto {
  @IsInt()
  negocioId: number;
}

export class MascotaRefDto {
  @IsInt()
  @IsNotEmpty()
  id_mascota: number;
}
export class CreateCitaDto {
  id_cita: number;
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({message:"Seleccione una fecha"})
  fecha_hora: Date;
  @IsNotEmpty({ message: `Ingrese motivo de visita` })
  motivo: string;
  estado: string;
  fecha_creacion: Date;
  @ValidateNested()
  @Type(() => Mascota)
  id_mascota: MascotaRefDto;
  @ValidateNested()
  @Type(() => Dueno)
  id_dueno: DuenoRefDto;
  @ValidateNested()
  @Type(() => Negocio)
  negocioId: NegocioRefDto;
}
