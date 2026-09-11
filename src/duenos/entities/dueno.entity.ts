import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";
import { Negocio } from "../../negocio/entities/negocio.entity.js";
import type { Relation } from 'typeorm';
@Entity()
export class Dueno {
    @PrimaryGeneratedColumn()
    id_dueno:number;
    @Column()
    rut:string;
    @Column()
    nombre:string;
    @Column()    
    apellido:string;
    @Column()
    telefono:string;
    @Column()
    email:string;
    @Column()
    direccion:string;
    @CreateDateColumn()
    fecha_registro:Date;
    @OneToMany(()=>Mascota,(mascota)=>mascota.dueno)
    mascotas:Relation<Mascota[]>;
    @ManyToOne(()=>Negocio,(negocio)=>negocio.dueno,{onDelete:'CASCADE'})
    @JoinColumn({name:'negocioId'})
    negocio:Negocio;

}
