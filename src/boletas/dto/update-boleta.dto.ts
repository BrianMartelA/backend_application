import { PartialType } from '@nestjs/mapped-types';
import { CreateBoletaDto, EstadoPago, MetodoPago } from './create-boleta.dto.js';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateBoletaDto extends PartialType(CreateBoletaDto) {
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