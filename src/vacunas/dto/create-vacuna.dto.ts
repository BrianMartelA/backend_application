import { Type } from "class-transformer";
import { IsInt, ValidateNested } from "class-validator";
import { Especy } from "../../especies/entities/especy.entity.js";

export class especieRefDto{
    @IsInt()
    id_especie:number;
}
export class CreateVacunaDto {
    id_vacuna:number;
    nombre_vacuna:string;
    descripcion:string;
    @ValidateNested()
    @Type(()=>Especy)
    id_especie:Especy
}
