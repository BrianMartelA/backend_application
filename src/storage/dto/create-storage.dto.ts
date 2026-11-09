import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class mascotaRefto{
    @IsInt()
    @IsNotEmpty()
    id_mascota:number
}

export class CreateStorageDto {
id_examen:number;
@ValidateNested()
@Type(()=>mascotaRefto)
id_mascota:mascotaRefto;
@IsString()
@IsNotEmpty()
tipo_examen:string;
@IsDate()
fecha_realización:Date;
@IsNotEmpty()
resultado_detalles:string;;
@IsNotEmpty()
archivo_path:string
}
