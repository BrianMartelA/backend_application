import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";
import type { Relation } from 'typeorm';

@Entity()
export class Raza {
    @PrimaryGeneratedColumn()
    id_raza:number;
    @Column({type:'varchar',length:50})
    nombre_raza:string;
    @OneToMany(()=>Mascota,(mascota)=>mascota.raza)
    mascota:Relation<Mascota[]>;
}
