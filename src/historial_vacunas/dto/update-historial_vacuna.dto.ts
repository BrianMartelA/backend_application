import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialVacunaDto } from './create-historial_vacuna.dto.js';

export class UpdateHistorialVacunaDto extends PartialType(CreateHistorialVacunaDto) {}
