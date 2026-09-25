import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, ValidateNested } from "class-validator";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";

export class CreateHistorialVacunaDto {
    id_vacuna:number;
    @IsNotEmpty({message:"Ingrese el nombre de una vacuna"})
    nombre_vacuna:string;
      @Type(() => Date)
      @IsDate()
    fecha_aplicación:Date;
      @Type(() => Date)
      @IsDate()
    proxima_dosis:Date;
    lote:string;
    @ValidateNested()
    @Type(()=>Mascota)
    id_mascota:Mascota;
    
}
