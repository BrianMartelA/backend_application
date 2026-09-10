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

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'veterinaria',
      entities: [Dueno,Mascota,Negocio],
      synchronize: true,
    }), MascotasModule, DuenosModule,NegocioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
