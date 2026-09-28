import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';
import { Vacuna } from '../../vacunas/entities/vacuna.entity.js';

export class vacunaRefDto {
  @IsInt()
  id_vacuna: number;
}

export class mascotaRefDto{
@IsInt()
id_mascota:number;
}
export class CreateHistorialVacunaDto {
  id_historial: number;
  @IsNotEmpty()
  observaciones:string;
  fecha_aplicación: Date;
  @Type(() => Date)
  @IsDate()
  proxima_dosis: Date;
  lote: string;
  @ValidateNested()
  @Type(() => Mascota)
  id_mascota: Mascota;
  @ValidateNested()
  @Type(()=>Vacuna)
  id_vacuna:Vacuna;

}
