import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  
} from 'typeorm';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
import { ContactoEmergencia } from '../../contacto-emergencia/entities/contacto-emergencia.entity.js';
import type { Relation } from 'typeorm';

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
  dueno: Relation<Dueno[]>;
  @OneToMany(()=> ContactoEmergencia,(contactoEmergencia)=>contactoEmergencia.negocio)
  contactoEmergencia:Relation<ContactoEmergencia[]>;
}
