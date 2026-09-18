import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dueno } from "../../duenos/entities/dueno.entity.js";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";
import type { Relation } from "typeorm";
@Entity()
export class Cita {
@PrimaryGeneratedColumn()
id_cita:number;
@Column({ type: 'datetime',
    default:'2026-09-17 23:00:00'
 })
fecha_hora:Date;

@Column()
motivo:string;
@Column()
estado:string;
@ManyToOne(()=>Dueno,(dueno)=>dueno.cita)
@JoinColumn({name:'id_dueno'})
dueno:Relation<Dueno>;
@ManyToOne(()=>Mascota,(mascota)=>mascota.cita)
@JoinColumn({name:'id_mascota'})
mascota:Relation<Mascota>;

}
