import { Module } from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { StorageController } from './storage.controller.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { Storage } from './entities/storage.entity.js';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
    imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([Storage, Mascota]),
  ],
})
export class StorageModule {}
