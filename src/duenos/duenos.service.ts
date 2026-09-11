import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDuenoDto } from './dto/create-dueno.dto.js';
import { UpdateDuenoDto } from './dto/update-dueno.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Dueno } from './entities/dueno.entity.js';
import { Repository } from 'typeorm';
import { Negocio } from '../negocio/entities/negocio.entity.js';
import { Mascota } from '../mascotas/entities/mascota.entity.js';
import { CreateDuenoConMascotasDto } from './dto/create-dueno-mascota.dto.js';

@Injectable()
export class DuenosService {
  constructor(
    @InjectRepository(Dueno) private duenoRepository: Repository<Dueno>,
    @InjectRepository(Negocio) private negocioRepository: Repository<Negocio>,
    @InjectRepository(Mascota) private mascotaRepository: Repository<Mascota>,
  ) {}

  async createConMascota(dto: CreateDuenoConMascotasDto) {
    const dueno = new Dueno();

    const negocio = await this.negocioRepository.findOneBy({
      negocioId: dto.negocioId.negocioId,
    });

    if (!negocio) {
      throw new NotFoundException(`Negocio no existente`);
    }

    dueno.negocio = negocio;
    dueno.rut = dto.rut;
    dueno.nombre = dto.nombre;
    dueno.apellido = dto.apellido;
    dueno.direccion = dto.direccion;
    dueno.email = dto.email;
    dueno.telefono = dto.telefono;

    const duenoCreado = await this.duenoRepository.save(dueno);

    const mascotas = dto.mascotas.map((mascotaDto) =>
      this.mascotaRepository.create({
        nombre: mascotaDto.nombre,
        especie: mascotaDto.especie,
        raza: mascotaDto.raza,
        sexo: mascotaDto.sexo,
        fecha_nacimiento: mascotaDto.fecha_nacimiento,
        peso: mascotaDto.peso,
        microchip: mascotaDto.microchip,
        antecedentes: mascotaDto.antecedentes,
        observaciones: mascotaDto.observaciones,
        dueno: duenoCreado,
      }),
    );
    await this.mascotaRepository.save(mascotas);
    return this.duenoRepository.findOne({
      where: { id_dueno: duenoCreado.id_dueno },
      relations: {
        mascotas: true,
      },
    });
  }

  async create(createDuenoDto: CreateDuenoDto) {
    const dueno = new Dueno();

    const negocio = await this.negocioRepository.findOneBy({
      negocioId: createDuenoDto.negocioId.negocioId,
    });

    if (!negocio) {
      throw new NotFoundException(`Negocio no existente`);
    }

    dueno.negocio = negocio;
    dueno.rut = createDuenoDto.rut;
    dueno.nombre = createDuenoDto.nombre;
    dueno.apellido = createDuenoDto.apellido;
    dueno.direccion = createDuenoDto.direccion;
    dueno.email = createDuenoDto.email;
    dueno.telefono = createDuenoDto.telefono;
    return this.duenoRepository.save(dueno);
  }

  findAll() {
    return this.duenoRepository.find();
  }

  findOne(id: number) {
    return this.duenoRepository.findOneBy({ id_dueno: id });
  }

  async update(id: number, updateDuenoDto: UpdateDuenoDto) {
    await this.duenoRepository.update(id, updateDuenoDto);
    return this.duenoRepository.findOneBy({ id_dueno: id });
  }

  async remove(id: number) {
    const dueno = await this.findOne(id);
    if (!dueno) {
      throw new NotFoundException(`dueño no encontrado`);
    }

    await this.duenoRepository.delete(id);

    return `Se elimino a usuario ${dueno.nombre}`;
  }
}
