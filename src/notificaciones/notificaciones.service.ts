import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto.js';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificaciones } from './entities/notificacione.entity.js';
import { Repository } from 'typeorm';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Cita } from '../citas/entities/cita.entity.js';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private notificacionesRepository: Repository<Notificaciones>,
  ) {}

  async create(createNotificacioneDto: CreateNotificacioneDto) {
    const notif = new Notificaciones();

    notif.estado = createNotificacioneDto.estado;
    notif.mensaje = createNotificacioneDto.mensaje;
    notif.referencia_id = createNotificacioneDto.referencia_id;
    notif.tipo = createNotificacioneDto.tipo;

    return this.notificacionesRepository.save(notif);
  }

  findAll() {
    return `This action returns all notificaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
  }
}
