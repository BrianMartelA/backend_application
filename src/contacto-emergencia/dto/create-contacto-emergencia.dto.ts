import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';



export class CreateContactoEmergenciaDto {
  @IsString()
  @IsNotEmpty()
  razon_consulta: string;

  @IsString()
  @IsNotEmpty()
  nom_mascota: string;


}
