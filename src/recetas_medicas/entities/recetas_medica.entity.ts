import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';
import type { Relation } from 'typeorm';

@Entity()
export class RecetasMedica {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_receta: number;
  @CreateDateColumn({ type: 'datetime' })
  fecha: Date;
  @Column({ type: 'text' })
  medicamentos_indicaciones: string;
  @ManyToOne(() => Mascota, (mascota) => mascota.cita)
  @JoinColumn({ name: 'id_mascota' })
  mascota: Relation<Mascota>;
}
