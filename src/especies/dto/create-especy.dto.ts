import { IsNotEmpty } from "class-validator";

export class CreateEspecyDto {

    id_especie:number;
    @IsNotEmpty()
    nombre_especie:string;
}
