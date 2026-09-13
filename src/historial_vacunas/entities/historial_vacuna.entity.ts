import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HistorialVacuna {
    @PrimaryGeneratedColumn()
    id_vacuna:number;
    @Column()
    nombre_vacuna:string;
    @Column()
    fecha_aplicación:Date;
    
}
