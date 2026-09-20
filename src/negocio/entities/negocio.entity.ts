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
import { Cita } from '../../citas/entities/cita.entity.js';

@Entity()
export class Negocio {
  @PrimaryGeneratedColumn()
  negocioId: number;
  @Column({type:'varchar',length:150})
  nombre_negocio: string;
  @Column()
  direccion_negocio: string;
  @Column({type:'varchar',length:12})
  rut: string;
  @CreateDateColumn()
  fecha_registro: Date;
  @OneToMany(() => Dueno, (dueno) => dueno.negocio)
  dueno: Relation<Dueno[]>;
  @OneToMany(()=> ContactoEmergencia,(contactoEmergencia)=>contactoEmergencia.negocio)
  contactoEmergencia:Relation<ContactoEmergencia[]>;
  @OneToMany(()=>Cita,(cita)=>cita.negocio)
  cita:Relation<Cita[]>
}
