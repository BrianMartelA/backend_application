import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialVacunaDto } from './create-historial_vacuna.dto.js';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateHistorialVacunaDto extends PartialType(
  CreateHistorialVacunaDto,
) {
  @IsNotEmpty()
  observaciones: string;
  @Type(() => Date)
  @IsDate()
  proxima_dosis: Date;
  lote: string;
}
