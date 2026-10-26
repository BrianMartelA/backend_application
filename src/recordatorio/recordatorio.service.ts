import { Injectable } from '@nestjs/common';
import { CreateRecordatorioDto } from './dto/create-recordatorio.dto.js';
import { UpdateRecordatorioDto } from './dto/update-recordatorio.dto.js';
import { Between, Repository } from 'typeorm';
import { Cita } from '../citas/entities/cita.entity.js';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificaciones } from '../notificaciones/entities/notificacione.entity.js';
import { HistorialVacuna } from '../historial_vacunas/entities/historial_vacuna.entity.js';
import { EmailService } from '../email/email.service.js';
@Injectable()
export class RecordatorioService {
  constructor(
    @InjectRepository(Cita) private readonly citaRepository: Repository<Cita>,
    @InjectRepository(Notificaciones)
    private readonly notificacionRepository: Repository<Notificaciones>,
    @InjectRepository(HistorialVacuna)
    private readonly historialVacunaRepository: Repository<HistorialVacuna>,
    private readonly emailService: EmailService,
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
const fechaChileStr = new Date().toLocaleDateString('en-CA', {
  timeZone: 'America/Santiago',
}); 


const inicio = new Date(`${fechaChileStr}T00:00:00`);
inicio.setDate(inicio.getDate() + 1); 

const fin = new Date(`${fechaChileStr}T23:59:59.999`);
fin.setDate(fin.getDate() + 1);

    console.log(`Hora Inicio: ${inicio} y Hora Fin: ${fin}`)

    await this.procesarCitas(inicio, fin);
    await this.esperar(3000);
    await this.procesarDosis(inicio, fin);

    console.log('Recordatorios procesados');
  }

