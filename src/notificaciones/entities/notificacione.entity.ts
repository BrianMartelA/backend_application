import { timestamp } from "rxjs";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dueno } from "../../duenos/entities/dueno.entity.js";
import type {Relation} from "typeorm";

@Entity()
export class Notificaciones {
    @PrimaryGeneratedColumn({ type: 'int' })
    id_notificacion:number;
    @Column({type:'text'})
    mensaje:string;
    @Column({type:'varchar'})
    tipo:string;
    @Column({type:'varchar'})
    estado:string;
    @CreateDateColumn({type:'timestamp'})
    fecha_envio:Date;
    @Column()
    referencia_id:number;
    @ManyToOne(()=>Dueno,(dueno)=>dueno.notifiacion)
    @JoinColumn({name:'id_dueno'})
    dueno:Relation<Dueno>;

    
}
