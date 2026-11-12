import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { MascotasModule } from './mascotas/mascotas.module.js';
import { DuenosModule } from './duenos/duenos.module.js';
import { NegocioModule } from './negocio/negocio.module.js';
import { HistorialVacunasModule } from './historial_vacunas/historial_vacunas.module.js';
import { NotificacionesModule } from './notificaciones/notificaciones.module.js';
import { BoletasModule } from './boletas/boletas.module.js';
import { CitasModule } from './citas/citas.module.js';
import { ContactoEmergenciaModule } from './contacto-emergencia/contacto-emergencia.module.js';
import { EspeciesModule } from './especies/especies.module.js';
import { VacunasModule } from './vacunas/vacunas.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RecordatorioModule } from './recordatorio/recordatorio.module.js';
import { RecetasMedicasModule } from './recetas_medicas/recetas_medicas.module.js';
import { EmailModule } from './email/email.module.js';

import { Dueno } from './duenos/entities/dueno.entity.js';
import { Mascota } from './mascotas/entities/mascota.entity.js';
import { Negocio } from './negocio/entities/negocio.entity.js';
import { Notificaciones } from './notificaciones/entities/notificacione.entity.js';
import { Cita } from './citas/entities/cita.entity.js';
import { ContactoEmergencia } from './contacto-emergencia/entities/contacto-emergencia.entity.js';
import { Especy } from './especies/entities/especy.entity.js';
import { Vacuna } from './vacunas/entities/vacuna.entity.js';
import { Boleta } from './boletas/entities/boleta.entity.js';
import { HistorialVacuna } from './historial_vacunas/entities/historial_vacuna.entity.js';
import { Usuario } from './usuarios/entities/usuario.entity.js';
import { RecetasMedica } from './recetas_medicas/entities/recetas_medica.entity.js';
import { EmailModule } from './email/email.module.js';
import { Storage } from './storage/entities/storage.entity.js';
import { StorageModule } from './storage/storage.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      timezone: 'Z',
      entities: [
        Dueno,
        Mascota,
        Negocio,
        Notificaciones,
        Cita,
        ContactoEmergencia,
        Especy,
        Vacuna,
        Boleta,
        HistorialVacuna,
        Usuario,
        RecetasMedica,
        Storage
      ],
      synchronize: true,
      ssl: process.env.DB_SSL_REJECT_UNAUTHORIZED == 'true',
      extra: {
        ssl:
          process.env.rejectUnauthorized == 'true'
            ? { rejectUnauthorized: false }
            : null,
      },
    }),

    ScheduleModule.forRoot(),

    MascotasModule,
    DuenosModule,
    NegocioModule,
    HistorialVacunasModule,
    NotificacionesModule,
    BoletasModule,
    CitasModule,
    ContactoEmergenciaModule,
    EspeciesModule,
    VacunasModule,
    AuthModule,
    RecordatorioModule,
    RecetasMedicasModule,
    EmailModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
