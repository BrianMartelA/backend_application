import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Dueno } from '../../duenos/entities/dueno.entity.js';

@Entity()
export class Negocio {
  @PrimaryGeneratedColumn()
  negocioId: number;
  @Column()
  nombre_negocio: string;
  @Column()
  direccion_negocio: string;
  @Column()
  rut: string;
  @CreateDateColumn()
  fecha_registro: Date;
  @OneToMany(() => Dueno, (dueno) => dueno.negocio)
  dueno: Relation<Dueno>[];
}
