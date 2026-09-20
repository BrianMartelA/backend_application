import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';
import { Vacuna } from '../../vacunas/entities/vacuna.entity.js';

@Entity()
export class Especy {
  @PrimaryGeneratedColumn()
  id_especie: number;
  @Column({type:'varchar',length:50})
  nombre_especie: string;
  @OneToMany(() => Mascota, (mascota) => mascota.especy)
  mascota: Relation<Mascota[]>;
  @OneToMany(()=>Vacuna,(vacuna)=>vacuna.especy)
  vacuna:Relation<Vacuna[]>
}
