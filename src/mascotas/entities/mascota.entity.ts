import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
import type { Relation } from 'typeorm';
import { Cita } from '../../citas/entities/cita.entity.js';
import { Especy } from '../../especies/entities/especy.entity.js';
import { HistorialVacuna } from '../../historial_vacunas/entities/historial_vacuna.entity.js';
@Entity()
export class Mascota {
  @PrimaryGeneratedColumn()
  id_mascota: number;
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  observaciones: string;
  @Column({ type: 'varchar', length: 50 })
  sexo: string;
  @Column()
  fecha_nacimiento: Date;
  @Column({ type: 'int' })
  peso: number;

  @Column({ type: 'varchar', length: 30 })
  microchip: number;
  @Column({ type: 'text' })
  antecedentes: string;
  @Column({ type: 'varchar', length: 50 })
  alergias: string;
  @ManyToOne(() => Dueno, (dueno) => dueno.mascotas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_dueno' })
  dueno: Relation<Dueno>;
  @OneToMany(() => Cita, (cita) => cita.mascota)
  cita: Cita;
  @ManyToOne(() => Especy, (especy) => especy.mascota)
  @JoinColumn({ name: 'id_especie' })
  especy: Relation<Especy>;

  @Column({type:'varchar',})
  raza:string;
  @OneToMany(()=>HistorialVacuna,(historialVacuna)=>historialVacuna.mascota)
  historialVacuna:Relation<HistorialVacuna[]>


}
