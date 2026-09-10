import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Dueno } from "../../duenos/entities/dueno.entity.js";

@Entity()
export class Negocio {
    @PrimaryGeneratedColumn()
    negocioId:number
    @Column()
    dueno_nom:string;
    @OneToMany(()=>Dueno,(dueno)=>dueno.negocio)
    dueno:Relation<Dueno>[]

}
