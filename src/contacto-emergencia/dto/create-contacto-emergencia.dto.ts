<<<<<<< HEAD
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Negocio } from "../../negocio/entities/negocio.entity.js";

export class CreateContactoEmergenciaDto {
    id_contacto:number;
    razon_consulta:string;
    nom_mascota:string;
    fecha_solicitud:Date;
    fecha_actualizacion:Date;
    estado:string;
    @ValidateNested()
    @Type(()=>Negocio)
    negocioId:Negocio
}
=======
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';

export class NegocioRefDto {
  @IsInt()
  @IsNotEmpty()
  negocioId: number;
}

export class CreateContactoEmergenciaDto {
  @IsString()
  @IsNotEmpty()
  razon_consulta: string;

  @IsString()
  @IsNotEmpty()
  nom_mascota: string;

  @IsObject()
  @ValidateNested()
  @Type(() => NegocioRefDto)
  negocioId: NegocioRefDto;
}
>>>>>>> master
