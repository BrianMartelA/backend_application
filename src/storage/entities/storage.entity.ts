import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from 'typeorm';
import { Mascota } from "../../mascotas/entities/mascota.entity.js";

@Entity()
export class Storage {
@PrimaryGeneratedColumn()
id_examen:number;
@Column({type:'varchar',length:100})
tipo_examen:string;
@Column({type:'timestamp'})
fecha_realizacion:Date;
@Column({type:'text'})
resultado_detalles:string;
@Column({type:"varchar",length:255})
archivo_path:string;
@ManyToOne(()=>Mascota,(mascota)=>mascota.storage)
@JoinColumn({name:'id_mascota'})
mascota:Relation<Mascota>
}
