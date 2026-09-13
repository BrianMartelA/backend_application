import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacioneDto } from './create-notificacione.dto.js';

export class UpdateNotificacioneDto extends PartialType(CreateNotificacioneDto) {}
