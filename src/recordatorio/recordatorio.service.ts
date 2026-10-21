import { Injectable } from '@nestjs/common';
import { CreateRecordatorioDto } from './dto/create-recordatorio.dto.js';
import { UpdateRecordatorioDto } from './dto/update-recordatorio.dto.js';
import { Between, Repository } from 'typeorm';
import { Cita } from '../citas/entities/cita.entity.js';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificaciones } from '../notificaciones/entities/notificacione.entity.js';
import { HistorialVacuna } from '../historial_vacunas/entities/historial_vacuna.entity.js';
@Injectable()
export class RecordatorioService {
  constructor(
    @InjectRepository(Cita) private readonly citaRepository: Repository<Cita>,
    @InjectRepository(Notificaciones) private readonly notificacionRepository:Repository<Notificaciones>,
    @InjectRepository(HistorialVacuna) private readonly historialVacunaRepository:Repository<HistorialVacuna>
  ) {}
  /*
@Cron('* * * * *', {
    timeZone: 'America/Santiago',
  })
  async ejecutarAutomaticamente() {
    console.log('Scheduler ejecutado');
    return this.ejecutarRecordatorio();
  }
*/
    async ejecutarRecordatorio() {
    const ahora = new Date();

    const inicio = new Date(
      ahora.getTime() + 48 * 60 * 60 * 1000,
    );

    const fin = new Date(
      ahora.getTime() + 72 * 60 * 60 * 1000,
    );

    await this.procesarCitas(inicio, fin);
    await this.esperar(3000);
    await this.procesarDosis(inicio, fin);

    console.log('Recordatorios procesados');
  }
  
  private esperar(ms:number){
    return new Promise((resolve)=>setTimeout(resolve,ms))
  }
  private async procesarCitas(
    inicio: Date,
    fin: Date,
  ) {
    const citas = await this.citaRepository.find({
      where: {
        fecha_hora: Between(inicio, fin),
        estado: 'Pendiente',
      },
      relations: {
        mascota: {
          dueno: true,
        },
      },
    });

    console.log(`Citas encontradas: ${citas.length}`);

    for (const cita of citas) {
      const mascota = cita.mascota;

      if (!mascota || !mascota.dueno) {
        console.warn(
          `La cita ${cita.id_cita} no tiene mascota o dueño`,
        );
        continue;
      }

      const dueno = mascota.dueno;

      const existe = await this.notificacionRepository.exists({
        where: {
          tipo: 'CITA_PROXIMA',
          referencia_id: cita.id_cita,
          dueno: {
            id_dueno: dueno.id_dueno,
          },
        },
      });

      if (existe) {
        continue;
      }

      const notificacion = this.notificacionRepository.create({
        dueno,
        referencia_id: cita.id_cita,
        mensaje: `Hola ${dueno.nombre_completo}, recuerde que ${mascota.nombre} tiene una cita próxima.`,
        tipo: 'CITA_PROXIMA',
        estado: 'Pendiente',
        fecha_envio: new Date(),
      });

      await this.notificacionRepository.save(notificacion);
    }
  }
   private async procesarDosis(
    inicio: Date,
    fin: Date,
  ) {
    const historiales = await this.historialVacunaRepository.find({
      where: {
        proxima_dosis: Between(inicio, fin),
      },
      relations: {
        mascota: {
          dueno: true,
        },
        vacuna: true,
      },
    });

    console.log(`Dosis encontradas: ${historiales.length}`);

    for (const historial of historiales) {
      const mascota = historial.mascota;

      if (!mascota || !mascota.dueno) {
        console.warn(
          `El historial ${historial.id_historial} no tiene mascota o dueño`,
        );
        continue;
      }

      const dueno = mascota.dueno;

      const existe = await this.notificacionRepository.exists({
        where: {
          tipo: 'DOSIS_PROXIMA',
          referencia_id: historial.id_historial,
          dueno: {
            id_dueno: dueno.id_dueno,
          },
        },
      });

      if (existe) {
        continue;
      }
      await this.esperar(1500)

      const nombreVacuna =
        historial.vacuna?.nombre_vacuna ?? 'vacuna';

      const notificacion = this.notificacionRepository.create({
        dueno,
        referencia_id: historial.id_historial,
        mensaje: `Hola ${dueno.nombre_completo}, recuerde que ${mascota.nombre} tiene próxima dosis de ${nombreVacuna}.`,
        tipo: 'DOSIS_PROXIMA',
        estado: 'Pendiente',
        fecha_envio: new Date(),
      });

      await this.notificacionRepository.save(notificacion);
    }
  }
    

  create(CreateRecordatorioDto: CreateRecordatorioDto) {
    return 'This action adds a new recordatorio';
  }

  findAll() {
    return `This action returns all recordatorio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recordatorio`;
  }

  update(id: number, UpdateRecordatorioDto: UpdateRecordatorioDto) {
    return `This action updates a #${id} recordatorio`;
  }

  remove(id: number) {
    return `This action removes a #${id} recordatorio`;
  }
}
  

