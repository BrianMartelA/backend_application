import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Negocio } from "../../negocio/entities/negocio.entity.js";

export class CreateContactoEmergenciaDto {
    id_contacto:number;
    razon_consulta:string;
    nom_mascota:string;
    @ValidateNested()
    @Type(()=>Negocio)
    negocioId:Negocio
}
