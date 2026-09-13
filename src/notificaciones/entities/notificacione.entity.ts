import { timestamp } from "rxjs";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dueno } from "../../duenos/entities/dueno.entity.js";
import type {Relation} from "typeorm";

@Entity()
export class Notificaciones {
    @PrimaryGeneratedColumn()
    id_notificacion:string;
    @Column()
    mensaje:string;
    @Column()
    tipo:string;
    @Column()
    estado:string;
    @Column({type:'timestamp'})
    fecha_envio:Date;
    @ManyToOne(()=>Dueno,(dueno)=>dueno.notifiacion)
    @JoinColumn({name:'id_dueno'})
    dueno:Relation<Dueno>;

    
}
