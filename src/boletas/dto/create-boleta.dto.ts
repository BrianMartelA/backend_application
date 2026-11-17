import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  Min,
  IsArray,
  ValidateNested,
  IsIn,
} from 'class-validator';
export class BoletaItemDto {
  @IsString() @IsNotEmpty()
  concepto: string;

  @IsInt() @Min(0)
  precio: number;

  @IsIn(['vacuna', 'receta', 'manual'])
  origen: string;

  @IsOptional() @IsString()
  claveOrigen?: string;
}
export enum EstadoPago {
  PENDIENTE = 'Pendiente',
  PAGADO = 'Pagado',
  ANULADO = 'Anulado',
}

export enum MetodoPago {
  EFECTIVO = 'Efectivo',
  TARJETA = 'Tarjeta',
  TRANSFERENCIA = 'Transferencia',
}

export class CreateBoletaDto {
  @IsInt()
  @IsNotEmpty()
  idNegocio: number;

  @IsInt()
  @IsOptional()
  idCita?: number;

  @IsInt()
  @IsNotEmpty()
  idDueno: number;
  @IsInt()
  @IsNotEmpty()
  id_mascota: number;
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  montoTotal: number;

  @IsEnum(EstadoPago)
  @IsOptional()
  estadoPago?: EstadoPago;

  @IsEnum(MetodoPago)
  @IsOptional()
  metodoPago?: MetodoPago;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BoletaItemDto)
  items?: BoletaItemDto[];
}
