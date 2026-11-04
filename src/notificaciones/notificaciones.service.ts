import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto.js';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificaciones } from './entities/notificacione.entity.js';
import { In, Repository } from 'typeorm';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { Cita } from '../citas/entities/cita.entity.js';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private notificacionesRepository: Repository<Notificaciones>,
    @InjectRepository(Cita) private citaRepository:Repository<Cita>
  ) {}

  async create(createNotificacioneDto: CreateNotificacioneDto) {
    const notif = new Notificaciones();

    notif.estado = createNotificacioneDto.estado;
    notif.mensaje = createNotificacioneDto.mensaje;
    notif.referencia_id = createNotificacioneDto.referencia_id;
    notif.tipo = createNotificacioneDto.tipo;

    return this.notificacionesRepository.save(notif);
  }

  async findAll(negocioId:number) {
const citas = await this.citaRepository.find({select:{id_cita:true},
where:{negocio:{negocioId}}})

const idsCitas =citas.map((cita)=>cita.id_cita);

 if (idsCitas.length === 0) {
    throw new NotFoundException(`Citas no encontradas`);
  }
 return this.notificacionesRepository.find({
      where:{referencia_id:In(idsCitas)},
      relations:{dueno:true}
    });
  }

  findOne(id: number) {
    return this.notificacionesRepository.findOneBy({id_notificacion:id});
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  async remove(id: number) {
    const notificacion = await this.findOne(id)
    if(!notificacion){
      throw new NotFoundException('Notificación inexistente')
    }
    await this.notificacionesRepository.delete(id)
    return 'notificación eliminada';
  }
}
