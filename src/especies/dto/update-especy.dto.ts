import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecyDto } from './create-especy.dto.js';

export class UpdateEspecyDto extends PartialType(CreateEspecyDto) {}
