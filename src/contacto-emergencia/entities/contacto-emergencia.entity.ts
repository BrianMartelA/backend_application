import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Negocio } from '../../negocio/entities/negocio.entity.js';
import type { Relation } from 'typeorm';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
@Entity()
export class ContactoEmergencia {
  @PrimaryGeneratedColumn()
  id_contacto: number;
  @Column()
  razon_consulta: string;

  @Column()
  nom_mascota: string;
  @ManyToOne(() => Negocio, (negocio) => negocio.contactoEmergencia)
  @JoinColumn({ name: 'negocioId' })
  negocio: Relation<Negocio>;
  @ManyToOne(() => Dueno, (dueno) => dueno.contactosEmergencia)
  @JoinColumn({ name: 'id_dueno' })
  dueno: Relation<Dueno>;
}
