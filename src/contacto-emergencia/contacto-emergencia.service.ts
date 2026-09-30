import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactoEmergenciaDto } from './dto/create-contacto-emergencia.dto.js';
import { UpdateContactoEmergenciaDto } from './dto/update-contacto-emergencia.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactoEmergencia } from './entities/contacto-emergencia.entity.js';
import { Repository } from 'typeorm';
import { Negocio } from '../negocio/entities/negocio.entity.js';
import { Dueno } from '../duenos/entities/dueno.entity.js';
import { CreateContactoConuenoDto } from './dto/create-contacto-dueno.dt.js';

@Injectable()
export class ContactoEmergenciaService {
  constructor(
    @InjectRepository(ContactoEmergencia)
    private contactoRepository: Repository<ContactoEmergencia>,
    @InjectRepository(Negocio)
    private negocioRepository: Repository<Negocio>,
    @InjectRepository(Dueno) private duenoRepository: Repository<Dueno>,
  ) {}

  async createConDueño(
    negocioId: number,
    createConDueño: CreateContactoConuenoDto,
  ) {
    const negocio = await this.negocioRepository.findOneBy({
      negocioId,
    });

    if (!negocio) {
      throw new NotFoundException(`Negocio no encontrado`);
    }

    const dueno = this.duenoRepository.create({
      rut: createConDueño.dueno.rut,
      nombre_completo: createConDueño.dueno.nombre_completo,
      telefono: createConDueño.dueno.telefono,
      correo: createConDueño.dueno.correo,
      direccion: createConDueño.dueno.direccion,
      negocio,
    });
    const duenoGuardado = await this.duenoRepository.save(dueno);

    const contacto = this.contactoRepository.create({
      razon_consulta: createConDueño.razon_consulta,
      nom_mascota: createConDueño.nom_mascota,
      negocio,
      dueno: duenoGuardado,
    });

    return await this.contactoRepository.save(contacto);
  }

  async findAll(negocioId: number) {
    const contacto = this.contactoRepository.find({
      where: { negocio: { negocioId },estado:'Pendiente' },
      relations: { dueno: true, negocio: true },
    });
    if (!contacto) {
      throw new NotFoundException(`contacto no encontrado`);
    }
    return contacto
  }

  findOne(id: number) {
    return this.contactoRepository.findOneBy({ id_contacto: id });
  }

  async update(id: number, updateContactoEmergenciaDto: UpdateContactoEmergenciaDto) {
    const contacto = await this.contactoRepository.findOne({where:{id_contacto:id}})
    if(!contacto){
      throw new NotFoundException(`Solicitud no encontrada`)
    }
  this.contactoRepository.update(id,updateContactoEmergenciaDto);
    return `contacto actualizado`
  }

  async remove(id: number) {
    const contacto = await this.findOne(id);
    if (!contacto) {
      throw new NotFoundException(`Contacto inexistente`);
    }

    await this.contactoRepository.delete(id);
    return `Se elimino el mensaje`;
  }
}
