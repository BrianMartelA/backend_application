import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { RecetasMedica } from '../../recetas_medicas/entities/recetas_medica.entity.js';
import type { Relation } from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'negocioId', type: 'int' })
  negocioId: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({
    name: 'google_sub',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  googleSub: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'Admin',
  })
  rol: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @OneToMany(()=>RecetasMedica,(recetaMedica)=>recetaMedica.usuario)
  recetaMedica:Relation<RecetasMedica[]>
}