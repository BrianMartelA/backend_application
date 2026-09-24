import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Negocio } from '../../negocio/entities/negocio.entity.js';
import type { Relation } from 'typeorm';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
@Entity()
export class ContactoEmergencia {
  @PrimaryGeneratedColumn()
  id_contacto: number;
  @Column({type:'text'})
  razon_consulta: string;

  @Column({type:'varchar',length:50})
  nom_mascota: string;
  @CreateDateColumn()
  fecha_solicitud: Date;
  @UpdateDateColumn()
  fecha_actualizacion: Date;
  @Column({default:'Pendiente',type:'varchar',length:20})
  estado:string;
  @ManyToOne(() => Negocio, (negocio) => negocio.contactoEmergencia)
  @JoinColumn({ name: 'negocioId' })
  negocio: Relation<Negocio>;
  @ManyToOne(() => Dueno, (dueno) => dueno.contactosEmergencia)
  @JoinColumn({ name: 'id_dueno' })
  dueno: Relation<Dueno>;
}
