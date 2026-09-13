import { ValidateNested } from "class-validator";
import { Dueno } from "../../duenos/entities/dueno.entity.js";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";
import { Type } from "class-transformer";

export class CreateCitaDto {
    id_cita:number;
    fecha_hora:Date;
    motivo:string;
    estado:string;
    fecha_creación:Date;
    @ValidateNested()
    @Type(()=>Mascota)
    id_mascota:Mascota;
    @ValidateNested()
    @Type(()=>Dueno)
    id_dueno:Dueno
}
