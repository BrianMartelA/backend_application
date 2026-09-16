import { IsNotEmpty } from "class-validator";

export class CreateEspecyDto {
    @IsNotEmpty()
    id_especie:number;
    @IsNotEmpty()
    nombre_especie:string;
}
