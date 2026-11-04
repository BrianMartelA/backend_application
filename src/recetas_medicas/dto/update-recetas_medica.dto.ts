import { PartialType } from '@nestjs/mapped-types';
import { CreateRecetasMedicaDto } from './create-recetas_medica.dto.js';

export class UpdateRecetasMedicaDto extends PartialType(CreateRecetasMedicaDto) {}
