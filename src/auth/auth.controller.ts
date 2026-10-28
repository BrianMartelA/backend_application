import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { GoogleLoginDto } from './dto/google-login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  loginGoogle(@Body() dto: GoogleLoginDto) {
    return this.authService.loginGoogle(dto.credential);
  }
}