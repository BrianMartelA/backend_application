import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mascota } from "../../mascotas/entities/mascota.entity.js";
import type { Relation } from 'typeorm';
import { Vacuna } from "../../vacunas/entities/vacuna.entity.js";

@Entity()
export class HistorialVacuna {
    @PrimaryGeneratedColumn()
    id_historial:number;
    @Column({type:'text'})
    observaciones:string;
    @CreateDateColumn({type:'timestamp'})
    fecha_aplicación:Date;
    @Column({type:'timestamp'})
    proxima_dosis:Date;
    @Column({type:'varchar',length:50})
    lote:string;
    @ManyToOne(()=>Mascota,(mascota)=>mascota.historialVacuna)
    @JoinColumn({name:'id_mascota'})
    mascota:Relation<Mascota>
    @ManyToOne(()=>Vacuna,(vacuna)=>vacuna.historialVacuna)
    vacuna:Relation<Vacuna>
}
