import { PartialType } from '@nestjs/mapped-types';
import { CreateDuenoDto } from './create-dueno.dto.js';

export class UpdateDuenoDto extends PartialType(CreateDuenoDto) {}
