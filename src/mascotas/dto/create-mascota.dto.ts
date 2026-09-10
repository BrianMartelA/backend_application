import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Dueno } from "../../duenos/entities/dueno.entity.js";

export class CreateMascotaDto {    
    id_mascota:number;
    nombre:string;
    especie:string;
    raza:string;
    sexo:string;
    fecha_nacimiento:Date;
    peso:number;
    observaciones:string;
    microchip:number;
    antecedentes:string;
    @ValidateNested()
    @Type(()=>Dueno)
    id_dueno:Dueno;
}
