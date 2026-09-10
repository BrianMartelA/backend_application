import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { Dueno } from "../../duenos/entities/dueno.entity.js";
import type {Relation} from "typeorm";
@Entity() 
export class Mascota {
    @PrimaryGeneratedColumn()
    id_mascota:number;
    @Column()
    nombre:string;
    @Column()
    especie:string;
    @Column()
    raza:string;
    @Column()
    sexo:string;
    @Column()
    fecha_nacimiento:Date;
    @Column()
    peso:number;
    @Column()
    observaciones:string;
    @Column()
    microchip:number;
    @Column()
    antecedentes:string;
    @ManyToOne(()=> Dueno,(dueno)=>dueno.mascotas)
    @JoinColumn({name:'id_dueno'})
    dueno:Relation<Dueno>

}