  private esperar(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  private async procesarCitas(inicio: Date, fin: Date) {
    const citas = await this.citaRepository.find({
      where: {
        fecha_hora: Between(inicio, fin),
        estado: 'Pendiente',
      },
      relations: {
        mascota: {
          dueno: true,
        },
        negocio: true,
      },
    });

    console.log(`Citas encontradas: ${citas.length}`);

    const citasPorNegocio = new Map<number, Cita[]>();
    for (const cita of citas) {
      const mascota = cita.mascota;

      if (!mascota || !mascota.dueno) {
        console.warn(`La cita ${cita.id_cita} no tiene mascota o dueño`);
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

      const idNegocio = cita.negocio.negocioId;
      if (!citasPorNegocio.has(idNegocio)) {
        citasPorNegocio.set(idNegocio, []);
      }
      citasPorNegocio.get(idNegocio)!.push(cita);

      if (dueno.correo) {
        try {
          const fechaFormateada = new Date(cita.fecha_hora).toLocaleString(
            'es-ES',
            {
              dateStyle: 'medium',
              timeStyle: 'short',
            },
          );

          await this.emailService.sendEmail({
            recipients: [dueno.correo],
            subject: `Recordatorio de cita para ${mascota.nombre}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Hola ${dueno.nombre_completo},</h2>
              <p>Te recordamos que <strong>${mascota.nombre}</strong> tiene una cita programada.</p>
              <ul>
                <li><strong>Fecha y Hora:</strong> ${fechaFormateada}</li>
                <li><strong>Establecimiento:</strong> ${cita.negocio.nombre_negocio}</li>
              </ul>
              <p>¡Te esperamos!</p>
            </div>
          `,
          });

          await this.notificacionRepository.save(
            this.notificacionRepository.create({
              dueno,
              referencia_id: cita.id_cita,
              mensaje: `Hola ${dueno.nombre_completo}, recuerde que ${mascota.nombre} tiene una cita próxima.`,
              tipo: 'CITA_PROXIMA',
              estado: 'Enviada',
              fecha_envio: new Date(),
            }),
          );
        } catch (error) {
          console.error(`error ${error}`);
        }
      }
    }
    if (citasPorNegocio.size === 0) {
      return;
    }

    console.log('\n==================================================');
    console.log('🏢 RESUMEN DE CITAS AGRUPADAS POR NEGOCIO');
    console.log('==================================================');
    console.log(`Citas encontradas en BD: ${citas.length}`);
    for (const [idNegocio, citasDelNegocio] of citasPorNegocio) {
      const negocio = citasDelNegocio[0].negocio;
      const nombreNegocio = negocio.nombre_negocio || `Negocio #${idNegocio}`;

      // Ajusta el nombre del campo según tu entidad Negocio (correo, email, etc.)
      if (!negocio.correo) {
        console.warn(`El negocio ${nombreNegocio} no tiene correo registrado`);
        continue;
      }

      const ordenadas = [...citasDelNegocio].sort(
        (a, b) =>
          new Date(a.fecha_hora).getTime() - new Date(b.fecha_hora).getTime(),
      );

      const filas = ordenadas
        .map(
          (c, i) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;">${i + 1}</td>
            <td style="padding:8px;border:1px solid #ddd;">${c.mascota.nombre}</td>
            <td style="padding:8px;border:1px solid #ddd;">${c.mascota.dueno.nombre_completo}</td>
            <td style="padding:8px;border:1px solid #ddd;">${new Date(
              c.fecha_hora,
            ).toLocaleString('es-ES', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}</td>
          </tr>`,
        )
        .join('');

      try {
        await this.emailService.sendEmail({
          recipients: [negocio.correo],
          subject: `Resumen de citas próximas (${ordenadas.length})`,
          html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hola ${nombreNegocio},</h2>
            <p>Estas son las citas próximas programadas:</p>
            <table style="border-collapse:collapse;width:100%;">
              <thead>
                <tr style="background:#f5f5f5;">
                  <th style="padding:8px;border:1px solid #ddd;">#</th>
                  <th style="padding:8px;border:1px solid #ddd;">Paciente</th>
                  <th style="padding:8px;border:1px solid #ddd;">Dueño</th>
                  <th style="padding:8px;border:1px solid #ddd;">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody>${filas}</tbody>
            </table>
          </div>
        `,
        });

        console.log(
          `Resumen enviado a ${nombreNegocio} (${ordenadas.length} citas)`,
        );
      } catch (error) {
        console.error(`Error enviando resumen a ${nombreNegocio}:`, error);
      }
      await this.esperar(1500);
    }
  }
private async procesarDosis(inicio: Date, fin: Date) {
  const historiales = await this.historialVacunaRepository.find({
    where: {
      proxima_dosis: Between(inicio, fin),
    },
    relations: {
      mascota: {
        dueno: {
          negocio: true,
        },
      },
      vacuna: true,
    },
  });

  console.log(`Dosis encontradas: ${historiales.length}`);
console.log(
  'HISTORIAL:',
  historiales.map((h) => ({
    id_historial: h.id_historial,
    proxima_dosis: h.proxima_dosis,
    mascota: h.mascota?.nombre,
    dueno: h.mascota?.dueno?.id_dueno,
    correo_dueno: h.mascota?.dueno?.correo,
    negocio: h.mascota?.dueno?.negocio?.negocioId,
    vacuna: h.vacuna?.nombre_vacuna,
  })),
);
  const historialPorNegocio = new Map<number, HistorialVacuna[]>();

  // ============================================================
  // 1) Un correo por dosis a cada dueño + guardar notificación
  // ============================================================
  for (const historial of historiales) {
    const mascota = historial.mascota;

    if (!mascota || !mascota.dueno) {
      console.warn(
        `El historial ${historial.id_historial} no tiene mascota o dueño`,
      );
      continue;
    }

    const dueno = mascota.dueno;

    if (!dueno.negocio) {
      console.warn(
        `El dueño ${dueno.id_dueno} (historial ${historial.id_historial}) no tiene negocio`,
      );
      continue;
    }

    console.log(
      `Procesando historial ${historial.id_historial} | dueño: ${dueno.id_dueno} | correo: ${dueno.correo}`,
    );

    // Evita reenviar si ya se notificó esta dosis al dueño
    const existe = await this.notificacionRepository.exists({
      where: {
        tipo: 'DOSIS_PROXIMA',
        referencia_id: historial.id_historial,
        dueno: { id_dueno: dueno.id_dueno },
      },
    });

    if (existe) {
      console.log(`Historial ${historial.id_historial} ya fue notificado`);
      continue;
    }

    // Agrupar por negocio (el negocio se entera aunque el dueño no tenga correo)
    const idNegocio = dueno.negocio.negocioId;
    if (!historialPorNegocio.has(idNegocio)) {
      historialPorNegocio.set(idNegocio, []);
    }
    historialPorNegocio.get(idNegocio)!.push(historial);

    if (!dueno.correo) {
      console.warn(`El dueño ${dueno.id_dueno} no tiene correo`);
      continue;
    }

    const nombreVacuna = historial.vacuna?.nombre_vacuna ?? 'vacuna';

    // --- Envío del correo al dueño ---
    try {
      const fechaFormateada = new Date(historial.proxima_dosis).toLocaleString(
        'es-ES',
        {
          dateStyle: 'medium',
          timeStyle: 'short',
        },
      );

      await this.emailService.sendEmail({
        recipients: [dueno.correo],
        subject: `Recordatorio de dosis para ${mascota.nombre}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hola ${dueno.nombre_completo},</h2>
            <p>Te recordamos que <strong>${mascota.nombre}</strong> tiene una próxima dosis de <strong>${nombreVacuna}</strong>.</p>
            <ul>
              <li><strong>Fecha y Hora:</strong> ${fechaFormateada}</li>
              <li><strong>Establecimiento:</strong> ${dueno.negocio.nombre_negocio}</li>
            </ul>
            <p>¡Te esperamos!</p>
          </div>
        `,
      });
    } catch (error) {
      console.error(
        `Error enviando correo del historial ${historial.id_historial}:`,
        error,
      );
      continue; // sin correo enviado, no se guarda notificación
    }

    // --- Guardado de la notificación ---
    try {
      const guardada = await this.notificacionRepository.save(
        this.notificacionRepository.create({
          dueno,
          referencia_id: historial.id_historial,
          mensaje: `Hola ${dueno.nombre_completo}, recuerde que ${mascota.nombre} tiene próxima dosis de ${nombreVacuna}.`,
          tipo: 'DOSIS_PROXIMA',
          estado: 'Enviada',
          fecha_envio: new Date(),
        }),
      );
      console.log(`Notificación guardada: ${JSON.stringify(guardada)}`);
    } catch (error) {
      console.error(
        `Error guardando notificación del historial ${historial.id_historial}:`,
        error,
      );
    }
  }

  // ============================================================
  // 2) Un solo correo por negocio con las dosis agrupadas
  // ============================================================
  if (historialPorNegocio.size === 0) {
    return;
  }

  console.log('==================================================');
  console.log('RESUMEN DE DOSIS AGRUPADAS POR NEGOCIO');
  console.log('==================================================');

  for (const [idNegocio, historialesDelNegocio] of historialPorNegocio) {
    const negocio = historialesDelNegocio[0].mascota.dueno.negocio;
    const nombreNegocio = negocio.nombre_negocio || `Negocio #${idNegocio}`;

    // Ajusta el nombre del campo según tu entidad Negocio (correo, email, etc.)
    if (!negocio.correo) {
      console.warn(`El negocio ${nombreNegocio} no tiene correo registrado`);
      continue;
    }

    const ordenadas = [...historialesDelNegocio].sort(
      (a, b) =>
        new Date(a.proxima_dosis).getTime() -
        new Date(b.proxima_dosis).getTime(),
    );

    const filas = ordenadas
      .map(
        (h, i) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;">${i + 1}</td>
            <td style="padding:8px;border:1px solid #ddd;">${h.mascota.nombre}</td>
            <td style="padding:8px;border:1px solid #ddd;">${h.mascota.dueno.nombre_completo}</td>
            <td style="padding:8px;border:1px solid #ddd;">${h.vacuna?.nombre_vacuna ?? 'vacuna'}</td>
            <td style="padding:8px;border:1px solid #ddd;">${new Date(h.proxima_dosis).toLocaleString('es-ES', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}</td>
          </tr>`,
      )
      .join('');

    try {
      await this.emailService.sendEmail({
        recipients: [negocio.correo],
        subject: `Resumen de dosis próximas (${ordenadas.length})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hola ${nombreNegocio},</h2>
            <p>Estas son las dosis próximas programadas:</p>
            <table style="border-collapse:collapse;width:100%;">
              <thead>
                <tr style="background:#f5f5f5;">
                  <th style="padding:8px;border:1px solid #ddd;">#</th>
                  <th style="padding:8px;border:1px solid #ddd;">Paciente</th>
                  <th style="padding:8px;border:1px solid #ddd;">Dueño</th>
                  <th style="padding:8px;border:1px solid #ddd;">Vacuna</th>
                  <th style="padding:8px;border:1px solid #ddd;">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody>${filas}</tbody>
            </table>
          </div>
        `,
      });

      console.log(
        `Resumen enviado a ${nombreNegocio} (${ordenadas.length} dosis)`,
      );
    } catch (error) {
      console.error(`Error enviando resumen a ${nombreNegocio}:`, error);
    }

    // Pausa entre negocios para no saturar el servicio de correo
    await this.esperar(1500);
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
