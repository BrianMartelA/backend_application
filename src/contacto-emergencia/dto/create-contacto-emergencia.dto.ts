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
