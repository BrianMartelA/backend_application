import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Dueno } from "../../duenos/entities/dueno.entity.js";

export class CreateNotificacioneDto {
    id_notificacion:string;
    mensaje:string;
    tipo:string;
    estado:string;
    fecha_envio:Date;
    @ValidateNested()
    @Type(()=>Dueno)
    id_dueno:Dueno;

}
