import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Especy } from "../../especies/entities/especy.entity.js";
import type { Relation } from 'typeorm';
import { HistorialVacuna } from "../../historial_vacunas/entities/historial_vacuna.entity.js";

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
    @OneToMany(()=>HistorialVacuna,(historialVacuna)=>historialVacuna.vacuna)
    historialVacuna:Relation<HistorialVacuna[]>

}
