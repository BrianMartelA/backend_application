import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';
import { Type } from 'class-transformer';

export class DuenoRefDto {
  @IsInt()
  @IsNotEmpty()
  id_dueno: number;
}

export class MascotaRefDto {
  @IsInt()
  @IsNotEmpty()
  id_mascota: number;
}
export class CreateCitaDto {
  id_cita: number;
  fecha: string;
  hora:string;
  motivo: string;
  estado: string;
  fecha_creación: Date;
  @ValidateNested()
  @Type(() => Mascota)
  id_mascota: MascotaRefDto;
  @ValidateNested()
  @Type(() => Dueno)
  id_dueno: DuenoRefDto;
}
