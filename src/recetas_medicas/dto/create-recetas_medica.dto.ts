import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";
import { mascotaRefDto } from "../../historial_vacunas/dto/create-historial_vacuna.dto.js";

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
@Type(()=>Mascota)
id_mascota:mascotaRefDto;
}
