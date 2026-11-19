import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Boleta } from './boleta.entity.js';

@Entity('boleta_items')
export class BoletaItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  concepto: string;

  @Column({ type: 'int' })
  precio: number;

  @Column({ type: 'varchar', length: 20 })
  origen: string; 

  @Index()
  @Column({ name: 'clave_origen', type: 'varchar', length: 60, nullable: true })
  claveOrigen: string | null; 
  @ManyToOne(() => Boleta, (b) => b.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_boleta' })
  boleta: Relation<Boleta>;
}