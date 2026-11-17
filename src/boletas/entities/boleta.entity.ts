import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Negocio } from '../../negocio/entities/negocio.entity.js';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
import { Cita } from '../../citas/entities/cita.entity.js';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';
import type { Relation } from 'typeorm';
import { BoletaItem } from './boleta-item.entity.js';

@Entity('boletas')
export class Boleta {
  @PrimaryGeneratedColumn({ name: 'id_boleta' })
  idBoleta: number;

  @Column({ name: 'id_negocio' })
  idNegocio: number;
  @Column({ name: 'id_cita', nullable: true })
  idCita: number;
  @Column({ name: 'id_dueno', nullable: true })
  idDueno: number | null;
  @Column({ name: 'id_mascota', nullable: true })
  id_mascota: number | null;
  @Column({ name: 'monto_total', type: 'int' })
  montoTotal: number;

  @Column({
    name: 'estado_pago',
    length: 20,
    default: 'Pendiente',
  })
  estadoPago: string;

  @CreateDateColumn({ name: 'fecha_emision', type: 'timestamp' })
  fechaEmision: Date;

  @Column({ name: 'metodo_pago', length: 20, nullable: true })
  metodoPago: string;

  @ManyToOne(() => Negocio, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_negocio' })
  negocio: Negocio;

  @ManyToOne(() => Dueno, {
    onDelete: 'SET NULL',
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_dueno' })
  dueno: Dueno;

  @ManyToOne(() => Mascota, {
    onDelete: 'SET NULL',
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_mascota' })
  mascota: Relation<Mascota>;

  @ManyToOne(() => Cita, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'id_cita' })
  cita: Cita;
  @OneToMany(() => BoletaItem, (i) => i.boleta, { cascade: true })
  items: Relation<BoletaItem[]>;
}
