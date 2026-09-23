import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  Min,
} from 'class-validator';

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
  @Min(0)
  @IsNotEmpty()
  montoTotal: number;

  @IsEnum(EstadoPago)
  @IsOptional()
  estadoPago?: EstadoPago;

  @IsEnum(MetodoPago)
  @IsOptional()
  metodoPago?: MetodoPago;
}
