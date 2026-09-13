import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación y transformación de DTOs global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configuración explícita de CORS para permitir peticiones desde Next.js
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Lectura correcta del puerto desde el .env (fallback a 3001)
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Backend NestJS ejecutándose en: http://localhost:${port}`);
}

await bootstrap();
