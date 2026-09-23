import { PartialType } from '@nestjs/mapped-types';
import { CreateBoletaDto } from './create-boleta.dto.js';

export class UpdateBoletaDto extends PartialType(CreateBoletaDto) {}