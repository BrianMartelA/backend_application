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
  /*
  async create(createContactoEmergenciaDto: CreateContactoEmergenciaDto) {
    const contacto = new ContactoEmergencia;
    const negocio = await this.negocioRepository.findOneBy({negocioId:createContactoEmergenciaDto.negocioId.negocioId})
  if(!negocio){
    throw new NotFoundException(`Negocio inexistente`)
  } 
  contacto.correo=createContactoEmergenciaDto.correo;
  contacto.direccion=createContactoEmergenciaDto.direccion;
  contacto.nom_contacto=createContactoEmergenciaDto.nom_contacto;
  contacto.telefono=createContactoEmergenciaDto.telefono;
  contacto.razon_consulta=createContactoEmergenciaDto.razon_consulta;
  contacto.negocio=negocio;
    return this.contactoRepository.save(contacto);
  }
*/
  async createConDueño(createConDueño: CreateContactoConuenoDto) {
    const negocio = await this.negocioRepository.findOneBy({
      negocioId: createConDueño.negocioId.negocioId,
    });

    if (!negocio) {
      throw new NotFoundException(`placeholder`);
    }

    const dueno = this.duenoRepository.create({
      rut: createConDueño.dueno.rut,
      nombre: createConDueño.dueno.nombre,
      apellido: createConDueño.dueno.apellido,
      telefono: createConDueño.dueno.telefono,
      email: createConDueño.dueno.email,
      direccion: createConDueño.dueno.direccion,
      negocio
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

  findAll() {
    return `This action returns all contactoEmergencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactoEmergencia`;
  }

  update(id: number, updateContactoEmergenciaDto: UpdateContactoEmergenciaDto) {
    return `This action updates a #${id} contactoEmergencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactoEmergencia`;
  }
}
