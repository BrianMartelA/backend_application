import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto.js';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificaciones } from './entities/notificacione.entity.js';
import { Repository } from 'typeorm';
import { Dueno } from '../duenos/entities/dueno.entity.js';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private notificacionesRepository: Repository<Notificaciones>,
    @InjectRepository(Dueno)
    private duenoRepository: Repository<Dueno>
  ) {}

  async create(createNotificacioneDto: CreateNotificacioneDto) {
    const notif = new Notificaciones();

    const dueno = await this.duenoRepository.findOneBy({id_dueno:createNotificacioneDto.id_dueno.id_dueno});
    if(!dueno){
      throw new NotFoundException(`Dueño no encontrado`)
    }

    notif.estado=createNotificacioneDto.estado;
    notif.mensaje=createNotificacioneDto.mensaje;
    notif.tipo=createNotificacioneDto.tipo;
    notif.fecha_envio=createNotificacioneDto.fecha_envio;
    notif.dueno=dueno;
    
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
