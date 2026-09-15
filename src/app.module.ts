import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotasModule } from './mascotas/mascotas.module.js';
import { DuenosModule } from './duenos/duenos.module.js';
import { Dueno } from './duenos/entities/dueno.entity.js';
import { Mascota } from './mascotas/entities/mascota.entity.js';
import { Negocio } from './negocio/entities/negocio.entity.js';
import { NegocioModule } from './negocio/negocio.module.js';
import { HistorialVacunasModule } from './historial_vacunas/historial_vacunas.module.js';
import { NotificacionesModule } from './notificaciones/notificaciones.module.js';
import { Notificaciones } from './notificaciones/entities/notificacione.entity.js';
import { BoletasModule } from './boletas/boletas.module.js';
import { CitasModule } from './citas/citas.module.js';
import { Cita } from './citas/entities/cita.entity.js';
import { ContactoEmergenciaModule } from './contacto-emergencia/contacto-emergencia.module.js';
import { ContactoEmergencia } from './contacto-emergencia/entities/contacto-emergencia.entity.js';
import { EspeciesModule } from './especies/especies.module.js';
import { RazasModule } from './razas/razas.module.js';
import { Raza } from './razas/entities/raza.entity.js';
import { Especy } from './especies/entities/especy.entity.js';

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password:"", // <-- Asegúrate de tener tu contraseña aquí o en process.env
      database: process.env.DB_DATABASE || 'veterinaria',
      entities: [Dueno,Mascota,Negocio,Notificaciones,Cita,ContactoEmergencia,Raza,Especy],
      synchronize: true,
    }), MascotasModule, DuenosModule,NegocioModule, HistorialVacunasModule, NotificacionesModule, BoletasModule, CitasModule, ContactoEmergenciaModule, EspeciesModule, RazasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
