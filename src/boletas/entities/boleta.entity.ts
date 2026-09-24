import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Negocio } from '../../negocio/entities/negocio.entity.js';
import { Dueno } from '../../duenos/entities/dueno.entity.js';
import { Cita } from '../../citas/entities/cita.entity.js';

@Entity('boletas')
export class Boleta {
  @PrimaryGeneratedColumn({ name: 'id_boleta' })
  idBoleta: number;

  @Column({ name: 'id_negocio' })
  idNegocio: number;

  @Column({ name: 'id_cita', nullable: true })
  idCita: number;

  @Column({ name: 'id_dueno' })
  idDueno: number;

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

  // Relaciones
  @ManyToOne(() => Negocio, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_negocio' })
  negocio: Negocio;

  @ManyToOne(() => Dueno, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_dueno' })
  dueno: Dueno;

  @ManyToOne(() => Cita, { onDelete: 'SET NULL', onUpdate: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'id_cita' })
  cita: Cita;
}