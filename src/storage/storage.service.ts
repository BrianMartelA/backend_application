import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto.js';
import { UpdateStorageDto } from './dto/update-storage.dto.js';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Express } from 'express'
import { randomUUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity.js';
interface AuthenticatedUser {
  sub: number;
  negocioId: number;
  rol: string;
}
@Injectable()
export class StorageService {
  private readonly supabase: SupabaseClient;
  private readonly bucket: string;
  constructor(
    private readonly configService: ConfigService,
   @InjectRepository(Storage) private readonly storageRepository: Repository<Storage>,
      @InjectRepository(Mascota) private readonly mascotaRepository: Repository<Mascota>,
  ) {
    const url = configService.get<string>('SUPABASE_URL');
    const key = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    const bucket = configService.get<string>('SUPABASE_BUCKET');

    if (!url || !key || !bucket) {
      throw new NotFoundException('Configuración insuficiente');
    }
    this.supabase = createClient(url,key);
    this.bucket=bucket
  }
  async subirExamen(
    archivo: Express.Multer.File,
    idMascota: number,
    tipoExamen: string,
    fechaRealizacion: string,
    resultadoDetalles: string,
    user:AuthenticatedUser,
  ) {
    if (!archivo) {
      throw new BadRequestException('Debe enviar un archivo');
    }

    const mascota = await this.mascotaRepository.findOne({
      where: {
        id_mascota: idMascota,
      },
      relations: {
        dueno: {
          negocio: true,
        },
      },
    });

    if (!mascota) {
      throw new NotFoundException('Mascota no encontrada');
    }

    if(mascota.dueno.negocio.negocioId!== user.negocioId) throw new ForbiddenException('la mascota no pertenece al negocio')

    const fecha = new Date(fechaRealizacion);

    if (Number.isNaN(fecha.getTime())) {
      throw new BadRequestException(
        'La fecha de realización no es válida',
      );
    }

    const extension =
      archivo.originalname.split('.').pop() ?? 'bin';

const nombreArchivo = archivo.originalname
  .replace(/[^a-zA-Z0-9._-]/g, '_');

const ruta = [
  'examenes',
  `mascota-${idMascota}`,
  nombreArchivo,
].join('/');

    const { error: uploadError } = await this.supabase.storage
      .from(this.bucket)
      .upload(ruta, archivo.buffer, {
        contentType: archivo.mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error(
        'Error subiendo archivo a Supabase:',
        uploadError,
      );

      throw new BadRequestException(
        'No se pudo subir el archivo',
      );
    }

    try {
      const examen = this.storageRepository.create({
        tipo_examen: tipoExamen,
        fecha_realizacion: fecha,
        resultado_detalles: resultadoDetalles,
        archivo_path: ruta,
        mascota,
      });

      const examenGuardado =
        await this.storageRepository.save(examen);

      const { data: signedData, error: signedError } =
        await this.supabase.storage
          .from(this.bucket)
          .createSignedUrl(ruta, 3600);

      if (signedError) {
        throw signedError;
      }

      return {
        mensaje: 'Examen guardado correctamente',
        examen: {
          id_examen: examenGuardado.id_examen,
          tipo_examen: examenGuardado.tipo_examen,
          fecha_realizacion:
            examenGuardado.fecha_realizacion,
          resultado_detalles:
            examenGuardado.resultado_detalles,
          archivo_path: examenGuardado.archivo_path,
          url: signedData.signedUrl,
          expira_en: 3600,
        },
        mascota: {
          id_mascota: mascota.id_mascota,
          nombre: mascota.nombre,
        },
        negocio: {
          negocioId: mascota.dueno.negocio.negocioId,
          nombre_negocio:
            mascota.dueno.negocio.nombre_negocio,
          correo: mascota.dueno.negocio.correo,
        },
      };
    } catch (error) {
      await this.supabase.storage
        .from(this.bucket)
        .remove([ruta]);

      console.error(
        'Error guardando información del examen:',
        error,
      );

      throw new InternalServerErrorException(
        'No se pudo guardar la información del examen',
      );
    }
  }

  async listarExamenes(negocioId: number) {
  const examenes = await this.storageRepository.find({
    where: {
      mascota: {
        dueno: {
          negocio: { negocioId },
        },
      },
    },
    relations: {
      mascota: {
        dueno: {
          negocio: true,
        },
      },
    },
    order: {
      fecha_realizacion: 'DESC',
    },
  });

  return Promise.all(
    examenes.map(async (examen) => {
      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .createSignedUrl(examen.archivo_path, 3600);

      if (error) {
        throw new InternalServerErrorException(
          'No se pudo generar la URL del archivo',
        );
      }

      return {
        id_examen: examen.id_examen,
        tipo_examen: examen.tipo_examen,
        fecha_realizacion: examen.fecha_realizacion,
        resultado_detalles: examen.resultado_detalles,
        archivo_path: examen.archivo_path,
        url: data.signedUrl,
        mascota: examen.mascota.nombre,
        negocioId,
      };
    }),
  );
}
}