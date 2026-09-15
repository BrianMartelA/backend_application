import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';

@Entity()
export class Especy {
  @PrimaryGeneratedColumn()
  id_especie: number;
  @Column()
  nombre_especie: string;
  @OneToMany(() => Mascota, (mascota) => mascota.especy)
  mascota: Relation<Mascota[]>;
}
