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
<<<<<<< Updated upstream
import { RazasModule } from './razas/razas.module.js';
import { Raza } from './razas/entities/raza.entity.js';
=======
import { Usuario } from './usuarios/entities/usuario.entity.js';
>>>>>>> Stashed changes
import { Especy } from './especies/entities/especy.entity.js';
import { VacunasModule } from './vacunas/vacunas.module.js';
import { Vacuna } from './vacunas/entities/vacuna.entity.js';
import { Boleta } from './boletas/entities/boleta.entity.js';
import { HistorialVacuna } from './historial_vacunas/entities/historial_vacuna.entity.js';
<<<<<<< Updated upstream
=======
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';

>>>>>>> Stashed changes

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
<<<<<<< Updated upstream
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password:"", // <-- Asegúrate de tener tu contraseña aquí o en process.env
      database: process.env.DB_DATABASE || 'veterinaria',
      entities: [Dueno,Mascota,Negocio,Notificaciones,Cita,ContactoEmergencia,Raza,Especy,Vacuna,Boleta,HistorialVacuna
      ],
      synchronize: true,
    }), MascotasModule, DuenosModule,NegocioModule, HistorialVacunasModule, NotificacionesModule, BoletasModule, CitasModule, ContactoEmergenciaModule, EspeciesModule, RazasModule, VacunasModule],
=======
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD, // <-- Asegúrate de tener tu contraseña aquí o en process.env
      database: process.env.DB_DATABASE ,
      entities: [Dueno,Mascota,Negocio,Notificaciones,Cita,ContactoEmergencia,Especy,Vacuna,Boleta,HistorialVacuna,Usuario,
      ],
      synchronize: true,
    }), MascotasModule, DuenosModule,NegocioModule, HistorialVacunasModule, NotificacionesModule, BoletasModule, CitasModule, ContactoEmergenciaModule, EspeciesModule, VacunasModule, AuthModule,],
>>>>>>> Stashed changes
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
