import { PartialType } from '@nestjs/mapped-types';
import { CreateCitaDto, DuenoRefDto, MascotaRefDto } from './create-cita.dto.js';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';

export class UpdateCitaDto extends PartialType(CreateCitaDto) {
    fecha_hora: Date;
    
      motivo: string;
      estado: string;
      fecha_creación: Date;
      @ValidateNested()
      @Type(() => Mascota)
      id_mascota: MascotaRefDto;
      @ValidateNested()
      @Type(() => Dueno)
      id_dueno: DuenoRefDto;
}
