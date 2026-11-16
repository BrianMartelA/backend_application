import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";

export class MascotaRefDto{
    @IsInt()
    @IsNotEmpty()
    id_mascota:number;
}

export class CreateRecetasMedicaDto {
id_receta:number;
fecha:Date;
medicamentos_indicaciones:string;
@ValidateNested()
@Type(() => MascotaRefDto)
id_mascota: MascotaRefDto;
}
