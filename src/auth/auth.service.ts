import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity.js';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      this.config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async loginGoogle(credential: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: credential,
      audience: this.config.getOrThrow<string>(
        'GOOGLE_CLIENT_ID',
      ),
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email || !payload.email_verified) {
      throw new UnauthorizedException(
        'No se pudo verificar la cuenta de Google',
      );
    }

    const usuario = await this.usuarioRepo.findOne({
      where: { email: payload.email },
    });

    if (!usuario) {
      throw new UnauthorizedException(
        'Esta cuenta no está autorizada para VetManager',
      );
    }

    if (
      usuario.googleSub &&
      usuario.googleSub !== payload.sub
    ) {
      throw new UnauthorizedException(
        'La cuenta de Google no coincide con el usuario autorizado',
      );
    }

    if (!usuario.googleSub) {
      usuario.googleSub = payload.sub;
      await this.usuarioRepo.save(usuario);
    }

    const accessToken = await this.jwtService.signAsync({
      sub: usuario.idUsuario,
      negocioId: usuario.negocioId,
      rol: usuario.rol,
    });

    return {
      accessToken,
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        email: usuario.email,
        negocioId: usuario.negocioId,
        rol: usuario.rol,
      },
    };
  }
}