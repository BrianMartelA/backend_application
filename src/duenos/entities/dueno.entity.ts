import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity.js';
import { Negocio } from '../../negocio/entities/negocio.entity.js';
import type { Relation } from 'typeorm';
import { Notificaciones } from '../../notificaciones/entities/notificacione.entity.js';
import { Cita } from '../../citas/entities/cita.entity.js';
import { ContactoEmergencia } from '../../contacto-emergencia/entities/contacto-emergencia.entity.js';
@Entity()
export class Dueno {
  @PrimaryGeneratedColumn()
  id_dueno: number;
  @Column({type:'varchar',length:12})
  rut: string;
  @Column({type:'varchar',length:100})
  nombre_completo: string;

  @Column({type:'varchar',length:20})
  telefono: string;
  @Column({type:'varchar',length:150})
  correo: string;
  @Column({type:'text'})
  direccion: string;
  @CreateDateColumn()
  fecha_registro: Date;
  @OneToMany(() => Mascota, (mascota) => mascota.dueno)
  mascotas: Relation<Mascota[]>;
  @ManyToOne(() => Negocio, (negocio) => negocio.dueno, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'negocioId' })
  negocio: Negocio;
  @OneToMany(() => Notificaciones, (notificacion) => notificacion.dueno)
  notifiacion: Relation<Notification[]>;
  @OneToMany(() => Cita, (cita) => cita.dueno)
  cita: Cita;
  @OneToMany(() => ContactoEmergencia, (contacto) => contacto.dueno)
  contactosEmergencia: Relation<ContactoEmergencia[]>;
}
