import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Dueno } from '../../duenos/entities/dueno.entity.js';
import { Cita } from '../../citas/entities/cita.entity.js';
import { Especy } from '../../especies/entities/especy.entity.js';
import { HistorialVacuna } from '../../historial_vacunas/entities/historial_vacuna.entity.js';
import { RecetasMedica } from '../../recetas_medicas/entities/recetas_medica.entity.js';
import { Boleta } from '../../boletas/entities/boleta.entity.js';

@Entity()
export class Mascota {
  @PrimaryGeneratedColumn()
  id_mascota: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  sexo: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date | null;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  peso: number;

  @Column({ type: 'varchar', length: 30 })
  microchip: string;

  @Column({ type: 'text' })
  antecedentes: string;

  @Column({ type: 'varchar', length: 50 })
  alergias: string;

  @ManyToOne(() => Dueno, (dueno) => dueno.mascotas, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_dueno' })
  dueno: Relation<Dueno>;

  @OneToMany(() => Cita, (cita) => cita.mascota)
  cita: Relation<Cita[]>;

  @ManyToOne(() => Especy, (especy) => especy.mascota, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_especie' })
  especy: Relation<Especy>;

  @OneToMany(
    () => HistorialVacuna,
    (historialVacuna) => historialVacuna.mascota,
  )
  historialVacuna: Relation<HistorialVacuna[]>;

  @OneToMany(
    () => RecetasMedica,
    (recetasMedica) => recetasMedica.mascota,
  )
  recetasMedica: Relation<RecetasMedica[]>;

  @OneToMany(() => Boleta, (boleta) => boleta.mascota)
  boleta: Relation<Boleta[]>;
}