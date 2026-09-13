import { Test, TestingModule } from '@nestjs/testing';
import { ContactoEmergenciaService } from './contacto-emergencia.service.js';

describe('ContactoEmergenciaService', () => {
  let service: ContactoEmergenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactoEmergenciaService],
    }).compile();

    service = module.get<ContactoEmergenciaService>(ContactoEmergenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
