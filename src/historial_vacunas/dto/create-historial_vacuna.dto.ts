import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";

export class CreateHistorialVacunaDto {
    id_vacuna:number;
    nombre_vacuna:string;
    fecha_aplicación:Date;
    proxima_dosis:Date;
    lote:string;
    @ValidateNested()
    @Type(()=>Mascota)
    id_mascota:Mascota;
    
}
