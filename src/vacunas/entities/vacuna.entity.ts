import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Especy } from "../../especies/entities/especy.entity.js";
import type { Relation } from 'typeorm';

@Entity()
export class Vacuna {
    @PrimaryGeneratedColumn()
    id_vacuna:number;
    @Column({type:'varchar',length:100})
    nombre_vacuna:string;
    @Column({type:'text'})
    descripcion:string;
    @ManyToOne(()=>Especy,(especy)=>especy.vacuna)
    @JoinColumn({name:'id_especie'})
    especy:Relation<Especy>

}
