import { PartialType } from '@nestjs/mapped-types';
import { CreateNegocioDto } from './create-negocio.dto.js';

export class UpdateNegocioDto extends PartialType(CreateNegocioDto) {}
